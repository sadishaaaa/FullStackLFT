import { Knex } from "knex";

const TABLE_NAME = "users";

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
          id: 10,
          first_name: "Sadisha",
          last_name: "Shrestha",
          email: "admin@gmail.com",
          password:
            "$2b$10$2LiQNdUuCUa8qVpuyjknf.yJ8bZLRf6a0vWb/k7qwB4fLs8Ot2ZA6",
          address: "LFT, Countryside",
          contact_no: "+977 9869029494",
          role: "admin",
        },
      ]);
    });
}
