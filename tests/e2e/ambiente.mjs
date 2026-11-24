// Ambiente dos testes de ponta a ponta. Nada aqui é segredo: são valores
// fictícios, usados só pelo servidor de teste e pelo Keycloak falso.

export const PORTA_APP = 3100
export const PORTA_KEYCLOAK = 8180

export const URL_APP = `http://localhost:${PORTA_APP}`
export const ISSUER = `http://127.0.0.1:${PORTA_KEYCLOAK}/realms/teste`

export const AMBIENTE = {
  NEXT_PUBLIC_APP_URL: URL_APP,
  NEXT_PUBLIC_CLIENT_API_URL: "http://127.0.0.1:9/api",
  SERVER_API_URL: "http://127.0.0.1:9/api",
  AUTH_URL: URL_APP,
  AUTH_TRUST_HOST: "true",
  AUTH_SECRET: "segredo-de-teste-e2e-nao-usar-em-producao",
  AUTH_KEYCLOAK_ID: "boilerplate-e2e",
  AUTH_KEYCLOAK_SECRET: "segredo-do-client-de-teste",
  AUTH_KEYCLOAK_ISSUER: ISSUER,
  NEXT_TELEMETRY_DISABLED: "1",
}
