import { dotEnv as env } from "src/utils";

export const appConfig = {
  PORT: env.PORT,
  APP_URL: env.APP_URL,
  NODE_ENV: env.NODE_ENV
};
