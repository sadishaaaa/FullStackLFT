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
import { ProductSchema } from "../Schema/product";

const router = Router();
router.post("/", validateReqBody(ProductSchema), createProduct);

router.get("/", getAll);

router.get("/:id", getById);

router.put("/:id", validateReqBody(ProductSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
