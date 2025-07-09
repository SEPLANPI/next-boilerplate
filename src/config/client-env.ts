import * as z from 'zod'

export const ClientEnvSchema = z.object({
  APP_URL: z.string().url(),
  CLIENT_API_URL: z.string().url()
})

export const clientEnvVars = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL
}

const createClientEnv = () => {
  const parsedEnv = ClientEnvSchema.safeParse(clientEnvVars)

  if (!parsedEnv.success) {
    throw new Error(
      `Configuração de ambiente cliente inválida.
As seguintes variáveis estão ausentes ou inválidas:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([key, errors]) => `- ${key}: ${errors.join(', ')}`)
  .join('\n')}`
    )
  }

  return parsedEnv.data
}

export const clientEnv = createClientEnv()
