import { JWT } from 'next-auth/jwt'
import { getUserInfo } from './get-user-info'
import jwt from 'jsonwebtoken'
import { KeycloakAccessTokenPayload } from './types'
import { env } from '@/config/env'
import { calculateExpiryTime } from '../utils'

export interface TokenData {
  accessToken: string
  refreshToken?: string
  idToken?: string
  expiresIn: number
  refreshExpiresIn?: number
}

export async function enrichTokenWithUserData(token: JWT, accessToken: string) {
  const userInfo = await getUserInfo(accessToken)
  const accessTokenContent = jwt.decode(
    accessToken
  ) as KeycloakAccessTokenPayload

  if (!userInfo) {
    return {
      ...token,
      error: 'UserInfoError'
    }
  }

  return {
    ...token,
    user: {
      ...token.user,
      cpf: userInfo?.preferred_username,
      birthDate: userInfo.dataNascimento,
      name: userInfo.name,
      fullName: userInfo.nomeCompleto,
      email: userInfo.email,
      roles:
        accessTokenContent?.resource_access?.[env.AUTH_KEYCLOAK_ID]?.roles || []
    }
  }
}

export function updateTokens(token: JWT, tokenData: TokenData): JWT {
  return {
    ...token,
    accessToken: tokenData.accessToken,
    accessTokenExpires: calculateExpiryTime(tokenData.expiresIn),
    ...(tokenData.refreshToken && {
      refreshToken: tokenData.refreshToken
    }),
    ...(tokenData.refreshExpiresIn && {
      refreshTokenExpires: calculateExpiryTime(tokenData.refreshExpiresIn)
    }),
    ...(tokenData.idToken && {
      idToken: tokenData.idToken
    })
  }
}
