import { Router } from "express";

import authRoutes from "./auth";
// import cookieRoutes from "./cookie";
import userRoutes from "./user";
import productRoutes from "./product";
import cartRoutes from "./cart";
import orderRoutes from "./order";
import orderDetailRoutes from "./orderDetail";
import { auth } from "../Middleware/auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", auth, userRoutes);
router.use("/products", productRoutes);
router.use("/cart", auth, cartRoutes);
router.use("/wishList", auth, cartRoutes);
router.use("/order", orderRoutes);
router.use("/orderDetail", orderDetailRoutes);
// router.use("/cookie", cookieRoutes);

export default router;
