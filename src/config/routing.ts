import { RoutingConfiguration } from "@/types/routing"

export const routingConfig: RoutingConfiguration = {
  defaults: {
    isPublic: true,
    authorizedRoles: [],
    redirects: {
      postAuthRedirectPath: "/",
      signInPagePath: "/api/auth/sign-in",
      defaultAccessDeniedPath: "/acesso-negado",
      accessDeniedPageByAllowedRole: {},
    },
  },
  routes: [
    {
      path: "/acesso-negado",
      isPublic: true,
    },
    {
      path: "/sessao-expirada",
      isPublic: true,
    },
    {
      path: "/erro",
      isPublic: true,
    },
    {
      path: "/erro-autenticacao",
      isPublic: true,
    },
    {
      path: '/about',
      isPublic: false,
      authorizedRoles: ["compromissos-admin", "compromissos-collaborator", "compromissos-manager"],
    },
  ],
}
