import { RoutingConfiguration } from '@/types/routing'

export const routingConfig: RoutingConfiguration = {
  defaults: {
    protection: 'protected',
    permissions: ['admin-piaui365'],
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
