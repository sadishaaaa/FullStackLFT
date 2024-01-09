import { Router } from "express";

import { getCart } from "../Controller/cart";
import { createCart } from "../Controller/cart";
import { deleteCart } from "../Controller/cart";
// import { validateReqBody, validateReqQuery } from "../Middleware/validator";
// import { updateUserSchema } from "../Schema/user";
// import { ProductSchema } from "../Schema/product";

const router = Router();

router.post("/", createCart);
router.get("/", getCart);
router.delete("/:id", deleteCart);

export default router;
