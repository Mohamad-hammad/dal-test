import { DataSource } from "typeorm";
import { Transaction } from "./entities/Transaction";
import dotenv from "dotenv";

dotenv.config();

// Database configuration for Supabase PostgreSQL with TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  synchronize: true,
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
