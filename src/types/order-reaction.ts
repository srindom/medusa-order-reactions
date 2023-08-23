export type OrderReactionCreateData = {
  order_id: string;
  reaction: string;
  user_id: string;
};

export type OrderReactionsFilterableFields = {
  order_id?: string;
  reaction?: string;
  user_id?: string;
};

export type OrderReaction = {
  id: string;
  order_id: string;
  reaction: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

export type OrderReactionWithUser = OrderReaction & {
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

export type AdminPostOrderReactionsOrderRes = {
  reaction: OrderReaction;
};

export type AdminPostOrderReactionsOrderReq = {
  reaction: string;
};

export type AdminListOrderReactionsRes = {
  reactions: OrderReactionWithUser[];
  count: number;
};

export type AdminGetOrderReactionOrderSummaryRes = {
  summary: OrderReactionSummary;
};

export type OrderReactionSummary = {
  reaction: string;
  count: number;
  user_has_reacted: boolean;
  user_reaction_id: string;
}[];
