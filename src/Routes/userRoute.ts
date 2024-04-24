import express from "express";

import {
  RegisterUser,
  loginUser,
  verifyUser,
} from "../Controller/userController";
import { tryCatchMiddleware } from "../Middlewares/tryCatch";

const router = express.Router();

router.post("/register", tryCatchMiddleware(RegisterUser));
router.post("/verify", tryCatchMiddleware(verifyUser));
router.post("/login", tryCatchMiddleware(loginUser));

export default router;
