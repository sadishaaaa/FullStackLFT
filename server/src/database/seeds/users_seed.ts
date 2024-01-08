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
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password:
            "$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa",
          address: "123 Main St, Cityville",
          contact_no: "+1 123-456-7890",
        },
        {
          id: 2,
          first_name: "Jane",
          last_name: "Smith",
          email: "janesmith@example.com",
          password:
            "$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa",
          address: "456 Oak St, Townsville",
          contact_no: "+1 987-654-3210",
        },
        {
          id: 3,
          first_name: "Alice",
          last_name: "Johnson",
          email: "alicejohnson@example.com",
          password:
            "$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa",
          address: "789 Pine St, Villagetown",
          contact_no: "+1 555-123-4567",
        },
        {
          id: 4,
          first_name: "Bob",
          last_name: "Williams",
          email: "bobwilliams@example.com",
          password:
            "$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa",
          address: "101 Cedar St, Hamletsville",
          contact_no: "+1 789-456-1230",
        },
        {
          id: 5,
          first_name: "Eva",
          last_name: "Brown",
          email: "evabrown@example.com",
          password:
            "$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa",
          address: "222 Birch St, Countryside",
          contact_no: "+1 345-678-9012",
        },
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
