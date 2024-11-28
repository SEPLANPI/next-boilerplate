import { RoutingConfiguration } from '@/types/routing'

export const routingConfig: RoutingConfiguration = {
  defaults: {
    protection: 'protected',
    permissions: ['admin'],
    unauthorized: {
      defaultUnauthenticatedPath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/access-denied'
    }
  },

  routes: [
    {
      path: '/access-denied',
      type: 'public'
    }
  ]
}
