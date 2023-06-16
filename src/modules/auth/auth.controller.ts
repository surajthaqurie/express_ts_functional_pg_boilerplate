import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await authService.signup(req.body);
    return res.json({
      success: true,
      data: user
    });
  }
}

const authController = new AuthController();
export default authController;
