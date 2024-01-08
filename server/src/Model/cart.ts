import { ICart } from "../Interface/cart";
import BaseModel from "../Model/baseModel";
// import { IProduct } from "../Interface/product";

export default class CartModel extends BaseModel {
  //   static async getAll() {
  //     return this.queryBuilder()
  //       .select({
  //         id: "id",
  //         product_name: "product_name",
  //         product_image: "product_image",
  //         price: "price",
  //         stock: "stock",
  //       })
  //       .from("products");
  //   }
  static async getAll(id: number) {
    return this.queryBuilder()
      .select({
        id: "c.id",
        product_name: "p.product_name",
        product_image: "p.product_image",
        price: "p.price",
        first_name: "u.first_name",
        last_name: "u.last_name",
      })
      .from("cart as c")
      .join("users as u", "c.user_id", "=", "u.id")
      .join("products as p", "c.product_id", "=", "p.id")
      .where({ "c.user_id": id })
      .first();
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        product_name: "product_name",
        product_image: "product_image",
        description: "description",
        price: "price",
        stock: "stock",
      })
      .from("products")
      .where({ id })
      .first();
  }

  static async create(cart: ICart) {
    return this.queryBuilder().insert(cart).table("cart");
  }

  static async update(id: number, cart: ICart) {
    return this.queryBuilder().update(cart).table("cart").where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("cart").where({ id }).del();
  }
}
