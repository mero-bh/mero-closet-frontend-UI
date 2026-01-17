import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Hardcoded fallback for local dev debugging (and Vercel temporary fix)
const connectionUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_Rxgjf2lNyMo8@ep-proud-water-ahvjunr7-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

// Debugging
if (!connectionUrl) {
    console.error("❌ CRITICAL ERROR: DATABASE_URL is undefined in lib/prisma.ts");
} else {
    console.log("✅ lib/prisma.ts: DETECTED DATABASE_URL (Starts with: " + connectionUrl.substring(0, 10) + "...)");
}

export const prisma = (() => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma

    console.log("🔌 Initializing STANDARD Prisma Client...");

    // Standard initialization - No Adapter, No Pool, No WS
    const client = new PrismaClient({
        datasources: {
            db: {
                url: connectionUrl
            }
        },
        log: ['warn', 'error'],
    })

    return client
})()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
