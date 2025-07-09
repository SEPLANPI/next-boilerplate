<<<<<<< HEAD
import { z } from 'zod'

const createEnv = () => {
  const EnvSchema = z.object({
    APP_URL: z.string().url(),
    CLIENT_API_URL: z.string().url(),
    SERVER_API_URL: z.string().url(),
    AUTH_KEYCLOAK_ISSUER: z.string().url(),
    AUTH_KEYCLOAK_ID: z.string(),
    AUTH_KEYCLOAK_SECRET: z.string(),
    AUTH_SECRET: z.string()
  })

  const envVars = {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
    SERVER_API_URL: process.env.SERVER_API_URL,
    AUTH_KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER,
    AUTH_KEYCLOAK_SECRET: process.env.AUTH_KEYCLOAK_SECRET,
    AUTH_KEYCLOAK_ID: process.env.AUTH_KEYCLOAK_ID,
    AUTH_SECRET: process.env.AUTH_SECRET
  }

  const parsedEnv = EnvSchema.safeParse(envVars)
=======
import * as z from 'zod'
import { ClientEnvSchema, clientEnvVars } from './client-env'

const ServerEnvSchema = ClientEnvSchema.extend({
  SERVER_API_URL: z.string().url(),
  AUTH_KEYCLOAK_ISSUER: z.string().url(),
  AUTH_KEYCLOAK_ID: z.string(),
  AUTH_KEYCLOAK_SECRET: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_SECURE_COOKIE: z.boolean().default(false)
})

const serverEnvVars = {
  ...clientEnvVars,
  SERVER_API_URL: process.env.SERVER_API_URL,
  AUTH_KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER,
  AUTH_KEYCLOAK_SECRET: process.env.AUTH_KEYCLOAK_SECRET,
  AUTH_KEYCLOAK_ID: process.env.AUTH_KEYCLOAK_ID,
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_SECURE_COOKIE: Boolean(process.env.AUTH_SECURE_COOKIE)
}

const createEnv = () => {
  const parsedEnv = ServerEnvSchema.safeParse(serverEnvVars)
>>>>>>> dialogos/main

  if (!parsedEnv.success) {
    throw new Error(
      `Configuração de ambiente inválida.
As seguintes variáveis estão ausentes ou inválidas:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([key, errors]) => `- ${key}: ${errors.join(', ')}`)
  .join('\n')}`
    )
  }

  return parsedEnv.data
}

export const env = createEnv()
