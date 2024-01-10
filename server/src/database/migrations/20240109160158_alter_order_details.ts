import { Knex } from "knex";

const TABLE_NAME = "orderdetail";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer("quantity").notNullable().defaultTo(1); // Set a default value
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn("quantity");
  });
}
