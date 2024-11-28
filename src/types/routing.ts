import { Role } from './roles'

export interface RouteConfig {
  path: string
  type?: 'public' | 'protected'
  permissions?: {
    required?: Role[]
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
    permissions: Role[]
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
