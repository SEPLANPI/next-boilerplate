import { getToken } from '@auth/core/jwt'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: false
  })

  if (!token) {
    return new Response('No Token', {
      status: 400
    })
  }
  const {
    AUTH_KEYCLOAK_ISSUER,
    AUTH_KEYCLOAK_ID,
    NEXT_PUBLIC_APP_URL: APP_URL
  } = process.env

  const url = `${AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
  const params = new URLSearchParams({
    client_id: AUTH_KEYCLOAK_ID as string,
    id_token_hint: token.idToken as string,
    post_logout_redirect_uri: `${APP_URL}/api/auth/callback-sign-out`
  })

  const keycloakLogoutUrl = `${url}?${params}`

  redirect(keycloakLogoutUrl)
}
