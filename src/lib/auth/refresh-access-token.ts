import { JWT } from 'next-auth/jwt'
import { env } from '@/config/env'
import { logger } from '@/lib/logger'
import { enrichTokenWithUserData, updateTokens } from './token-handlers'
import { fetchWithRetry } from '@/lib/retry'

export async function refreshAccessToken(token: JWT) {
  try {
    if (!token.refreshTokenExpires || Date.now() > token.refreshTokenExpires) {
      return {
        ...token,
        error: 'TokenExpiredError'
      }
    }

    const response = await fetchWithRetry(
      `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: env.AUTH_KEYCLOAK_ID,
          client_secret: env.AUTH_KEYCLOAK_SECRET,
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken
        }),
        method: 'POST'
      },
      {
        maxRetries: 3,
        delay: 300
      }
    )

    const refreshedTokens = await response.json()

    if (!response.ok) {
      logger.error('Falha ao atualizar o token', {
        userId: token.user?.id,
        status: response.status,
        error: refreshedTokens
      })
      return { ...token, error: 'RefreshAccessTokenError' }
    }

    const updatedToken = await enrichTokenWithUserData(
      token,
      refreshedTokens.access_token
    )

    return updateTokens(updatedToken, {
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token,
      idToken: refreshedTokens.id_token,
      expiresIn: refreshedTokens.expires_in,
      refreshExpiresIn: refreshedTokens.refresh_expires_in
    })
  } catch (error) {
    logger.error('Erro ao atualizar o token', {
      userId: token.user?.id,
      error
    })

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
