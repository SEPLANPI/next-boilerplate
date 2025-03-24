export interface KeycloakAccessTokenPayload {
  resource_access?: {
    [key: string]: {
      roles?: string[]
    }
  }
}

export interface UserInfo {
  preferred_username: string
  dataNascimento: string
  nomeCompleto: string
  name: string
  email: string
}

export interface TokenRefreshRequest {
  client_id: string
  client_secret: string
  grant_type: 'refresh_token'
  refresh_token: string
}

export interface TokenRefreshResponse {
  access_token: string
  refresh_token: string
  id_token: string
  expires_in: number
  refresh_expires_in: number
}
