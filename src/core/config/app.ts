import { env } from "bun";

export const APP_CONSTANTS = {
  ENCRYPTION_KEY: env.APP_ENCRYPTION_KEY!,
};
