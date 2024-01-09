import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as orderService from "../Service/order";
import { IOrder } from "../Interface/order";
import { JwtPayload } from "jsonwebtoken";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: IOrder = req.body;
    const data = await orderService.createOrder(body);

    return res.status(HttpStatus.CREATED).json({
      message: "Order placed successfully",
    });
  } catch (error) {
    next(error);
  }
};

//router "/", controller.createProduct
//controller -> services.createProduct
//services -> model.createProduct done
//model (creatProduct) done
