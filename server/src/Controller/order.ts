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
//router "/", controller.createProduct
//controller -> services.createProduct
//services -> model.createProduct done
//model (creatProduct) done
