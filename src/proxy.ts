import { auth } from "@/auth"
import { determineRouteAccess } from "@/lib/routes/matcher"
import { NextResponse } from "next/server"
import { routingConfig } from "./config/routing"

export const proxy = auth((req) => {
  const path = req.nextUrl.pathname

  const routeAccess = determineRouteAccess(path, req?.auth?.user?.roles || [])

  if (routeAccess.isPublic) {
    return NextResponse.next()
  }

  if (!req.auth || req.auth.error) {
    const signInPagePath = routingConfig.defaults.redirects.signInPagePath
    const newUrl = new URL(signInPagePath, req.nextUrl.origin)
    newUrl.searchParams.set("redirectTo", path)
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp)).*)",
  ],
}
