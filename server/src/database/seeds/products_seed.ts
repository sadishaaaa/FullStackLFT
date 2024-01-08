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
          product_name: "lacy sofa",
          product_image: "image.png",
          description: "comfortable in all houses",
          price: 1200,
          stock: 50,
        },
        {
          id: 2,
          product_name: "Classic sofa",
          product_image: "image.png",
          description: "comfortable in all houses",
          price: 800,
          stock: 100,
        },
      ]);
    });
}
