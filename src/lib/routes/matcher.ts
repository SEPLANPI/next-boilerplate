import { routingConfig } from "@/config/routing"
import { Role } from "@/types/roles"

function routeToRegexPattern(route: string): string {
  let pattern = route.replace(/[.+?^${}()|[\]\\]/g, "\\$&")

  if (pattern.endsWith("/*")) {
    pattern = pattern.replace(/\/\*$/, "")
    pattern = `^${pattern}(?:/.*)?$`
  } else {
    pattern = `^${pattern}$`
  }

  pattern = pattern.replace(/:(\w+)/g, "([^/]+)")

  return pattern
}

export function matchRoute(path: string, routes: string[]): boolean {
  const normalizedPath = path === "/" ? path : path.replace(/\/$/, "")

  return routes.some((route) => {
    const normalizedRoute = route === "/" ? route : route.replace(/\/$/, "")

    const regexPattern = routeToRegexPattern(normalizedRoute)
    const regex = new RegExp(regexPattern)

    return regex.test(normalizedPath)
  })
}

export function checkPermissions(
  userRoles: Role[] = [],
  routeAuthorizedRoles?: Role[],
  defaultRoles: Role[] = [],
): boolean {
  const authorizedRoles = routeAuthorizedRoles ?? defaultRoles

  if (authorizedRoles.length === 0) {
    return true
  }

  return userRoles.some((role) => authorizedRoles.includes(role))
}

export function determineRouteAccess(
  path: string,
  userRoles: Role[] = [],
): {
  isPublic: boolean
  hasPermission: boolean
  accessDeniedPath?: string
} {
  let matchedConfig = routingConfig.routes.find((route) =>
    matchRoute(path, [route.path]),
  )

  if (matchedConfig?.overrides) {
    const override = matchedConfig.overrides.find((override) =>
      matchRoute(path, [override.path]),
    )
    if (override) {
      matchedConfig = override
    }
  }

  const isPublic = matchedConfig?.isPublic ?? routingConfig.defaults.isPublic
  const authorizedRoles =
    matchedConfig?.authorizedRoles ?? routingConfig.defaults.authorizedRoles

  const hasPermission = checkPermissions(userRoles, authorizedRoles)

  let accessDeniedPath =
    routingConfig.defaults.redirects.defaultAccessDeniedPath
  if (!hasPermission && authorizedRoles.length > 0) {
    const roleSpecificPath = authorizedRoles
      .map(
        (role) =>
          routingConfig.defaults.redirects.accessDeniedPageByAllowedRole[role],
      )
      .find((path) => path !== undefined)
    if (roleSpecificPath) {
      accessDeniedPath = roleSpecificPath
    }
  }

  return {
    isPublic,
    hasPermission,
    accessDeniedPath,
  }
}
