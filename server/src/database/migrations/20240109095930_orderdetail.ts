import { Knex } from "knex";

const TABLE_NAME = "orderdetail";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table
      .bigInteger("order_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("order");
    table
      .bigInteger("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .notNullable();
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
