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
          await prisma.user.update({
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
