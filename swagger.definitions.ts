import { env } from "src/configs";
import authApi from "src/modules/auth/api.definitions";

export default {
  server: {
    openapi: "3.0.1",
    info: {
      title: env.appConfig.APP_NAME,
      description: `Api documentation of <b>${env.appConfig.APP_NAME}</b>.`,
      version: "1.0.0"
    },
    servers: [
      {
        url: `${process.env.APP_URL}/api/v1`,
        description: "Main Server"
      }
    ],
    tags: [...authApi.server.tags],
    paths: {
      ...authApi.server.paths
    },
    components: {
      schemas: {
        CommonResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            status: { type: "number" }
          }
        },
        ...authApi.server.components.schemas
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
};
