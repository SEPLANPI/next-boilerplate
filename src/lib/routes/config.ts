import { RouteConfig, UnauthorizedRoutingConfig } from './types'

export const routeConfig: RouteConfig[] = []

export const unauthorizedConfig: UnauthorizedRoutingConfig = {
  defaultUnauthorizedPath: '/api/auth/sign-in'
}
