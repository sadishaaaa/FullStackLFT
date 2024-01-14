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
export const getAllOrder = async () => {
  const data = await OrderModel.getAllOrder();

  return data;
};
export const getById = async (id: number) => {
  const data = await OrderModel.getById(id);

  if (!data) {
    throw new NotFoundError(`order with id: ${id} not found`);
  }

  return data;
};

export const update = async (id: number, body: IOrder) => {
  const order = await OrderModel.getAll(id);

  if (!order) {
    throw new NotFoundError(`User with id: ${id} not found`);
  }

  await OrderModel.update(id, body);

  const updatedOrder = await OrderModel.getAll(id);

  return updatedOrder;
};

export const deleteOrder = async (id: number) => {
  const Order = await OrderModel.getAll(id);
  // const OrderDetail = await OrderDetailModel.get

  if (!Order) {
    throw new NotFoundError(`Order with id: ${id} not found`);
  }

  await OrderModel.delete(id);
};

// services
export const toggleOrderStatus = async (id: number) => {
  const order = await OrderModel.queryBuilder()
    .table("order")
    .where({ id: id })
    .first();

  if (!order) {
    throw new Error("Order not found");
  }

  console.log("Initial Status:", order.paymentStatus);

  const newStatus = order.paymentStatus;

  let result = await OrderModel.updateStatus(id, newStatus);

  const updatedOrder = await OrderModel.queryBuilder()
    .table("order")
    .where({ id: id })
    .first();

  if (!updatedOrder) {
    throw new Error("Error fetching updated order");
  }

  console.log("Updated Status:", updatedOrder.paymentStatus);

  return {
    order_id: id,
    data: updatedOrder.paymentStatus,
    message: "Order status toggled successfully",
  };
};
