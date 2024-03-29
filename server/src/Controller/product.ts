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
    const productImage = req.file as Express.Multer.File;
    const productImg = `http://localhost:8000/${productImage.filename}`;
    console.log(productImg);
    const data = await productService.createProduct(body, productImage);

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
//single product
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

    return res.json({ message: "Product successfully deleted" });
  } catch (error) {
    next(error);
  }
};
