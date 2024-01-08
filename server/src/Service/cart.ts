import CartModel from "../Model/cart";
import NotFoundError from "../Error/notFoundError";
import { ICart } from "../Interface/cart";

export const createProduct = async (body: ICart) => {
  await CartModel.create({
    ...body,
  });

  return {
    message: "Added to cart successfully",
  };
};
export const getAll = async (id: number) => {
  const data = await CartModel.getAll(id);

  return data;
};

export const getById = async (id: number) => {
  const data = await CartModel.getById(id);

  if (!data) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  return data;
};

export const update = async (id: number, body: ICart) => {
  const product = await CartModel.getById(id);

  if (!product) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  await CartModel.update(id, body);

  const updatedProduct = await CartModel.getById(id);

  return updatedProduct;
};

export const deleteProduct = async (id: number) => {
  const product = await CartModel.getById(id);

  if (!product) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  await CartModel.delete(id);
};
