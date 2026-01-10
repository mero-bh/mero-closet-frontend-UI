import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const rawConnectionString = process.env.DATABASE_URL

export const prisma = (() => {
    console.log("[Prisma Debug] Initializing Prisma Client...")
    console.log(`[Prisma Debug] NODE_ENV: ${process.env.NODE_ENV}`)

    if (globalForPrisma.prisma) {
        console.log("[Prisma Debug] Using existing global prisma instance.")
        return globalForPrisma.prisma
    }

    if (!rawConnectionString || rawConnectionString.trim() === "") {
        console.error("[Prisma Warning] DATABASE_URL is UNDEFINED or EMPTY.")
        // In local development, we might expect it to fail, but in production this is critical.
        if (process.env.NODE_ENV === "production") {
            throw new Error("CRITICAL: DATABASE_URL is missing in production environment!")
        }
    } else {
        console.log(`[Prisma Debug] DATABASE_URL found. Length: ${rawConnectionString.length}`)
        console.log(`[Prisma Debug] URL Starts with: ${rawConnectionString.substring(0, 15)}...`)
    }

    // Clean the connection string
    let connectionString = (rawConnectionString || "").trim()

    // Neon's serverless driver sometimes performs better with postgres://
    if (connectionString.startsWith("postgresql://")) {
        console.log("[Prisma Debug] Normalizing postgresql:// to postgres:// for Neon adapter")
        connectionString = connectionString.replace("postgresql://", "postgres://")
    }

    try {
        console.log("[Prisma Debug] Creating Neon Pool and Adapter...")
        const pool = new Pool({ connectionString })
        const adapter = new PrismaNeon(pool as any)

        const client = new PrismaClient({
            adapter,
            log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
        })

        console.log("[Prisma Debug] Prisma Client created successfully.")
        return client
    } catch (err) {
        console.error("[Prisma Debug] FATAL ERROR during initialization:", err)
        throw err
    }
})()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
