import NotFoundError from "../Error/notFoundError";
import { IWishList } from "../Interface/wishList";
import WishListModel from "../Model/wishList";

export const addToWishList = async (body: IWishList) => {
  await WishListModel.create({
    ...body,
  });

  return {
    message: "Added to cart successfully",
  };
};
export const getAll = async (id: number) => {
  const data = await WishListModel.getAll(id);

  return data;
};

export const deleteCart = async (id: number) => {
  const Item = await WishListModel.getAll(id);

  if (!Item) {
    throw new NotFoundError(`Product with id: ${id} not found`);
  }

  await WishListModel.delete(id);
};
