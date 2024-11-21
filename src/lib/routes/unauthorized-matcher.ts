import { unauthorizedConfig } from './config'
import { matchRoute } from './matcher'

export function getUnauthorizedPath(protectedPath: string): string {
  const { defaultUnauthorizedPath, routeSpecificPaths = {} } =
    unauthorizedConfig

  for (const [protectedRoute, unauthorizedPath] of Object.entries(
    routeSpecificPaths
  )) {
    if (matchRoute(protectedPath, [protectedRoute])) {
      return unauthorizedPath
    }
  }

  return defaultUnauthorizedPath
}
