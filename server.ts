import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { createServer, Server } from "http";
import app from "app";

const server: Server = createServer(app);
const PORT: number = Number(process.env.PORT) || 8848;

server.listen(PORT, (): void => {
  console.log(`Server is started on ${process.env.APP_URL}`);
});
