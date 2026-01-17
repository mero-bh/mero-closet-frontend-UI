import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "lib/prisma"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Use JWT to be compatible with Middleware
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async signIn({ user }) {
      if (user?.id) {
        try {
          // This runs on server, so DB access is fine
          // Use updateMany to safely update status without throwing P2025 if user not found yet
          await prisma.user.updateMany({
            where: { id: user.id },
            data: { isOnline: true, lastSeen: new Date() },
          })
        } catch (error) {
          console.error("Error updating user status:", error)
        }
      }
      return true
    },
  },
})
