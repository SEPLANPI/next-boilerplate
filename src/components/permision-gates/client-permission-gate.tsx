'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { Role } from '@/types/roles'

interface ClientPermissionGateProps {
  children: ReactNode
  authorizedRoles?: Role[]
}

export function ClientPermissionGate({
  children,
  authorizedRoles
}: ClientPermissionGateProps) {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) {
    return null
  }

  // If authorizedRoles is not provided, any authenticated user has permission.
  if (!authorizedRoles) {
    return <>{children}</>
  }

  const hasPermission = user.roles.some((role) =>
    authorizedRoles.includes(role)
  )

  if (!hasPermission) {
    return null
  }

  return <>{children}</>
}
