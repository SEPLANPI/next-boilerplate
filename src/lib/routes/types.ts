export type RouteType = 'public' | 'protected'

export interface PublicRouteConfig {
  path: string
  type: 'public'
  exceptions?: {
    protected: string[]
  }
}

export interface ProtectedRouteConfig {
  path: string
  type: 'protected'

  exceptions?: {
    public: string[]
  }
}

export type RouteConfig = PublicRouteConfig | ProtectedRouteConfig

export interface UnauthorizedRoutingConfig {
  defaultUnauthorizedPath: string
  routeSpecificPaths?: {
    [protectedRoutePath: string]: string
  }
}

export interface RouteMatchOptions {
  exact: boolean
  matchSubroutes: boolean
}
