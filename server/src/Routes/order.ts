import { Router } from "express";
import { createOrder } from "../Controller/order";
import { auth } from "../Middleware/auth";
const router = Router();

router.post("/", auth, createOrder);

export default router;
