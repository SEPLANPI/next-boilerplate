import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { env } from './config/env'
import { refreshAccessToken } from './lib/auth/refresh-access-token'
import { handleInitialSignIn } from './lib/auth/handle-initial-signin'
import { routingConfig } from './config/routing'

const keycloakProvider = KeycloakProvider({
  clientId: env.AUTH_KEYCLOAK_ID,
  clientSecret: env.AUTH_KEYCLOAK_SECRET,
  issuer: env.AUTH_KEYCLOAK_ISSUER
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [keycloakProvider],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account && user) {
        return true
      } else {
        return routingConfig.defaults.unauthorized.defaultUnauthenticatedPath
      }
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user
        session.error = token.error
        session.accessToken = token.accessToken
      }
      return session
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        return handleInitialSignIn(token, user, account)
      }

      if (Date.now() < token.accessTokenExpires) return token
      return refreshAccessToken(token)
    },
    authorized: async ({ auth }) => {
      return !!auth && !auth.error
    }
  },
  pages: {
    signIn: '/api/auth/sign-in'
  }
})
