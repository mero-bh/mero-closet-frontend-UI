import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool, neonConfig } from "@neondatabase/serverless"
import ws from "ws"

// Required for Neon serverless driver to work in Node.js (local dev)
neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Hardcoded fallback for local dev debugging
const connectionUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_Rxgjf2lNyMo8@ep-proud-water-ahvjunr7-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

// Debugging: Check if connection string exists
if (!connectionUrl) {
    console.error("❌ CRITICAL ERROR: DATABASE_URL is undefined in lib/prisma.ts");
} else {
    console.log("✅ lib/prisma.ts: DETECTED DATABASE_URL (Starts with: " + connectionUrl.substring(0, 10) + "...)");
}

export const prisma = (() => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma

    console.log("🔌 Initializing Neon Pool with:", { connectionString: connectionUrl ? "EXISTS" : "MISSING" });

    const pool = new Pool({ connectionString: connectionUrl })

    // Using 'as any' to bypass version mismatch types between neon and prisma adapter
    const adapter = new PrismaNeon(pool as any)
    const client = new PrismaClient({ adapter })

    return client
})()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
