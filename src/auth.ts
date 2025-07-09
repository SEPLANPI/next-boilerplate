import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { env } from './config/env'
import { refreshAccessToken } from './lib/auth/refresh-access-token'
import { handleInitialSignIn } from './lib/auth/handle-initial-signin'
import { routingConfig } from './config/routing'
import { verifySessionActivity } from './lib/auth/verify-session'

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
        return routingConfig.defaults.redirects.signInPagePath
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
    jwt: async ({ token, user, account, trigger }) => {
      if (account && user) {
        return handleInitialSignIn(token, user, account)
      }

      if (Date.now() > token.accessTokenExpires || trigger === 'update')
        return refreshAccessToken(token)

      if (token.accessToken) {
        const isActive = await verifySessionActivity(token.accessToken)
        if (!isActive) {
          return { ...token, error: 'TokenInvalidError' }
        }
      }

      return token
    },
    authorized: async ({ auth }) => {
      return !!auth && !auth.error
    }
  },
  pages: {
    signIn: '/api/auth/sign-in',
    error: '/erro-autenticacao'
  }
})
