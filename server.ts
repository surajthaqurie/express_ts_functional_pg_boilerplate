import { createServer, Server } from "http";
import * as dotenv from "dotenv";
import path from "path";

import app from "app";
import { env } from "src/configs";

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT: number = Number(env.appConfig.PORT) || 8848;
const server: Server = createServer(app);

server.listen(PORT, (): void => {
  console.log(`Server is starting on ${env.appConfig.APP_URL} at ${new Date()} with process id:`, process.pid);
  console.log(`Swagger API docs is  started on ${process.env.APP_URL}/api-docs`);
});

process.on("SIGTERM", (): void => {
  console.log("Server is closing at ", new Date());
  server.close();
});

export default server;
