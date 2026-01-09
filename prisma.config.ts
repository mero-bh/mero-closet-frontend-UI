// Prisma ORM v7+ reads connection URLs from prisma.config.ts (not schema.prisma).
// Also note: Prisma CLI no longer auto-loads .env files, so we load them explicitly.
import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// In Next.js, DATABASE_URL is commonly set in .env.local.
// We load .env.local first, then fall back to .env.
loadEnv({ path: ".env.local" });
loadEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
