import express from "express";
import authController from "./auth.controller";
import { catchAsyncHandler } from "src/helpers";

const router = express.Router();

router.route("/signup").post(catchAsyncHandler(authController.signup));

export default router;
