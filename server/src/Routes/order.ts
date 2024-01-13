import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAll,
  getAllOrder,
} from "../Controller/order";
import { auth } from "../Middleware/auth";
import { updateUser } from "../Controller/user";
const router = Router();

router.post("/", auth, createOrder);
router.get("/", auth, getAll);
router.get("/getAll", auth, getAllOrder);
router.put("/:id", updateUser);
router.delete("/:id", deleteOrder);

export default router;
