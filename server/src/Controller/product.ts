import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as productService from "../Service/product";
import { IProduct } from "../Interface/product";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: IProduct = req.body;
    const product_image = req.file as Express.Multer.File;
    const product_img = `http://localhost:8000/${product_image.filename}`;
    console.log(product_img);
    const data = await productService.createProduct(body, product_image);

    return res.status(HttpStatus.CREATED).json({
      message: "product created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getAll = async (_req: Request, res: Response) => {
  const data = await productService.getAll();

  return res.json({
    data,
  });
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await productService.getById(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const body: IProduct = req.body;
    const data = await productService.update(id, body);

    return res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await productService.deleteProduct(id);

    return res.json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};
