import { RoutingConfiguration } from '@/types/routing'

export const routingConfig: RoutingConfiguration = {
  defaults: {
    protection: 'protected',
    permissions: [],
    redirectPath: '/admin/acessos/cadastros',
    unauthorized: {
      defaultUnauthenticatedPath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/acesso-negado'
    }
  },

  routes: [
    {
      path: '/acesso-negado',
      type: 'public'
    },
    {
      path: '/conselheiros/cadastro/*',
      type: 'public'
    },
    {
      path: '/conselheiros/cadastro/:id/token',
      type: 'protected'
    }
  ]
}
