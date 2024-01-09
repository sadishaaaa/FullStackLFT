import OrderModel from "../Model/order";
import NotFoundError from "../Error/notFoundError";
import { IOrder } from "../Interface/order";

export const createOrder = async (body: IOrder) => {
  await OrderModel.create({
    ...body,
  });

  return {
    message: "order created successfully",
  };
};
