import { Knex } from "knex";

const TABLE_NAME = "order";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.timestamp("order_time").notNullable().defaultTo(knex.raw("now()"));
    table.boolean("payment_status").alter();
    table
      .enum("mode_of_payment", ["COD", "Khalti"])
      .notNullable()
      .defaultTo("COD");
    table
      .bigInteger("cart_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cart");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
