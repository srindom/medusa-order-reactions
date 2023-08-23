import { UserService } from "@medusajs/medusa";
import OrderReactionService from "../../../services/order-reaction";

export const config = {
  path: "/",
  method: "get",
};

export default async (req, res) => {
  const reactionService: OrderReactionService = req.scope.resolve(
    "orderReactionService"
  );
  const userService: UserService = req.scope.resolve("userService");

  const { order_id, reaction } = req.query;
  const take = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.offset ? parseInt(req.query.offset) : 0;

  const [reactions, count] = await reactionService.listAndCount(
    { order_id, reaction },
    { take, skip }
  );

  const users = await userService.list({ id: reactions.map((r) => r.user_id) });

  const reactionsWithUsers = reactions.map((r) => {
    const user = users.find((u) => u.id === r.user_id);
    const names = [];
    if (user.first_name) {
      names.push(user.first_name);
    }
    if (user.last_name) {
      names.push(user.last_name);
    }

    return {
      ...r,
      user: {
        id: user.id,
        name: names.join(" "),
        email: user.email,
      },
    };
  });

  res.status(200).json({ reactions: reactionsWithUsers, count });
};
