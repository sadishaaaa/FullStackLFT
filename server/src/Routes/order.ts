import { Router } from "express";
import { createOrder, getAll } from "../Controller/order";
import { auth } from "../Middleware/auth";
const router = Router();

router.post("/", auth, createOrder);
router.get("/", auth, getAll);

export default router;
