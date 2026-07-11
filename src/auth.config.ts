import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user

            const protectedPaths = ["/dashboard", "/profile", "/settings", "/change-password", "/create-company"]
            const isProtected = protectedPaths.some((p) => nextUrl.pathname.startsWith(p))

            const authPaths = ["/signin", "/signup"]
            const isOnAuthPage = authPaths.some((p) => nextUrl.pathname.startsWith(p))

            if (isProtected) {
                return isLoggedIn
            }

            if (isOnAuthPage && isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl))
            }

            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            if (token?.id && session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    providers: [], // Credentials provider (with its Prisma/bcrypt logic) lives in auth.ts, not here
} satisfies NextAuthConfig