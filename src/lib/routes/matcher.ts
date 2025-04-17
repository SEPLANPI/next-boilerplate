import { routingConfig } from '@/config/routing'
import { Role } from '@/types/roles'
import { RouteConfig } from '@/types/routing'

function routeToRegexPattern(route: string): string {
  let pattern = route.replace(/[.+?^${}()|[\]\\]/g, '\\$&')

  if (pattern.endsWith('/*')) {
    pattern = pattern.replace(/\/\*$/, '')
    pattern = `^${pattern}(?:/.*)?$`
  } else {
    pattern = `^${pattern}$`
  }

  pattern = pattern.replace(/:(\w+)/g, '([^/]+)')

  return pattern
}

export function matchRoute(path: string, routes: string[]): boolean {
  const normalizedPath = path === '/' ? path : path.replace(/\/$/, '')

  return routes.some((route) => {
    const normalizedRoute = route === '/' ? route : route.replace(/\/$/, '')

    const regexPattern = routeToRegexPattern(normalizedRoute)
    const regex = new RegExp(regexPattern)

    return regex.test(normalizedPath)
  })
}

export function checkPermissions(
  userRoles: Role[] = [],
  routeAuth?: RouteConfig['auth'],
  defaultRoles: Role[] = []
): boolean {
  const requiredRoles = routeAuth?.requiredRoles ?? defaultRoles

  if (requiredRoles.length === 0) {
    return true
  }

  return requiredRoles.every((role) => userRoles.includes(role))
}

export function determineRouteAccess(
  path: string,
  userRoles: Role[] = []
): {
  isPublic: boolean
  hasPermission: boolean
  accessDeniedPath?: string
} {
  let matchedConfig = routingConfig.routes.find((route) =>
    matchRoute(path, [route.path])
  )

  // Check for overrides
  if (matchedConfig?.overrides) {
    const override = matchedConfig.overrides.find((override) =>
      matchRoute(path, [override.path])
    )
    if (override) {
      matchedConfig = override
    }
  }

  if (!matchedConfig) {
    return {
      isPublic: routingConfig.defaults.isPublic,
      hasPermission: true
    }
  }

  const isPublic = matchedConfig.isPublic ?? routingConfig.defaults.isPublic
  const requiredRoles =
    matchedConfig.auth?.requiredRoles ?? routingConfig.defaults.requiredRoles

  const hasPermission = requiredRoles.every((role) => userRoles.includes(role))

  let accessDeniedPath =
    routingConfig.defaults.redirects.defaultAccessDeniedPath
  if (!hasPermission && requiredRoles.length > 0) {
    const roleSpecificPath = requiredRoles
      .map(
        (role) =>
          routingConfig.defaults.redirects.accessDeniedPageByRequiredRole[role]
      )
      .find((path) => path !== undefined)
    if (roleSpecificPath) {
      accessDeniedPath = roleSpecificPath
    }
  }

  return {
    isPublic,
    hasPermission,
    accessDeniedPath
  }
}
