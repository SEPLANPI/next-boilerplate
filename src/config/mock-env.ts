import * as z from 'zod'
import { ClientEnvSchema, clientEnvVars } from './client-env'

// Schema para ambiente mock
const MockServerEnvSchema = ClientEnvSchema.extend({
  SERVER_API_URL: z.string().url().default('http://localhost:3000/api'),
  AUTH_SECRET: z.string().default('mock-secret-key-for-development'),
  AUTH_SECURE_COOKIE: z.boolean().default(false),
  USE_MOCK_AUTH: z.boolean().default(true)
})

// Variáveis de ambiente mock
const mockServerEnvVars = {
  ...clientEnvVars,
  SERVER_API_URL: process.env.SERVER_API_URL || 'http://localhost:3000/api',
  AUTH_SECRET: process.env.AUTH_SECRET || 'mock-secret-key-for-development',
  AUTH_SECURE_COOKIE: Boolean(process.env.AUTH_SECURE_COOKIE),
  USE_MOCK_AUTH: process.env.USE_MOCK_AUTH !== 'false' // Default true
}

const createMockEnv = () => {
  const parsedEnv = MockServerEnvSchema.safeParse(mockServerEnvVars)

  if (!parsedEnv.success) {
    throw new Error(
      `Configuração de ambiente mock inválida.
As seguintes variáveis estão ausentes ou inválidas:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([key, errors]) => `- ${key}: ${errors.join(', ')}`)
  .join('\n')}`
    )
  }

  return parsedEnv.data
}

export const mockEnv = createMockEnv()
