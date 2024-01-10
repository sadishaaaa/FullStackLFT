import OrderModel from "../Model/order";
import OrderDetailModel from "../Model/orderDetails";
import NotFoundError from "../Error/notFoundError";
import { IOrder } from "../Interface/order";
import { IOrderDetail } from "../Interface/orderDetails";

export const createOrder = async (body: IOrder, products: IOrderDetail[]) => {
  const [orderId] = await OrderModel.create({
    ...body,
  });
  console.log("orderId", orderId.id);
  const orderDetails = await Promise.all(
    products.map(async (product: IOrderDetail) => {
      console.log("productId", product.product_id);
      const result = await OrderDetailModel.create({
        order_id: orderId.id,
        product_id: product.product_id,
        quantity: product.quantity,
      });

      return result[0];
    })
  );

  return {
    order_id: orderId,
    order_details: orderDetails,
    message: "Order created successfully",
  };
};

export const getAll = async (id: number) => {
  const data = await OrderModel.getAll(id);

  return data;
};
