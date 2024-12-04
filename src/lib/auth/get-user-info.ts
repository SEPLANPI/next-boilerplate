import { env } from '@/config/env'
import { UserInfo } from './types'

export async function getUserInfo(
  accessToken: string
): Promise<UserInfo | null> {
  try {
    const response = await fetch(
      `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    if (response.ok) {
      return response.json()
    }
    return null
  } catch (error) {
    console.error('Falha ao buscar userinfo: ', error)
    return null
  }
}
