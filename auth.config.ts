import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Instagram from "next-auth/providers/instagram"

function hasSecret(value?: string) {
    return Boolean(value && value.trim() && value.trim() !== "xxxxxx")
}

function buildProviders() {
    const providers: any[] = []

    // Google is the primary provider.
    if (hasSecret(process.env.AUTH_GOOGLE_ID) && hasSecret(process.env.AUTH_GOOGLE_SECRET)) {
        providers.push(
            Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
                authorization: {
                    params: { scope: "openid profile email" },
                },
            })
        )
    }

    // Optional providers
    if (hasSecret(process.env.AUTH_APPLE_ID) && hasSecret(process.env.AUTH_APPLE_SECRET)) {
        providers.push(
            Apple({
                clientId: process.env.AUTH_APPLE_ID,
                clientSecret: process.env.AUTH_APPLE_SECRET,
            })
        )
    }

    if (hasSecret(process.env.AUTH_INSTAGRAM_ID) && hasSecret(process.env.AUTH_INSTAGRAM_SECRET)) {
        providers.push(
            Instagram({
                clientId: process.env.AUTH_INSTAGRAM_ID,
                clientSecret: process.env.AUTH_INSTAGRAM_SECRET,
            })
        )
    }

    return providers
}

export const authConfig = {
    providers: buildProviders(),
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') // Example protected route
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }
            return true
        },
        async session({ session, user, token }) {
            // In JWT strategy/Edge, user info comes from token
            if (session.user && token?.sub) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        }
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
} satisfies NextAuthConfig
