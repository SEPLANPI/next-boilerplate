import { env } from "@/config/env"
import { UserInfo } from "./types"
import { logger } from "../logger"

export async function getUserInfo(
  accessToken: string,
): Promise<UserInfo | null> {
  try {
    const response = await fetch(
      `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    if (response.ok) {
      return response.json()
    }
    return null
  } catch (error) {
    logger.error(error as Error, {
      message: "Falha ao buscar userinfo",
    })

    return null
  }
}
