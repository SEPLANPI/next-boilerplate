import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { mockAuthConfig } from './lib/auth/mock-auth'

// Função para detectar se o Keycloak está configurado
function isKeycloakConfigured() {
  return !!(
    process.env.AUTH_KEYCLOAK_ISSUER &&
    process.env.AUTH_KEYCLOAK_ID &&
    process.env.AUTH_KEYCLOAK_SECRET
  )
}

// Configuração base do NextAuth
const baseConfig = {
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user
        session.error = token.error
        session.accessToken = token.accessToken
      }
      return session
    },
    async authorized({ auth }: { auth: any }) {
      return !!auth && !auth.error
    }
  },
  pages: {
    signIn: '/api/auth/sign-in',
    error: '/erro-autenticacao'
  }
}

// Configuração específica para Keycloak
const keycloakConfig = {
  ...baseConfig,
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!
    })
  ],
  callbacks: {
    ...baseConfig.callbacks,
    async signIn({ user, account }: any) {
      if (account && user) {
        return true
      } else {
        const { routingConfig } = await import('./config/routing')
        return routingConfig.defaults.redirects.signInPagePath
      }
    },
    async jwt({ token, user, account, trigger }: any) {
      if (account && user) {
        const { handleInitialSignIn } = await import('./lib/auth/handle-initial-signin')
        return handleInitialSignIn(token, user, account)
      }

      if (Date.now() > token.accessTokenExpires || trigger === 'update') {
        const { refreshAccessToken } = await import('./lib/auth/refresh-access-token')
        return refreshAccessToken(token)
      }

      if (token.accessToken) {
        const { verifySessionActivity } = await import('./lib/auth/verify-session')
        const isActive = await verifySessionActivity(token.accessToken)
        if (!isActive) {
          return { ...token, error: 'TokenInvalidError' }
        }
      }

      return token
    }
  }
}

// Escolhe a configuração baseada na disponibilidade do Keycloak
const authConfig = isKeycloakConfigured() ? keycloakConfig : mockAuthConfig

if (!isKeycloakConfigured()) {
  console.log('🔐 Usando autenticação mock - Keycloak não configurado')
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
