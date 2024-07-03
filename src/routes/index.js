import { Router } from "express";
import userRouter from "./user.router.js";

const router = Router();

router.use("/auth", userRouter);

export default router;
