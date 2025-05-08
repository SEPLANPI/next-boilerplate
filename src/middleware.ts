import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { determineRouteAccess } from '@/lib/routes/matcher'
import { routingConfig } from './config/routing'

export default auth((req) => {
  const path = req.nextUrl.pathname

  const routeAccess = determineRouteAccess(path, req?.auth?.user?.roles || [])

  if (routeAccess.isPublic) {
    return NextResponse.next()
  }

  if (req.auth?.error) {
    const sessionExpiredUrl = new URL('/sessao-expirada', req.nextUrl.origin)
    sessionExpiredUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(sessionExpiredUrl)
  }

  if (!req.auth) {
    const loginPath = routingConfig.defaults.redirects.loginPagePath
    const newUrl = new URL(loginPath, req.nextUrl.origin)
    newUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(newUrl)
  }

  if (!routeAccess.hasPermission) {
    const newUrl = new URL(routeAccess.accessDeniedPath!, req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp)).*)'
  ]
}
