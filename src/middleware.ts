import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { determineRouteAccess } from '@/lib/routes/matcher'
import { getUnauthorizedPath } from '@/lib/routes/get-unauthorized-path'
import { routingConfig } from './config/routing'

export default auth((req) => {
  const path = req.nextUrl.pathname

  if (req.auth?.error) {
    const signOutUrl = new URL('/api/auth/sign-out', req.nextUrl.origin)
    return NextResponse.redirect(signOutUrl)
  }

  const routeAccess = determineRouteAccess(path, req?.auth?.user?.roles || [])

  if (routeAccess.type === 'public') {
    return NextResponse.next()
  }

  if (!req.auth) {
    const unauthorizedPath = getUnauthorizedPath(path)
    const newUrl = new URL(unauthorizedPath, req.nextUrl.origin)
    newUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(newUrl)
  }

  if (!routeAccess.hasPermission) {
    const accessDeniedPath =
      routeAccess.accessDeniedPath ||
      routingConfig.defaults.unauthorized.defaultAccessDeniedPath

    const newUrl = new URL(accessDeniedPath, req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp)).*)'
  ]
}
