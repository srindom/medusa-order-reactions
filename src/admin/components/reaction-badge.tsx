import React from "react";
import { Badge, Tooltip } from "@medusajs/ui";

import { Reactors } from "./reactors";
import {
  useAdminCreateOrderReaction,
  useAdminOrderReactionDelete,
  useAdminOrderReactions,
} from "../hooks";

type ReactionBadgeProps = {
  reaction: string;
  orderId: string;
  count: number;
  userHasReacted: boolean;
  userReactionId: string;
};

export const ReactionBadge = ({
  reaction,
  orderId,
  count,
  userHasReacted,
  userReactionId,
}: ReactionBadgeProps) => {
  const reactionResponse = useAdminOrderReactions({
    order_id: orderId,
    reaction,
  });
  const { mutateAsync: deleteReaction } = useAdminOrderReactionDelete(
    orderId,
    userReactionId
  );
  const { mutateAsync } = useAdminCreateOrderReaction(orderId);

  const handleClick = () => {
    if (userReactionId) {
      deleteReaction();
    } else {
      mutateAsync({ reaction });
    }
  };

  return (
    <Tooltip
      content={
        <Reactors
          reactions={reactionResponse?.data?.reactions || []}
          count={count}
          isLoading={reactionResponse.isLoading}
        />
      }
    >
      <Badge
        className="cursor-pointer rounded-full"
        color={userHasReacted ? "blue" : "grey"}
        onClick={handleClick}
      >
        {reaction}
        <span className="ml-1">{count}</span>
      </Badge>
    </Tooltip>
  );
};
