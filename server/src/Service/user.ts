import UserModel from "../Model/user";
import NotFoundError from "../Error/notFoundError";
import { IUser } from "../Interface/user";

export const getAll = async () => {
  const data = await UserModel.getAll();

  return data;
};

export const getById = async (id: number) => {
  const data = await UserModel.getById(id);

  if (!data) {
    throw new NotFoundError(`User with id: ${id} not found`);
  }

  return data;
};

export const update = async (id: number, body: IUser) => {
  const user = await UserModel.getById(id);

  if (!user) {
    throw new NotFoundError(`User with id: ${id} not found`);
  }

  await UserModel.update(id, body);

  const updatedUser = await UserModel.getById(id);

  return updatedUser;
};

export const deleteUser = async (id: number) => {
  const user = await UserModel.getById(id);

  if (!user) {
    throw new NotFoundError(`User with id: ${id} not found`);
  }

  await UserModel.delete(id);
};
