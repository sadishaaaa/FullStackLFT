import { Router } from "express";
import { signup, login } from "../Controller/auth";
import { validateReqBody } from "../Middleware/validator";
import { UserSchema } from "../Schema/user";

const router = Router();
router.post("/signup", validateReqBody(UserSchema), signup);
router.post("/login", login);
export default router;
