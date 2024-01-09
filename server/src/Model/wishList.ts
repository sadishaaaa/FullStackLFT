import { IWishList } from "../Interface/wishList";
import BaseModel from "../Model/baseModel";

export default class WishListModel extends BaseModel {
  static async getAll(id: number) {
    return this.queryBuilder()
      .select({
        id: "wishlist.id",
        first_name: "users.first_name",
        last_name: "users.last_name",
        product_name: "products.product_name",
        product_image: "products.product_image",
        price: "products.price",
      })
      .from("wishlist")
      .join("users", "wishlist.userId", "=", "users.id")
      .join("products", "wishlist.productId", "=", "products.id")
      .where("wishlist.user_id", id);
  }

  static async create(wishList: IWishList) {
    return this.queryBuilder().insert(wishList).table("wishlist");
  }

  static async delete(id: number) {
    return this.queryBuilder().table("wishlist").where({ id }).del();
  }
}
