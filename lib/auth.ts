import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        if (credentials.email !== process.env.ADMIN_EMAIL) return null

        const adminPasswordHash = process.env.ADMIN_PASSWORD ?? ""

        // Support both plain text (dev) and bcrypt hash
        let isValid = false
        if (adminPasswordHash.startsWith("$2")) {
          isValid = await bcryptjs.compare(credentials.password, adminPasswordHash)
        } else {
          isValid = credentials.password === adminPasswordHash
        }

        if (!isValid) return null
        return { id: "admin", email: process.env.ADMIN_EMAIL!, name: "Admin" }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin"
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role
      return session
    },
  },
}
