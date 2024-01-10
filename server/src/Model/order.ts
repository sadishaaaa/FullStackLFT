import { ICart } from "../Interface/cart";
import { IOrder } from "../Interface/order";
import BaseModel from "../Model/baseModel";
// import { IProduct } from "../Interface/product";

export default class OrderModel extends BaseModel {
  static async create(order: IOrder) {
    return this.queryBuilder().insert(order).table("order").returning("id");
  }
  static async getAll(id: number) {
    return this.queryBuilder()
      .select({
        id: "order.id",
        user_id: "order.user_id",
        order_date: "order.order_time",
        product_name: "products.product_name",
        product_image: "products.product_image",
        price: "products.price",
        first_name: "users.first_name",
        last_name: "users.last_name",
      })
      .from("order")
      .join("users", "order.user_id", "=", "users.id")
      .join("orderdetail", "order.id", "=", "orderdetail.order_id")
      .join("products", "orderdetail.product_id", "=", "products.id")
      .where("order.user_id", id);
  }

  static async delete(id: number) {
    return this.queryBuilder().table("order").where({ id }).del();
  }
}
