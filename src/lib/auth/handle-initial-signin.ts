import { JWT } from "next-auth/jwt"
import { getUserInfo } from "./get-user-info"
import { KeycloakAccessTokenPayload } from "./types"
import jwt from "jsonwebtoken"
import { User, Account } from "next-auth"
import { calculateExpiryTime } from "../utils"
import { env } from "@/config/env"

export async function handleInitialSignIn(token: JWT, user: User, account: Account) {
  const userInfo = await getUserInfo(account.access_token)
  const accessTokenContent = jwt.decode(
    account.access_token
  ) as KeycloakAccessTokenPayload

  if (!userInfo) {
    return {
      ...token,
      error: 'UserInfoError'
    }
  }
  token.idToken = account.id_token
  token.accessToken = account.access_token
  token.refreshToken = account.refresh_token
  token.accessTokenExpired = calculateExpiryTime(account.expires_in)
  token.refreshTokenExpired = calculateExpiryTime(account.refresh_expires_in)

  token.user = {
    ...user,
    cpf: userInfo?.preferred_username,
    roles: accessTokenContent?.resource_access?.[env.AUTH_KEYCLOAK_ID]?.roles || []
  }


  return token
}