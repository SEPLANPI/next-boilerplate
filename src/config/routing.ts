import { RoutingConfiguration } from '@/types/routing'

export const routingConfig: RoutingConfiguration = {
  defaults: {
    isPublic: false,
    requiredRoles: [],
    redirects: {
      postAuthRedirectPath: '/api/auth/role-redirect',
      signInPagePath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/acesso-negado',
      accessDeniedPageByRequiredRole: {}
    }
  },
  routes: [
    {
      path: '/acesso-negado',
      isPublic: true,
    }, {
      path: '/sessao-expirada',
      isPublic: true,
    }
  ]
}
