import { ICart } from "../Interface/cart";
import { IOrderDetail } from "../Interface/orderDetails";
import BaseModel from "../Model/baseModel";
// import { IProduct } from "../Interface/product";

export default class OrderDetailModel extends BaseModel {
  static async create(order: IOrderDetail) {
    return this.queryBuilder().insert(order).table("orderdetail");
  }

  static async delete(id: number) {
    return this.queryBuilder().table("cart").where({ id }).del();
  }
}
