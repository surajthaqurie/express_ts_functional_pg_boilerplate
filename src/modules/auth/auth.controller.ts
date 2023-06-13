import { NextFunction, Request, Response } from "express";
import { signupValidation } from "./auth.validation";
import authService from "./auth.service";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { error, value } = signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad Request",
        error: error.details[0].message
      });
    }
    const user = authService.signup(value);

    return res.json({
      success: true,
      data: user
    });
  }
}

const authController = new AuthController();
export default authController;
