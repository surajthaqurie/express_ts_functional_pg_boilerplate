import { Router } from "express";

import authController from "./auth.controller";

export default (router: Router, isAuth: boolean): void => {
  router.route("/auth/signup").post(authController.signup);
};
