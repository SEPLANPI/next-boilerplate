import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import { env } from "./config/env"
import { routingConfig } from "./config/routing"
import { handleInitialSignIn } from "./lib/auth/handle-initial-signin"
import { refreshAccessToken } from "./lib/auth/refresh-access-token"
import { precisaVerificarSessao } from "./lib/auth/sessao"
import { verifySessionActivity } from "./lib/auth/verify-session"
import { logger } from "./lib/logger"
import { fetchWithRetry } from "./lib/retry"

const keycloakProvider = KeycloakProvider({
  clientId: env.AUTH_KEYCLOAK_ID,
  clientSecret: env.AUTH_KEYCLOAK_SECRET,
  issuer: env.AUTH_KEYCLOAK_ISSUER,
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
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user
        session.error = token.error
        session.accessToken = token.accessToken
        // O navegador reaproveita o token até perto daqui (ver
        // `criarCacheDeToken`) em vez de buscar a sessão a cada chamada.
        session.accessTokenExpires = token.accessTokenExpires
      }
      return session
    },
    jwt: async ({ token, user, account, trigger }) => {
      if (account && user) {
        const inicial = await handleInitialSignIn(token, user, account)
        return { ...inicial, sessaoVerificadaEm: Date.now() }
      }

      if (Date.now() > token.accessTokenExpires || trigger === "update") {
        // Renovar com o refresh token só funciona com a sessão ativa no
        // Keycloak: vale como verificação.
        const renovado = await refreshAccessToken(token)
        return renovado.error
          ? renovado
          : { ...renovado, sessaoVerificadaEm: Date.now() }
      }

      // Este callback roda a cada auth()/getSession() — várias vezes por
      // tela. A sessão no Keycloak é conferida no máximo a cada
      // INTERVALO_VERIFICACAO_SESSAO_MS, não em toda chamada.
      if (token.accessToken && precisaVerificarSessao(token)) {
        const isActive = await verifySessionActivity(token.accessToken)
        if (!isActive) {
          return { ...token, error: "TokenInvalidError" }
        }
        return { ...token, sessaoVerificadaEm: Date.now() }
      }

      return token
    },
    authorized: async ({ auth }) => {
      return !!auth && !auth.error
    },
  },
  events: {
    signOut: async (message) => {
      if (!("token" in message && message.token)) {
        return
      }

      try {
        const url = `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`

        await fetchWithRetry(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: env.AUTH_KEYCLOAK_ID,
            client_secret: env.AUTH_KEYCLOAK_SECRET,
            refresh_token: message.token.refreshToken as string,
          }).toString(),
        })
      } catch (error) {
        logger.error("Erro ao realizar logout no Keycloak:", {
          name: (error as Error).name,
          message: (error as Error).message,
          stack: (error as Error).stack,
        })
      }
    },
  },
  pages: {
    signIn: "/api/auth/sign-in",
    error: "/erro-autenticacao",
  },
})
