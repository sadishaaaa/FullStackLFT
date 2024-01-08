import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as cartService from "../Service/cart";
import { ICart } from "../Interface/cart";

// export const createProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const body: ICart = req.body;
//     const data = await cartService.createProduct(body);

//     return res.status(HttpStatus.CREATED).json({
//       message: "product created successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// export const getAll = async (_req: Request, res: Response) => {
//   const data = await cartService.getAll();

//   return res.json({
//     data,
//   });
// };

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await cartService.getById(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = Number(req.params.id);
//     const body: ICart = req.body;
//     const data = await cartService.update(id, body);

//     return res.json({ data });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const id = Number(req.params.id);

//     const data = await cartService.deleteProduct(id);

//     return res.json({ message: "User successfully deleted" });
//   } catch (error) {
//     next(error);
//   }
// };
