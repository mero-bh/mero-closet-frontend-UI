import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Instagram from "next-auth/providers/instagram"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Apple({
            clientId: process.env.AUTH_APPLE_ID,
            clientSecret: process.env.AUTH_APPLE_SECRET,
        }),
        Instagram({
            clientId: process.env.AUTH_INSTAGRAM_ID,
            clientSecret: process.env.AUTH_INSTAGRAM_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = user.id;
                // @ts-ignore
                session.user.role = user.role;
            }
            return session;
        },
        async signIn({ user }) {
            if (user.id) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { isOnline: true, lastSeen: new Date() }
                });
            }
            return true;
        }
    },
    pages: {
        signIn: '/login',
    },
})
