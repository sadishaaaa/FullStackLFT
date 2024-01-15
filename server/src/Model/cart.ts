import { ICart } from "../Interface/cart";
import BaseModel from "../Model/baseModel";
// import { IProduct } from "../Interface/product";

export default class CartModel extends BaseModel {
  static async getAll(id: number) {
    return this.queryBuilder()
      .select({
        id: "cart.id",
        quantity: "cart.quantity",
        subtotal: "cart.Subtotal",
        product_id: "cart.product_id",
        user_id: "cart.user_id",
        product_name: "products.product_name",
        product_image: "products.product_image",
        price: "products.price",
        first_name: "users.first_name",
        last_name: "users.last_name",
        email: "users.email",
        contactNo: "users.contact_no",
      })
      .from("cart")
      .join("users", "cart.userId", "=", "users.id")
      .join("products", "cart.productId", "=", "products.id")
      .where("cart.user_id", id);
  }

  static async create(cart: ICart) {
    return this.queryBuilder().insert(cart).table("cart");
  }

  static async deleteAll() {
    return this.queryBuilder().table("cart").del();
  }

  static async delete(id: number) {
    return this.queryBuilder().table("cart").where({ id }).del();
  }

  static async getCount(id: number) {
    try {
      const count = await this.queryBuilder()
        .count("* as totalCount")
        .from("cart")
        .where("user_id", id)
        .first();

      return count.totalCount || 0;
    } catch (error) {
      console.error("Error fetching cart count:", error);
      throw error;
    }
  }
}
