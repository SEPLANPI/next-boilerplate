import { signOut } from '@/auth'
import { env } from '@/config/env'
import { logger } from '@/lib/logger'
import { getToken } from '@auth/core/jwt'

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams
  const redirectTo = searchParams.get('redirectTo') || ''

  const token = await getToken({
    req,
    secret: env.AUTH_SECRET,
    secureCookie: env.AUTH_SECURE_COOKIE
  })

  if (!token?.idToken) {
    return await signOut({ redirectTo: redirectTo || '' })
  }

  try {
    const url = `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: env.AUTH_KEYCLOAK_ID,
        client_secret: env.AUTH_KEYCLOAK_SECRET,
        refresh_token: token.refreshToken as string
      }).toString()
    })
  } catch (error) {
    logger.error('Erro ao realizar logout no Keycloak:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack
    })
  }

  return await signOut({
    redirectTo: redirectTo || ''
  })
}
