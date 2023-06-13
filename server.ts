import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, ".env") });

import { env } from "src/configs";
import { createServer, Server } from "http";
import app from "app";

class CreateServer {
  public server: Server;
  public PORT: number = Number(env.appConfig.PORT) || 8848;
  constructor() {
    this.server = createServer(app);
    this.server.listen(this.PORT, (): void => {
      console.log(`Server is starting on ${env.appConfig.APP_URL} at ${new Date()} with process id:`, process.pid);
    });
  }
}

const server = new CreateServer().server;
process.on("SIGTERM", (): void => {
  console.log("Server is closing at ", new Date());
  server.close((): void => {
    process.exit(0);
  });
});
