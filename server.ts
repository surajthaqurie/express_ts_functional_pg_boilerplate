import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, ".env") });

import { appConfig } from "src/configs";
import { createServer, Server } from "http";
import app from "app";

const server: Server = createServer(app);
const PORT: number = Number(appConfig.PORT) || 8848;

server.listen(PORT, (): void => {
  console.log(`Server is starting on ${appConfig.APP_URL} at ${new Date()} with process id:`, process.pid);
});

process.on("SIGTERM", (): void => {
  console.log("Server is closing at ", new Date());
  server.close((): void => {
    process.exit(0);
  });
});
