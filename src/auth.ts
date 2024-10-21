import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

import type { JWT } from 'next-auth/jwt'

const refreshAccessToken = async (token: JWT) => {
  try {
    if (Date.now() > token.refreshTokenExpired) throw Error
    const details = {
      client_id: process.env.AUTH_KEYCLOAK_ID,
      client_secret: process.env.AUTH_KEYCLOAK_SECRET,
      grant_type: ['refresh_token'],
      refresh_token: token.refreshToken
    }
    const formBody: string[] = []

    Object.entries(details).forEach(
      ([key, value]: [string, string | undefined]) => {
        const encodedKey = encodeURIComponent(key)
        const encodedValue = encodeURIComponent(value || '')
        formBody.push(encodedKey + '=' + encodedValue)
      }
    )

    const formData = formBody.join('&')

    const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`

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
  clientId: process.env.AUTH_KEYCLOAK_ID,
  clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
  issuer: process.env.AUTH_KEYCLOAK_ISSUER,
  profile(profile) {
    return {
      email_verified: profile.email_verified,
      name: profile.name,
      preferred_username: profile.preferred_username,
      given_name: profile.given_name,
      family_name: profile.family_name,
      email: profile.email,
      org_name: profile.org_name,
      telephone: profile.telephone
    }
  }
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
      }
      return session
    },
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpired = Date.now() + (account.expires_in - 15) * 1000
        token.refreshTokenExpired =
          Date.now() + (account.refresh_expires_in - 15) * 1000

        token.user = user
        return token
      }

      if (Date.now() < token.accessTokenExpired) return token

      return refreshAccessToken(token)
    },
    authorized: async ({ auth }) => {
      return !!auth && !auth.error
    }
  }
})
