import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as orderDetailService from "../Service/orderDetail";
import { IOrderDetail } from "../Interface/orderDetails";
import { JwtPayload } from "jsonwebtoken";

export const addToOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: IOrderDetail = req.body;
    const data = await orderDetailService.addToOrder(body);

    return res.status(HttpStatus.CREATED).json({
      message: "order added successfully",
    });
  } catch (error) {
    next(error);
  }
};
