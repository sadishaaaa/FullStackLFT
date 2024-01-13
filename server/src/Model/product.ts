import BaseModel from "../Model/baseModel";
import { IProduct } from "../Interface/product";

export default class ProductModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        productName: "product_name",
        productImage: "product_image",
        description: "description",
        price: "price",
        stock: "stock",
      })
      .from("products");
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        productName: "product_name",
        productimage: "product_image",
        description: "description",
        price: "price",
        stock: "stock",
      })
      .from("products")
      .where({ id })
      .first();
  }

  static async create(product: IProduct) {
    return this.queryBuilder().insert(product).table("products");
  }

  static async update(id: number, product: IProduct) {
    return this.queryBuilder().update(product).table("products").where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("products").where({ id }).del();
  }
}
