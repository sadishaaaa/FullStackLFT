import { Router } from "express";
import { deleteAll, getCart, getCount } from "../Controller/cart";
import { createCart } from "../Controller/cart";
import { deleteCart } from "../Controller/cart";
// import { validateReqBody, validateReqQuery } from "../Middleware/validator";
// import { updateUserSchema } from "../Schema/user";
// import { ProductSchema } from "../Schema/product";

const router = Router();

router.post("/", createCart);
router.get("/", getCart);
router.get("/count", getCount);
router.delete("/", deleteAll);
router.delete("/:id", deleteCart);

export default router;
