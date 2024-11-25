import { routeConfig } from './config'
import {
  ProtectedRouteConfig,
  PublicRouteConfig,
  RouteConfig,
  RouteType
} from './types'

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

export function determineRouteAccess(path: string): RouteType {
  const matchedConfigs = routeConfig.filter((config) =>
    matchRoute(path, [config.path])
  )

  if (matchedConfigs.length === 0) return 'protected'

  const config = matchedConfigs[matchedConfigs.length - 1]

  if ('exceptions' in config && config.exceptions) {
    if (config.type === 'protected' && config.exceptions.public) {
      if (matchRoute(path, config.exceptions.public)) {
        return 'public'
      }
    }

    if (config.type === 'public' && config.exceptions.protected) {
      if (matchRoute(path, config.exceptions.protected)) {
        return 'protected'
      }
    }
  }

  return config.type
}

export function isPublicRouteConfig(
  config: RouteConfig
): config is PublicRouteConfig {
  return config.type === 'public'
}

export function isProtectedRouteConfig(
  config: RouteConfig
): config is ProtectedRouteConfig {
  return config.type === 'protected'
}
