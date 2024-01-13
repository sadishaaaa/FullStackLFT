import BaseModel from "../Model/baseModel";
import { IUser } from "../Interface/user";
import { ISignUp } from "../Interface/auth";

export default class UserModel extends BaseModel {
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: "id",
        first_name: "first_name",
        last_name: "last_name",
        email: "email",
        address: "address",
        contactNo: "contact_no",
      })
      .from("users");
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        first_name: "first_name",
        last_name: "last_name",
        email: "email",
        address: "address",
        contact_no: "contact_no",
        role: "role",
      })
      .from("users")
      .where({ id })
      .first();
  }

  static async getByEmail(email: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        first_name: "first_name",
        last_name: "last_name",
        password: "password",
        email: "email",
        role: "role",
      })
      .from("users")
      .where({ email });

    return user?.[0];
  }

  static async create(user: ISignUp) {
    return this.queryBuilder().insert(user).table("users");
  }

  static async update(id: number, user: IUser) {
    return this.queryBuilder().update(user).table("users").where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table("users").where({ id }).del();
  }
}
