'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { Role } from '@/types/roles'

interface ClientPermissionGateProps {
  children: ReactNode
  allowedRoles: Role[]
}

export function ClientPermissionGate({
  children,
  allowedRoles
}: ClientPermissionGateProps) {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) {
    return null
  }

  const hasPermission = user.roles.some((role) => allowedRoles.includes(role))

  if (!hasPermission) {
    return null
  }

  return <>{children}</>
}
