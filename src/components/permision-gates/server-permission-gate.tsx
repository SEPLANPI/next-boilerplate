import 'server-only'
import { ReactNode } from 'react'
import { Role } from '@/types/roles'
import { auth } from '@/auth'

interface ServerPermissionGateProps {
  children: ReactNode
  allowedRoles: Role[]
}

export async function ServerPermissionGate({
  children,
  allowedRoles
}: ServerPermissionGateProps) {
  const session = await auth()
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
