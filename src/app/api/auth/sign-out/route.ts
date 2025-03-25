import { signOut } from '@/auth'
import { env } from '@/config/env'
import { getToken } from '@auth/core/jwt'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams
  const redirectTo = searchParams.get('redirect')

  console.log('NODE_ENV: ', process.env.NODE_ENV)

  const token = await getToken({
    req,
    secret: env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production'
  })

  console.log('Token:', token)

  if (!token?.idToken) {
    console.log('idToken nao encontrado')
    return await signOut({ redirectTo: redirectTo || '' })
  }

  const url = `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
  const params = new URLSearchParams({
    client_id: env.AUTH_KEYCLOAK_ID,
    id_token_hint: token.idToken as string,
    post_logout_redirect_uri: `${env.APP_URL}/api/auth/callback-sign-out${redirectTo ? `?redirect=${redirectTo}` : ''}`
  })

  const keycloakLogoutUrl = `${url}?${params}`

  redirect(keycloakLogoutUrl)
}
