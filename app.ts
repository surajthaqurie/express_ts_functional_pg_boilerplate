import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import indexRouter from "./src/routes";
// import { errorHandler } from "src/middlewares";

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

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // this.app.use((err: any, req: any, res: any, next: any) => {
    //   console.log("----------------->", err);
    // });
  }

  private configureRoute(): void {
    this.app.use("/api/v1", indexRouter);
  }
}

const app = new App().app;
app.use((err: any, req: any, res: any, next: any) => {
  console.log("----------------->", err);
});
export default app;
