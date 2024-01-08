import { Router } from "express";

import { deleteUser, getById, getAll, updateUser } from "../Controller/user";
import { validateReqBody, validateReqQuery } from "../Middleware/validator";
import { updateUserSchema } from "../Schema/user";

const router = Router();

router.get("/", getAll);

router.get("/:id", getById);

router.put("/:id", validateReqBody(updateUserSchema), updateUser);

router.delete("/:id", deleteUser);

export default router;
