import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as cartService from "../Service/cart";
import { ICart } from "../Interface/cart";
import { JwtPayload } from "jsonwebtoken";

export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ICart = req.body;
    const data = await cartService.createCart(body);

    return res.status(HttpStatus.CREATED).json({
      message: "cart created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getCart = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req?.user?.id);

    const data = await cartService.getAll(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const getCount = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req?.user?.id);

    const data = await cartService.getCount(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await cartService.deleteCart(id);

    return res.json({ message: "cartItem successfully deleted" });
  } catch (error) {
    next(error);
  }
};

//router "/", controller.createProduct
//controller -> services.createProduct
//services -> model.createProduct done
//model (creatProduct) done
