import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import { SuccessResponse } from "src/common/utils";
import { AUTH_MESSAGE_CONSTANT } from "src/common/constants";
import { HttpStatus } from "src/common/enums";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await authService.signup(req.body);
    return new SuccessResponse(HttpStatus.CREATED, AUTH_MESSAGE_CONSTANT.USER_CREATED_SUCCESSFULLY, user).sendResponse(res);
  }
}

const authController = new AuthController();
export default authController;
