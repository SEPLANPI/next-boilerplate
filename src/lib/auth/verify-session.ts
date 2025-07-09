import { env } from '@/config/env'
import { logger } from '../logger'
import { TokenIntrospectionResponse } from './types'
import { fetchWithRetry } from '@/lib/retry'

export async function verifySessionActivity(
  accessToken: string
): Promise<boolean> {
  try {
    const response = await fetchWithRetry(
      `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token/introspect`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          token: accessToken,
          client_id: env.AUTH_KEYCLOAK_ID,
          client_secret: env.AUTH_KEYCLOAK_SECRET
        })
      },
      {
        maxRetries: 3,
        delay: 300
      }
    )

    const data = (await response.json()) as TokenIntrospectionResponse

    if (!response.ok) {
      logger.error('Erro na resposta do introspect', {
        status: response.status,
        error: data.error
      })
      return false
    }

    return data.active === true
  } catch (error) {
    logger.error('Erro ao verificar sessão', { error })
    return false
  }
}
