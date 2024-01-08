import { Router } from "express";

import authRoutes from "./auth";
// import cookieRoutes from "./cookie";
import userRoutes from "./user";
import productRoutes from "./product";
// import projectRoutes from "./project";
import { auth } from "../Middleware/auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", auth, userRoutes);
router.use("/products", productRoutes);
// router.use("/cookie", cookieRoutes);

export default router;
