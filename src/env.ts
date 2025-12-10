import { env } from "elysia";
import { AppLogger } from "@/core/logger";

export function loadEnv() {
  if (!env.DATABASE_URL) {
    const error = new Error("Missing environments variables");
    AppLogger.error(error);
    throw error;
  }

  AppLogger.info("Environment variables loaded successfully.");
}
