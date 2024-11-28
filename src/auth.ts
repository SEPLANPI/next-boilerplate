import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import jwt from 'jsonwebtoken'
import type { JWT } from 'next-auth/jwt'
import { env } from './config/env'

interface KeycloakAccessTokenPayload {
  resource_access?: {
    piaui365?: {
      roles?: string[]
    }
  }
}

interface UserInfo {
  preferred_username: string
}

const getUserInfo = async (accessToken: string): Promise<UserInfo | null> => {
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
      const userInfo = await response.json()
      return userInfo
    }
    return null
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    return null
  }
}

const refreshAccessToken = async (token: JWT) => {
  try {
    if (Date.now() > token.refreshTokenExpired) throw Error
    const details = {
      client_id: env.AUTH_KEYCLOAK_ID,
      client_secret: env.AUTH_KEYCLOAK_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken
    }
    const formBody: string[] = []

    Object.entries(details).forEach(([key, value]) => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value || '')
      formBody.push(encodedKey + '=' + encodedValue)
    })

    const formData = formBody.join('&')

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
      accessTokenExpired: Date.now() + (refreshedTokens.expires_in - 15) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
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

const keycloakProvider = KeycloakProvider({
  clientId: env.AUTH_KEYCLOAK_ID,
  clientSecret: env.AUTH_KEYCLOAK_SECRET,
  issuer: env.AUTH_KEYCLOAK_ISSUER
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [keycloakProvider],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account && user) {
        return true
      } else {
        return '/unauthorized'
      }
    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user
        session.error = token.error
        session.accessToken = token.accessToken
      }
      return session
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
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
        token.accessTokenExpired = Date.now() + (account.expires_in - 15) * 1000
        token.refreshTokenExpired =
          Date.now() + (account.refresh_expires_in - 15) * 1000

        token.user = {
          ...user,
          cpf: userInfo?.preferred_username,
          roles: accessTokenContent?.resource_access?.piaui365?.roles || []
        }

        return token
      }

      if (Date.now() < token.accessTokenExpired) return token

      return refreshAccessToken(token)
    },
    authorized: async ({ auth }) => {
      return !!auth && !auth.error
    }
  },
  pages: {
    signIn: '/api/auth/sign-in'
  }
})
