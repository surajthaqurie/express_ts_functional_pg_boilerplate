import { Router } from "express";

import authRouter from "../modules/auth/auth.route";

export default (router: Router, isAuth = false): void => {
  authRouter(router, isAuth);
};
