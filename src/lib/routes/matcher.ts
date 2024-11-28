import { routingConfig } from '@/config/routing'
import { Permission, RouteConfig } from '@/types/routing'

export function matchRoute(path: string, routes: string[]): boolean {
  return routes.some((route) => {
    const normalizedPath = path.replace(/\/$/, '')
    const normalizedRoute = route.replace(/\/$/, '')

    if (route.endsWith('/*')) {
      const baseRoute = normalizedRoute.replace('/*', '')
      return normalizedPath.startsWith(baseRoute)
    }

    return normalizedPath === normalizedRoute
  })
}

export function checkPermissions(
  userPermissions: Permission[] = [],
  routePermissions?: RouteConfig['permissions'],
  defaultPermissions: Permission[] = []
): boolean {
  const requiredPermissions = routePermissions?.required ?? defaultPermissions

  return requiredPermissions.every((perm) => userPermissions.includes(perm))
}

export function determineRouteAccess(
  path: string,
  userPermissions: Permission[] = []
): {
  type: 'public' | 'protected'
  hasPermission: boolean
  accessDeniedPath?: string
} {
  const matchedConfigs = routingConfig.routes.filter((config) =>
    matchRoute(path, [config.path])
  )

  if (matchedConfigs.length === 0) {
    return {
      type: routingConfig.defaults.protection,
      hasPermission: checkPermissions(
        userPermissions,
        undefined,
        routingConfig.defaults.permissions
      )
    }
  }

  const config = matchedConfigs[matchedConfigs.length - 1]

  if (config.exceptions) {
    if (config.type === 'protected' && config.exceptions.public) {
      if (matchRoute(path, config.exceptions.public)) {
        return {
          type: 'public',
          hasPermission: true
        }
      }
    }

    if (config.type === 'public' && config.exceptions.protected) {
      if (matchRoute(path, config.exceptions.protected)) {
        return {
          type: 'protected',
          hasPermission: checkPermissions(
            userPermissions,
            config.permissions,
            routingConfig.defaults.permissions
          ),
          accessDeniedPath: config.permissions?.accessDeniedPath
        }
      }
    }
  }

  return {
    type: config.type ?? routingConfig.defaults.protection,
    hasPermission: checkPermissions(
      userPermissions,
      config.permissions,
      routingConfig.defaults.permissions
    ),
    accessDeniedPath: config.permissions?.accessDeniedPath
  }
}
