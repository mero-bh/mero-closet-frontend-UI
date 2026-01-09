import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL

export const prisma = (() => {
    if (globalForPrisma.prisma) {
        return globalForPrisma.prisma
    }

    const pool = new Pool({ connectionString: connectionString })
    const adapter = new PrismaNeon(pool as any)
    return new PrismaClient({ adapter })
})()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
