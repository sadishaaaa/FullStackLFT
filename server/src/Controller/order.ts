import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as orderService from "../Service/order";
import { IOrder } from "../Interface/order";
import { JwtPayload } from "jsonwebtoken";
import { IOrderDetail } from "../Interface/orderDetails";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { body, products } = req.body;

    const result = await orderService.createOrder(body, products);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAll = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req?.user?.id);

    const data = await orderService.getAll(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllOrder = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await orderService.getAllOrder();

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const body: IOrder = req.body;
    const data = await orderService.update(id, body);

    return res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await orderService.deleteOrder(id);

    return res.json({ message: "Product successfully deleted" });
  } catch (error) {
    next(error);
  }
};
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await orderService.getById(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const toggleOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    console.log("Order ID:", id);
    const result = await orderService.toggleOrderStatus(id);
    console.log("Toggle Result:", result);
    res.status(HttpStatus.OK).json(result);
  } catch (error) {
    console.error("Error toggling order status:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
//router "/", controller.createProduct
//controller -> services.createProduct
//services -> model.createProduct done
//model (creatProduct) done
