import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Instagram from "next-auth/providers/instagram"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "lib/prisma"

function hasSecret(value?: string) {
    return Boolean(value && value.trim() && value.trim() !== "xxxxxx")
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
        // Google is the primary provider. If its env vars are missing, Auth.js throws a confusing config error.
        ...(hasSecret(process.env.AUTH_GOOGLE_ID) && hasSecret(process.env.AUTH_GOOGLE_SECRET)
            ? [
                Google({
                    clientId: process.env.AUTH_GOOGLE_ID,
                    clientSecret: process.env.AUTH_GOOGLE_SECRET,
                    authorization: {
                        params: {
                            scope: "openid profile email",
                        },
                    },
                }),
            ]
            : []),

        // Only include Apple/Instagram if they have valid looking secrets
        ...(hasSecret(process.env.AUTH_APPLE_ID) && hasSecret(process.env.AUTH_APPLE_SECRET)
            ? [
                Apple({
                    clientId: process.env.AUTH_APPLE_ID,
                    clientSecret: process.env.AUTH_APPLE_SECRET,
                }),
            ]
            : []),
        ...(hasSecret(process.env.AUTH_INSTAGRAM_ID) && hasSecret(process.env.AUTH_INSTAGRAM_SECRET)
            ? [
                Instagram({
                    clientId: process.env.AUTH_INSTAGRAM_ID,
                    clientSecret: process.env.AUTH_INSTAGRAM_SECRET,
                }),
            ]
            : []),
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
