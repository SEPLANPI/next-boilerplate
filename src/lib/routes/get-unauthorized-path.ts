import { routingConfig } from '@/config/routing'

export function getUnauthorizedPath(route: string) {
  const routeSpecificPaths =
    routingConfig.defaults.unauthorized.routeSpecificPaths || {}
  const matchedRoute = Object.keys(routeSpecificPaths).find((path) =>
    route.startsWith(path.replace('*', ''))
  )

  return matchedRoute
    ? routeSpecificPaths[matchedRoute]
    : routingConfig.defaults.unauthorized.defaultUnauthenticatedPath
}
