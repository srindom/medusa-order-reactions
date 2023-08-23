import OrderReactionService from "../../../services/order-reaction";

export const config = {
  path: "/:order_id/summary",
  method: "get",
};

export default async (req, res) => {
  const reactionService: OrderReactionService = req.scope.resolve(
    "orderReactionService"
  );

  const { order_id } = req.params;

  const result = await reactionService.summarizeForOrder(
    order_id,
    req.user.userId
  );

  res.status(200).json({ summary: result });
};
