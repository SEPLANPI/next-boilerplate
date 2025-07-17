import { Role } from './roles'

export interface RouteConfig {
  // Path pattern - can use /* for wildcard matching
  path: string

  // Default is inherited from global defaults
  isPublic?: boolean

  // Roles that can access this route
  authorizedRoles?: Role[]

  // Whether to inherit roles from parent routes
  inheritRoles?: boolean

  // Specific sub-routes that override the parent route's settings
  // These take precedence over wildcard matches
  overrides?: RouteConfig[]
}

export interface AuthRedirectConfig {
  // Path to redirect when user is not logged in
  signInPagePath: string

  // Path to redirect to after successful authentication
  postAuthRedirectPath: string

  // Default access denied page
  defaultAccessDeniedPath: string

  // Role-specific access denied pages by allowed role
  accessDeniedPageByAllowedRole: {
    [role in Role]?: string
  }
}

export interface RoutingConfiguration {
  defaults: {
    isPublic: boolean
    authorizedRoles: Role[]
    redirects: AuthRedirectConfig
  }
  routes: RouteConfig[]
}
