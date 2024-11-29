import { JWT } from "next-auth/jwt"
import { TokenRefreshRequest } from "./types"
import { env } from "@/config/env"
import { calculateExpiryTime } from "../utils"

function buildFormData(details: TokenRefreshRequest): string {
  return Object.entries(details)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value || '')
      return `${encodedKey}=${encodedValue}`
    })
    .join('&')
}


export async function refreshAccessToken(token: JWT) {
  try {
    if (Date.now() > token.refreshTokenExpired)
      return {
        ...token,
        error: 'RefreshTokenError'
      }

    const details = {
      client_id: env.AUTH_KEYCLOAK_ID,
      client_secret: env.AUTH_KEYCLOAK_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken
    } as const

    const formData = buildFormData(details)

    const url = `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formData
    })
    const refreshedTokens = await response.json()
    if (!response.ok) throw refreshedTokens
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpired: calculateExpiryTime(refreshedTokens.expires_in),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpired: calculateExpiryTime(refreshedTokens.refresh_expires_in),
      idToken: refreshedTokens.id_token
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}