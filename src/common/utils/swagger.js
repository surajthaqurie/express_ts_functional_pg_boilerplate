const fs = require("fs");
require("dotenv").config();

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const swagger_output_path = process.cwd() + "/public/swagger_output.json";

if (fs.existsSync(swagger_output_path)) {
  fs.unlinkSync(swagger_output_path);
  fs.openSync(swagger_output_path, "w");
} else {
  fs.openSync(swagger_output_path, "w");
}

const endpointFiles = [process.cwd() + "/src/modules/auth/auth.route.ts"];

const doc = {
  info: {
    version: "1.0.0",
    name: process.env.APP_NAME,
    description: `Api documentation of <b> ${process.env.APP_NAME}</b> `
  },
  servers: [
    {
      url: `${process.env.APP_URL}/api/v1`,
      description: "Main Server"
    }
  ],
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  },
  definitions: {
    AuthSignupPayload: {
      firstName: "suraj",
      lastName: "thaqurie",
      username: "suraj12",
      password: "Player@123",
      confirmPassword: "Player@123",
      email: "devlop143@gmail.com",
      phone: "0000000000"
    },
    AuthSignupSuccess: {
      success: true,
      message: "User created Successfully.",
      data: {
        id: "84012b1e-900b-4ff7-bcff-d1dad341abdf",
        firstName: "Suraj",
        lastName: "thaqurie",
        username: "suraj12",
        phone: "0000000000",
        status: false,
        role: "USER",
        avatar: null,
        deleted: false,
        createdAt: "2023-06-18T17:35:47.699Z",
        updatedAt: "2023-06-18T17:35:47.699Z",
        deletedAt: false
      }
    }
  }
};

swaggerAutogen(swagger_output_path, endpointFiles, doc);
