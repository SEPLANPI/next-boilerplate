import { AdapterUser } from '@auth/core/adapters'

declare module 'next-auth' {
  interface Session {
    user: {
      emailVerified: Date | null
      name: string
      email: string
      id: string
    } & AdapterUser
    accessToken: string
    refreshToken: string
    error: string
  }

  interface User {
    emailVerified: Date | null
    name: string
    email: string
    id: string
  }

  interface Account {
    provider: 'keycloak'
    type: 'oidc'
    id: string
    access_token: string
    expires_in: number
    refresh_expires_in: number
    refresh_token: string
    token_type: string
    id_token: string
    'not-before-policy': number
    session_state: string
    scope: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string
    email: string
    sub: string
    accessToken: string
    refreshToken: string

    idToken: string
    accessTokenExpired: number
    refreshTokenExpired: number
    user: User

    error: string
  }
}

