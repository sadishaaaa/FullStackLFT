import ProductModel from "../Model/product";
import NotFoundError from "../Error/notFoundError";
import { IProduct } from "../Interface/product";

export const createProduct = async (
  body: IProduct,
  productImage: Express.Multer.File
) => {
  body.productImage = `http://localhost:8000/${productImage.filename}`;
  console.log("Image", body.productImage);
  await ProductModel.create({
    ...body,
  });

  return {
    message: "Product added successfully",
  };
};
export const getAll = async () => {
  const data = await ProductModel.getAll();

  return data;
};

export const getById = async (id: number) => {
  const data = await ProductModel.getById(id);

  if (!data) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  return data;
};

export const update = async (id: number, body: IProduct) => {
  const product = await ProductModel.getById(id);

  if (!product) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  await ProductModel.update(id, body);

  const updatedProduct = await ProductModel.getById(id);

  return updatedProduct;
};

export const deleteProduct = async (id: number) => {
  const product = await ProductModel.getById(id);

  if (!product) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  await ProductModel.delete(id);
};
