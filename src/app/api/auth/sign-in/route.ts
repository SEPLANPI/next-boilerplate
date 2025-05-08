import { signIn } from '@/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirectTo')

  return signIn('keycloak', {
    redirectTo: redirectTo || '/'
  })
}
