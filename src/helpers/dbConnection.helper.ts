import { PrismaClient } from "@prisma/client";
import { dbConfig } from "src/configs";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbConfig.DATABASE_URL
    }
  }
});

export { prisma };
