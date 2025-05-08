import { Role } from './roles'
export interface RouteConfig {
  // Path pattern - can use /* for wildcard matching
  path: string

  // Default is inherited from global defaults
  isPublic?: boolean

  auth?: {
    // Roles that can access this route
    requiredRoles?: Role[]
    // Whether to inherit roles from parent routes
    inheritRoles?: boolean
  }

  // Specific sub-routes that override the parent route's settings
  // These take precedence over wildcard matches
  overrides?: RouteConfig[]
}
export interface AuthRedirectConfig {
  // Path to redirect when user is not logged in
  loginPagePath: string

  // Default access denied page
  defaultAccessDeniedPath: string

  // Role-specific access denied pages by required role
  accessDeniedPageByRequiredRole: {
    [role in Role]?: string
  }
}
export interface RoutingConfiguration {
  defaults: {
    isPublic: boolean
    requiredRoles: Role[]
    redirects: AuthRedirectConfig
  }
  routes: RouteConfig[]
}
