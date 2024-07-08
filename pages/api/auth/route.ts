// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        // Simplified authorization
        if (credentials?.username === "user" && credentials?.password === "pass") {
          return {id: "1", name: "Test User", email: "test@example.com"}
        }
        return null
      }
    })
  ],
})

export {handler as GET, handler as POST}
