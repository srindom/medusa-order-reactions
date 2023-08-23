import OrderReactionService from "../../../services/order-reaction";

export const config = {
  path: "/:id",
  method: "delete",
};

export default async (req, res) => {
  const reactionService: OrderReactionService = req.scope.resolve(
    "orderReactionService"
  );

  const { id } = req.params;

  await reactionService.delete(id);

  res.status(201).json({ deleted: true });
};
