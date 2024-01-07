import { Knex } from "knex";

const TABLE_NAME = "products";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string("product_name").notNullable();
    table.string("product_image").notNullable();
    table.string("decription").notNullable();
    table.integer("price").notNullable();
    table.integer("stock").notNullable().defaultTo(0);
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
