import express, { Request, Response, NextFunction, Application } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Server is ready");
});

export default app;
