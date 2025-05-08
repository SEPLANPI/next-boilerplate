import { JWT } from 'next-auth/jwt'
import { User, Account } from 'next-auth'
import { logger } from '@/lib/logger'
import { enrichTokenWithUserData, updateTokens } from './token-handlers'

export async function handleInitialSignIn(
  token: JWT,
  user: User,
  account: Account
) {
  try {
    const updatedToken = await enrichTokenWithUserData(
      token,
      account.access_token
    )

    return updateTokens(updatedToken, {
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      idToken: account.id_token,
      expiresIn: account.expires_in,
      refreshExpiresIn: account.refresh_expires_in
    })
  } catch (error) {
    logger.error('Erro durante o login inicial', {
      userId: user.id,
      email: user.email,
      error
    })
    throw error
  }
}
