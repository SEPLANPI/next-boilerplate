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

  if (!req.auth) {
    const loginPath = routingConfig.defaults.redirects.loginPagePath
    const newUrl = new URL(loginPath, req.nextUrl.origin)
    newUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(newUrl)
  }

  if (req.auth?.error) {
    const signOutUrl = new URL(
      '/api/auth/callback-sign-out',
      req.nextUrl.origin
    )
    signOutUrl.searchParams.set(
      'redirectTo',
      `/sessao-expirada?redirectTo=${path}`
    )
    return NextResponse.redirect(signOutUrl)
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
