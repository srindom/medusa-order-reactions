import { MedusaError } from "medusa-core-utils";
import OrderReactionService from "../../../services/order-reaction";

type Body = {
  order_id: string;
  reaction: string;
  user_id: string;
};

export const config = {
  path: "/:order_id",
  method: "post",
};

export default async (req, res) => {
  const reactionService: OrderReactionService = req.scope.resolve(
    "orderReactionService"
  );

  const user_id = req.user.userId;
  const { order_id } = req.params;
  const { reaction } = req.body as Body;

  // Validate that all data is present
  if (!order_id || !reaction || !user_id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Missing required fields"
    );
  }

  const result = await reactionService.create({ order_id, reaction, user_id });

  res.status(200).json({ reaction: result });
};
