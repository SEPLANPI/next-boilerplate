import { signIn } from '@/auth'
import { mockUsers } from '@/lib/auth/mock-auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirectTo')

  // Verifica se estamos usando autenticação mock
  try {
    const { env } = await import('@/config/env')
    // Se chegou aqui, tem configuração real do Keycloak
    return signIn('keycloak', {
      redirectTo: redirectTo || '/'
    })
  } catch (error) {
    // Usando mock auth - redireciona para página de login customizada
    const loginUrl = new URL('/login', request.url)
    if (redirectTo) {
      loginUrl.searchParams.set('redirectTo', redirectTo)
    }
    return Response.redirect(loginUrl)
  }
}
