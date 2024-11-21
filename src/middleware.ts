import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { determineRouteAccess } from '@/lib/routes/matcher'
import { getUnauthorizedPath } from '@/lib/routes/unauthorized-matcher'

export default auth((req) => {
  const path = req.nextUrl.pathname
  const routeAccess = determineRouteAccess(path)

  if (routeAccess === 'public') {
    return NextResponse.next()
  }

  if (!req.auth) {
    const unauthorizedPath = getUnauthorizedPath(path)

    const newUrl = new URL(unauthorizedPath, req.nextUrl.origin)
    newUrl.searchParams.set('callbackUrl', path)

    return NextResponse.redirect(newUrl)
  }

  // Verificar permissões aqui

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
