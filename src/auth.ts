import NextAuth, { NextAuthConfig } from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { cookies } from 'next/headers'
export const authOptions: NextAuthConfig = {
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_KEYCLOAK_ID, // Correct Keycloak client ID
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET, // Correct Keycloak client secret
      issuer: process.env.AUTH_KEYCLOAK_ISSUER // Correct Keycloak realm URL
    })
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async jwt({ token, account }) {
      if (account) {
        cookies().set({
          name: 'keycloak-teste',
          value: account.access_token,
          httpOnly: true
        })
        token.accessToken = account.access_token
      }
      return token
    }
  },
  secret: process.env.AUTH_SECRET,
  debug: true
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
