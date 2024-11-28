export type Permission = 'admin'

export interface RouteConfig {
  path: string
  type?: 'public' | 'protected'
  permissions?: {
    required?: Permission[]
    accessDeniedPath?: string
    inherit?: boolean
  }
  exceptions?: {
    public?: string[]
    protected?: string[]
  }
}

export interface RoutingConfiguration {
  defaults: {
    protection: 'public' | 'protected'
    permissions: Permission[]
    unauthorized: {
      defaultUnauthenticatedPath: string
      defaultAccessDeniedPath: string
      routeSpecificPaths?: {
        [routePath: string]: string
      }
    }
  }

  routes: RouteConfig[]
}
