import { AdapterUser } from '@auth/core/adapters'
import BaseUser from './auth'

declare module 'next-auth' {
  interface Session {
    user: BaseUser & AdapterUser
    accessToken: string
    refreshToken: string
    error: string
  }

  interface User extends BaseUser {}

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
