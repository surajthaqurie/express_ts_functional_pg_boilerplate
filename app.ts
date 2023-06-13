import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
// import appRoute from "src/routes";
import path from "path";

import indexRouter from "./src/routes";

// try {
//   app.use(cors());
//   app.use(morgan("dev"));
//   app.set("rateLimit", 100);

//   app.options("*", cors());
//   app.use(helmet());
//   app.use("/public", express.static(path.join(__dirname, "public")));

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: false }));

//   app.use((req: Request, res: Response, next: NextFunction): void => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization,x-access-token,Accept,Origin");
//     res.setHeader("Cache-Control", 'no-cache="Set-Cookie, Set-Cookie2"');
//     next();
//   });

//   appRoute(app);

//   // todo: not found route
//   // todo: error handling
// } catch (err) {
//   console.log("error", err);
//   process.exit(0);
// }

// export default app;

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
  }

  private configureRoute(): void {
    this.app.use("/api/v1", indexRouter);
  }
}

const app = new App().app;
export default app;
