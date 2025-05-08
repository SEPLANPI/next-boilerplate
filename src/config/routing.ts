import { RoutingConfiguration } from '@/types/routing'

export const routingConfig: RoutingConfiguration = {
  defaults: {
    isPublic: true,
    requiredRoles: [],
    redirects: {
      loginPagePath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/acesso-negado',
      accessDeniedPageByRequiredRole: {}
    }
  },
  routes: [
    {
      path: '/:eventId/admin/*',
      isPublic: false,
      auth: {
        requiredRoles: ['admin']
      },
      overrides: [
        {
          path: '/:eventId/admin/acesso-negado',
          isPublic: true
        }
      ]
    },
    {
      path: '/conselheiros/*',
      isPublic: false,
      auth: {
        requiredRoles: ['advisor']
      },
      overrides: [
        {
          path: '/conselheiros/acesso-negado',
          isPublic: true
        },
        {
          path: '/conselheiros/cadastro/*'
        }
      ]
    }
  ]
}
