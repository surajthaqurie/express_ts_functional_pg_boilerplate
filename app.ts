import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import swaggerUi from "swagger-ui-express";

import indexRouter from "src/routes";
import { errorHandler } from "src/middlewares";
import swaggerDefinitions from "swagger.definitions";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoute();
  }

  private configureMiddlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.set("rateLimit", 100);

    this.app.use(helmet());
    this.app.use("/public", express.static(path.join(__dirname, "public")));

    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: false }));
  }

  private configureRoute(): void {
    this.app.use("/api/v1", indexRouter);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinitions.server));
  }
}

const app = new App().app;
app.use(errorHandler);

export default app;
