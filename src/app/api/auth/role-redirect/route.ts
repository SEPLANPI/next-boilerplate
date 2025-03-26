import { NextRequest, NextResponse } from 'next/server'
import { BaseUser } from '@/types/auth'
import { auth } from '@/auth'
import { env } from '@/config/env'
import { routingConfig } from '@/config/routing'

export async function GET(request: NextRequest) {
  const session = await auth()
  const user = session?.user as BaseUser | undefined

  if (!user) {
    return NextResponse.redirect(
      new URL(
        `${env.APP_URL}/api/auth/sign-in?callbackUrl=/api/auth/role-redirect`,
        request.url
      )
    )
  }

  if (user.roles.includes('admin')) {
    return NextResponse.redirect(
      new URL(`${env.APP_URL}/admin/acessos/cadastros`, request.url)
    )
  }

  if (user.roles.includes('advisor')) {
    return NextResponse.redirect(
      new URL(`${env.APP_URL}/conselheiros/dados`, request.url)
    )
  }

  return NextResponse.redirect(
    new URL(
      `${env.APP_URL}${routingConfig.defaults.redirects.defaultAccessDeniedPath}`,
      request.url
    )
  )
}
