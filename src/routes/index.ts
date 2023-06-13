// import { Application } from "express";

// const appRoute = (router: Application): void => {
//   //   app.use("");
// };

// export default appRoute;

// // todo: separate app user role routes

import { Router } from "express";
import authRouter from "../modules/auth/auth.route";

const router = Router();

router.use("/auth", authRouter);

export default router;
