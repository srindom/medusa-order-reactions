import { generateEntityId, SoftDeletableEntity } from "@medusajs/medusa"
import { Index, BeforeInsert, Column, Entity, Unique } from "typeorm"

@Entity()
@Unique("onePerUser", ["order_id", "user_id", "reaction"])
export class OrderReaction extends SoftDeletableEntity {
  @Index()
  @Column()
  order_id: string

  @Column()
  reaction: string

  @Column()
  user_id: string

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "oreact")
  }
}
