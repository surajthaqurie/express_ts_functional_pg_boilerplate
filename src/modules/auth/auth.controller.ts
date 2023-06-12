import { NextFunction, Request, Response } from "express";
import { signupValidation } from "./auth.validation";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { error, value } = signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad Request",
        error: error.details[0].message
      });
    }
    const user = this.authService.signup(value);

    return res.json({
      success: true,
      data: user
    });
  }
}
