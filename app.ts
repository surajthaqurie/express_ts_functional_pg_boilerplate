import express, { NextFunction, Request, Response, Router } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./public/swagger_output.json";

import { errorHandler } from "src/middlewares";
import routes from "src/routes";

const app = express();
const router: Router = express.Router();

app.use(cors());
app.use(morgan("dev"));
app.set("rateLimit", 100);

app.use(helmet());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

routes(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  "/api/v1",
  (req: Request, res: Response, next: NextFunction): void => {
    next();
  },
  router
);

app.use(errorHandler);

export default app;
