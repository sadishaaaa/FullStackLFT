import { Knex } from "knex";

const TABLE_NAME = "order";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer("subtotal").notNullable().defaultTo(0); // Set a default value
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn("subtotal");
  });
}
