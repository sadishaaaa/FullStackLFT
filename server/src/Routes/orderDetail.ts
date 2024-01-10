import { Router } from "express";
import { addToOrder } from "../Controller/orderDetail";
import { auth } from "../Middleware/auth";
const router = Router();

router.post("/", auth, addToOrder);

export default router;
