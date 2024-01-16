import { IOrder } from "../Interface/order";
import BaseModel from "../Model/baseModel";

export default class OrderModel extends BaseModel {
  static async create(order: IOrder) {
    return this.queryBuilder().insert(order).table("order").returning("id");
  }
  static async getAllOrder() {
    return this.queryBuilder()
      .select({
        id: "order.id",
        user_id: "order.user_id",
        order_date: "order.order_time",
        payment_status: "order.payment_status",
        product_name: "products.product_name",
        product_image: "products.product_image",
        price: "products.price",
        first_name: "users.first_name",
        last_name: "users.last_name",
      })
      .from("order")
      .join("users", "order.user_id", "=", "users.id")
      .join("orderdetail", "order.id", "=", "orderdetail.order_id")
      .join("products", "orderdetail.product_id", "=", "products.id");
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
  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        paymentStatus: "payment_status",
      })
      .from("order")
      .where({ id })
      .first();
  }
  static async update(id: number, order: IOrder) {
    return this.queryBuilder().update(order).table("order").where({ id });
  }
  static async delete(id: number) {
    return this.queryBuilder().table("order").where({ id }).del();
  }

  static async findById(id: number): Promise<IOrder | null> {
    return this.queryBuilder().table("order").where({ id }).first();
  }

  static async updateStatus(id: number, currentStatus: boolean) {
    const newStatus = !currentStatus;
    return this.queryBuilder()
      .table("order")
      .where("id", id)
      .update({ payment_status: newStatus });
  }
}
