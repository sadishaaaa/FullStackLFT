import CartModel from "../Model/cart";
import NotFoundError from "../Error/notFoundError";
import { ICart } from "../Interface/cart";

export const createCart = async (body: ICart) => {
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

export const getCount = async (id: number) => {
  const data = await CartModel.getCount(id);

  return data;
};

// export const getById = async (id: number) => {
//   const data = await CartModel.getById(id);

//   if (!data) {
//     throw new NotFoundError(`Product with id: ${id} not found`);
//   }

//   return data;
// };

// export const update = async (id: number, body: ICart) => {
//   const product = await CartModel.getAll(id);

//   if (!product) {
//     throw new NotFoundError(`Product with id: ${id} not found`);
//   }

//   await CartModel.update(id, body);

//   const updatedProduct = await CartModel.getAll(id);

//   return updatedProduct;
// };

export const deleteAll = async () => {
  const cartItem = await CartModel.deleteAll();

  if (!cartItem) {
    throw new NotFoundError(`Product not found`);
  }

  await CartModel.deleteAll();
};
export const deleteCart = async (id: number) => {
  const cartItem = await CartModel.getAll(id);

  if (!cartItem) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  await CartModel.delete(id);
};
