import { Router } from "express";
import { auth } from "../Middleware/auth";
import {
  deleteUser,
  getById,
  getAll,
  updateUser,
  checkTokenvalid,
} from "../Controller/user";
import { validateReqBody, validateReqQuery } from "../Middleware/validator";
import { updateUserSchema } from "../Schema/user";
const router = Router();
router.get("/", getAll);
router.get("/me", auth, checkTokenvalid);
router.get("/:id", getById);
router.put("/:id", validateReqBody(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
