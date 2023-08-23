import {
  useAdminCustomQuery,
  useAdminCustomPost,
  useAdminCustomDelete,
} from "medusa-react";

import {
  AdminGetOrderReactionOrderSummaryRes,
  AdminListOrderReactionsRes,
  AdminPostOrderReactionsOrderRes,
  AdminPostOrderReactionsOrderReq,
  OrderReactionsFilterableFields,
} from "../types/order-reaction";

const useAdminOrderReactionSummary = (id: string) => {
  return useAdminCustomQuery<never, AdminGetOrderReactionOrderSummaryRes>(
    `/admin/order-reactions/${id}/summary`,
    ["order_reaction", id]
  );
};

const useAdminOrderReactions = (query: OrderReactionsFilterableFields) => {
  return useAdminCustomQuery<
    OrderReactionsFilterableFields,
    AdminListOrderReactionsRes
  >(`/admin/order-reactions`, ["order_reaction", "list"], query);
};

const useAdminOrderReactionDelete = (orderId: string, id: string) => {
  return useAdminCustomDelete(`/admin/order-reactions/${id}`, [
    "order_reaction",
    orderId,
  ]);
};

const useAdminCreateOrderReaction = (id: string) => {
  return useAdminCustomPost<
    AdminPostOrderReactionsOrderReq,
    AdminPostOrderReactionsOrderRes
  >(`/admin/order-reactions/${id}`, ["order_reaction", id]);
};

export {
  useAdminOrderReactionDelete,
  useAdminCreateOrderReaction,
  useAdminOrderReactionSummary,
  useAdminOrderReactions,
};
