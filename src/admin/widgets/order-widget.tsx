import React from "react";
import type { WidgetConfig } from "@medusajs/admin";
import { FaceSmile } from "@medusajs/icons";
import { Container, Button, DropdownMenu } from "@medusajs/ui";
import {
  useAdminCreateOrderReaction,
  useAdminOrderReactionSummary,
} from "../hooks";
import { ReactionBadge } from "../components/reaction-badge";

export default ({ order }) => {
  const response = useAdminOrderReactionSummary(order.id);
  const { mutateAsync } = useAdminCreateOrderReaction(order.id);

  const handleSelect = (event: Event) => {
    const body = {
      reaction: (event.currentTarget as HTMLElement).innerText,
    };

    mutateAsync(body);
  };

  return (
    <Container className="mb-4">
      <div className="flex gap-2">
        {!response.isLoading &&
          response.data.summary?.map((reaction) => (
            <ReactionBadge
              key={reaction.reaction}
              orderId={order.id}
              reaction={reaction.reaction}
              count={reaction.count}
              userHasReacted={reaction.user_has_reacted}
              userReactionId={reaction.user_reaction_id}
            />
          ))}
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <Button variant="transparent">
              <FaceSmile />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="flex">
            <DropdownMenu.Item onSelect={handleSelect}>👍</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleSelect}>💰</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleSelect}>😍</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleSelect}>🎉</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleSelect}>🚀</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleSelect}>🛑</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleSelect}>👎</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={handleSelect}>😭</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </Container>
  );
};

export const config: WidgetConfig = {
  zone: "order.details.before",
};
