import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  allowPublicKeyRetrieval: true,
  logger: {
    // network: (msg) => console.log(msg),
    // warning: (msg) => console.log(msg),
    // error: (error) => console.log(error),
  },
});

const prisma = new PrismaClient({
  adapter,
  omit: {
    user: {
      password: true,
    },
  },
  log: ["error", "info", "warn"],
});

export default prisma;
