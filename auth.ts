import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Instagram from "next-auth/providers/instagram"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
        // Only include Apple/Instagram if they have valid looking secrets
        ...(process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_ID !== 'xxxxxx' ? [
            Apple({
                clientId: process.env.AUTH_APPLE_ID,
                clientSecret: process.env.AUTH_APPLE_SECRET,
            })
        ] : []),
        ...(process.env.AUTH_INSTAGRAM_ID && process.env.AUTH_INSTAGRAM_ID !== 'xxxxxx' ? [
            Instagram({
                clientId: process.env.AUTH_INSTAGRAM_ID,
                clientSecret: process.env.AUTH_INSTAGRAM_SECRET,
            })
        ] : []),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user && user) {
                // @ts-ignore
                session.user.id = user.id;
                // @ts-ignore
                session.user.role = user.role;
            }
            return session;
        },
        async signIn({ user, account }) {
            // Update online status if user exists
            if (user?.id) {
                try {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { isOnline: true, lastSeen: new Date() }
                    });
                } catch (error) {
                    console.error("Error updating user status:", error);
                }
            }
            return true;
        }
    },
    pages: {
        signIn: '/login',
    },
})
