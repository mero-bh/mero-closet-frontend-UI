import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import Instagram from "next-auth/providers/instagram"

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    pages: {
        signIn: '/login',
    },
})
