import React from "react";
import { Spinner } from "@medusajs/icons";
import { OrderReactionWithUser } from "src/types/order-reaction";

type ReactorsProps = {
  reactions: OrderReactionWithUser[];
  count: number;
  isLoading: boolean;
};

export const Reactors = ({ reactions, count, isLoading }: ReactorsProps) => {
  if (isLoading) {
    return <Spinner className="animate-spin" />;
  }

  const names = React.useMemo(
    () =>
      reactions.map((reaction) => reaction.user.name || reaction.user.email),
    [reactions]
  );

  return (
    <div className="flex gap-2 text-xs text-center font-light">
      {names.join(", ")}{" "}
      {count > names.length && `and ${count - names.length} others`} reacted
    </div>
  );
};
