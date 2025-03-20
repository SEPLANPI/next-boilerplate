import { JWT } from 'next-auth/jwt'
import { getUserInfo } from './get-user-info'
import { KeycloakAccessTokenPayload } from './types'
import jwt from 'jsonwebtoken'
import { User, Account } from 'next-auth'
import { calculateExpiryTime } from '../utils'
import { env } from '@/config/env'
import { logger } from '@/lib/logger'

export async function handleInitialSignIn(
  token: JWT,
  user: User,
  account: Account
) {
  try {
    const userInfo = await getUserInfo(account.access_token)
    const accessTokenContent = jwt.decode(
      account.access_token
    ) as KeycloakAccessTokenPayload

    if (!userInfo) {
      logger.error('Falha ao obter userinfo', {
        userId: user.id,
        email: user.email
      })
      return {
        ...token,
        error: 'UserInfoError'
      }
    }
    return {
      ...token,
      idToken: account.id_token,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      accessTokenExpires: calculateExpiryTime(account.expires_in),
      refreshTokenExpires: calculateExpiryTime(account.refresh_expires_in),
      user: {
        ...user,
        cpf: userInfo?.preferred_username,
        birthDate: userInfo.dataNascimento,
        fullName: userInfo.nomeCompleto,
        roles:
          accessTokenContent?.resource_access?.[env.AUTH_KEYCLOAK_ID]?.roles ||
          []
      }
    }
  } catch (error) {
    logger.error('Erro durante o login inicial', {
      userId: user.id,
      email: user.email,
      error
    })
    throw error
  }
}
