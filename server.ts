import { createServer, Server } from "http";
import app from "app";
import * as dotenv from "dotenv";
import path from "path";

import { env } from "src/configs";

dotenv.config({ path: path.join(__dirname, ".env") });
class CreateServer {
  public server: Server;
  private port: number;
  constructor(port: number) {
    this.server = createServer(app);
    this.port = port;
    this.server.listen(this.port, (): void => {
      console.log(`Server is starting on ${env.appConfig.APP_URL} at ${new Date()} with process id:`, process.pid);
    });
  }

  public close(): void {
    process.exit(0);
  }
}

const PORT: number = Number(env.appConfig.PORT) || 8848;
const server = new CreateServer(PORT).server;

process.on("SIGTERM", (): void => {
  console.log("Server is closing at ", new Date());
  server.close();
});

export default server;
