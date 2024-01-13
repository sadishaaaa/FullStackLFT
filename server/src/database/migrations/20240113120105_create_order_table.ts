import { Knex } from "knex";

const TABLE_NAME = "orders";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string("shipping_address");
    table.string("billing_address");
    table
      .enum("mode_of_payment", ["COD", "Khalti"])
      .notNullable()
      .defaultTo("COD");
    table.boolean("payment_status").defaultTo(false);
    table.integer("subtotal").notNullable();
    table.timestamp("order_time").notNullable().defaultTo(knex.raw("now()"));

    table
      .bigInteger("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
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
