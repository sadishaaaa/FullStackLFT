import { Knex } from "knex";

const TABLE_NAME = "products";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 1,
          productName: "lacy sofa",
          productImage: "image.png",
          description: "comfortable in all houses",
          price: 1200,
          stock: 50,
        },
        {
          id: 2,
          productName: "Classic sofa",
          productImage: "image.png",
          description: "comfortable in all houses",
          price: 800,
          stock: 100,
        },
      ]);
    });
}
