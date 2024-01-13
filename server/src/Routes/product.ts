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
import upload from "../Util/upload";

const router = Router();
router.post("/", upload.single("file"), createProduct);

router.get("/", getAll);

router
  .route("/:id")
  .get(getById)
  .put(validateReqBody(ProductSchema), updateProduct)
  .delete(deleteProduct);

// router.put("/:id", validateReqBody(ProductSchema), updateProduct);

// router.delete("/:id", deleteProduct);

export default router;
