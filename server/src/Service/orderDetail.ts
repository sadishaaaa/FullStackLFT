import OrderDetailModel from "../Model/orderDetails";
import { IOrderDetail } from "../Interface/orderDetails";

export const addToOrder = async (body: IOrderDetail) => {
  await OrderDetailModel.create({
    ...body,
  });

  return {
    message: "added in order detail successfully",
  };
};
