import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as wishListService from "../Service/wishList";
import { IWishList } from "../Interface/wishList";
import { JwtPayload } from "jsonwebtoken";

export const addToWishList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: IWishList = req.body;
    const data = await wishListService.addToWishList(body);

    return res.status(HttpStatus.CREATED).json({
      message: "added to wishlist successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getWishList = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req?.user?.id);

    const data = await wishListService.getAll(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWishList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await wishListService.deleteCart(id);

    return res.json({ message: "Item successfully deleted" });
  } catch (error) {
    next(error);
  }
};

//router "/", controller.createProduct
//controller -> services.createProduct
//services -> model.createProduct done
//model (creatProduct) done
