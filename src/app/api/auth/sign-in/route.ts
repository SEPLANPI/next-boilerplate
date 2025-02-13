import { signIn } from '@/auth'
import { routingConfig } from '@/config/routing'

export async function GET() {
  return signIn('keycloak', {
    redirectTo: routingConfig.defaults.redirectPath || '/'
  })
}
