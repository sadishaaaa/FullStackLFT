import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getById,
  getAll,
  updateProduct,
} from "../Controller/product";
import { validateReqBody, validateReqQuery } from "../Middleware/validator";
import { updateUserSchema } from "../Schema/user";

const router = Router();
router.post("/", createProduct);

router.get("/", getAll);

router.get("/:id", getById);

router.put("/:id", validateReqBody(updateUserSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
