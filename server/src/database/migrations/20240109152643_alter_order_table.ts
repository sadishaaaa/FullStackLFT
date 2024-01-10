import { Knex } from "knex";

const TABLE_NAME = "order";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropForeign(["product_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {});
}
