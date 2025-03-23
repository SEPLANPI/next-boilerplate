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
      path: '/admin/*',
      isPublic: false,
      auth: {
        requiredRoles: ['admin']
      },
      overrides: [
        {
          path: '/admin/acesso-negado',
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
        }
      ]
    }
  ]
}
