import { Router } from "express";
import {
  addToWishList,
  deleteWishList,
  getWishList,
} from "../Controller/wishList";
// import { validateReqBody, validateReqQuery } from "../Middleware/validator";
// import { updateUserSchema } from "../Schema/user";
// import { ProductSchema } from "../Schema/product";

const router = Router();

router.post("/", addToWishList);
router.get("/", getWishList);
router.delete("/:id", deleteWishList);

export default router;
