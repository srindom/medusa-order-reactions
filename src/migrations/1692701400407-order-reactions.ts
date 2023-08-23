import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderReactions1692701400407 implements MigrationInterface {
  name = "OrderReactions1692701400407";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_reaction" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "order_id" character varying NOT NULL, "reaction" character varying NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_0cf613ac6b09144921ec22c2067" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "order_reaction" ADD CONSTRAINT "onePerUser" UNIQUE ("order_id", "user_id", "reaction")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6f95bdcabc9df9f7ab4e47b14f" ON "order_reaction" ("order_id") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_reaction"`);
  }
}
