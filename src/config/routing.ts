import { RoutingConfiguration } from '@/types/routing'

export const routingConfig: RoutingConfiguration = {
  defaults: {
    protection: 'protected',
    permissions: [],
    unauthorized: {
      defaultUnauthenticatedPath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/acesso-negado'
    }
  },

  routes: [
    {
      path: '/acesso-negado',
      type: 'public'
    }
  ]
}
