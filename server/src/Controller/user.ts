import { NextFunction, Request, Response } from "express";

import * as userService from "../Service/user";
import { IUser } from "../Interface/user";

export const getAll = async (_req: Request, res: Response) => {
  const data = await userService.getAll();

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

    const data = await userService.getById(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const body: IUser = req.body;
    const data = await userService.update(id, body);

    return res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await userService.deleteUser(id);

    return res.json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
};
