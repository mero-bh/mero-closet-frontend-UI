import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const rawConnectionString = process.env.DATABASE_URL

export const prisma = (() => {
    console.log("[Prisma Debug] Initializing Prisma Client...")

    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma
    }

    const connectionString = (rawConnectionString || "").trim()

    if (!connectionString) {
        console.error("[Prisma Fatal] DATABASE_URL is missing!")
        if (process.env.NODE_ENV === "production") {
            throw new Error("DATABASE_URL is required in production")
        }
    }

    try {
        console.log("[Prisma Debug] Creating Prisma Client with Neon Adapter...")
        const pool = new Pool({ connectionString })
        const adapter = new PrismaNeon(pool as any)

        // We pass the connectionString BOTH to the pool and explicitly to the client
        // This prevents the "localhost" fallback in some versions of Prisma/Next-Auth
        const client = new PrismaClient({
            adapter,
            datasourceUrl: connectionString, // FORCE the url here as a fallback
        })

        console.log("[Prisma Debug] Prisma Client successfully bound to Neon.")
        return client
    } catch (err) {
        console.error("[Prisma Debug] FATAL ERROR during initialization:", err)
        throw err
    }
})()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
