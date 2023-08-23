import { isDefined } from "medusa-core-utils";
import { buildQuery, FindConfig } from "@medusajs/medusa";
import { SharedContext } from "@medusajs/types";
import { OrderReaction } from "../models/order-reaction";
import { EntityManager } from "typeorm";
import {
  OrderReactionCreateData,
  OrderReactionsFilterableFields,
  OrderReactionSummary,
} from "../types/order-reaction";

type InjectedDependencies = {
  manager: EntityManager;
};

class OrderReactionService {
  private manager: EntityManager;

  constructor(container: InjectedDependencies) {
    this.manager = container.manager;
  }

  private getManager(context: SharedContext = {}): EntityManager {
    return context.transactionManager || this.manager;
  }

  async create(
    data: OrderReactionCreateData,
    context: SharedContext = {}
  ): Promise<OrderReaction> {
    const reactionRepo = this.getManager(context).getRepository(OrderReaction);
    const reaction = reactionRepo.create(data);
    return await reactionRepo.save(reaction);
  }

  async delete(id: string, context: SharedContext = {}): Promise<void> {
    const reactionRepo = this.getManager(context).getRepository(OrderReaction);
    await reactionRepo.delete(id);
  }

  async summarizeForOrder(
    order_id: string,
    userId?: string,
    context: SharedContext = {}
  ): Promise<OrderReactionSummary> {
    // Construct query that will return the count of each reaction for the given order_id
    // if userid is provided add a column that specifies if the current user has reacted with the reaction type
    const reactionRepo = this.getManager(context).getRepository(OrderReaction);
    const query = reactionRepo
      .createQueryBuilder("reaction")
      .select("reaction.reaction", "reaction")
      .addSelect("COUNT(reaction.reaction)", "count")
      .where("reaction.order_id = :order_id", { order_id })
      .groupBy("reaction.reaction");

    if (isDefined(userId)) {
      query.addSelect(
        `MAX(CASE WHEN reaction.user_id = '${userId}' THEN reaction.id END)`,
        "user_reaction_id"
      );
    }

    const result = await query.getRawMany();

    // parse result to proper types
    const parsedResult = result.map((r) => {
      return {
        reaction: r.reaction,
        count: parseInt(r.count),
        user_has_reacted: !!r.user_reaction_id,
        user_reaction_id: r.user_reaction_id,
      };
    });

    return parsedResult;
  }

  async listAndCount(
    selector: OrderReactionsFilterableFields,
    config: FindConfig<OrderReaction>,
    context: SharedContext = {}
  ): Promise<[OrderReaction[], number]> {
    const reactionRepo = this.getManager(context).getRepository(OrderReaction);
    const query = buildQuery(selector, config);
    return await reactionRepo.findAndCount(query);
  }
}

export default OrderReactionService;
