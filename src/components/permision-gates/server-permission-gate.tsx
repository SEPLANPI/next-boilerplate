import 'server-only'
import { ReactNode } from 'react'
import { Role } from '@/types/roles'
import { auth } from '@/auth'

interface ServerPermissionGateProps {
  children: ReactNode
  authorizedRoles?: Role[]
}

export async function ServerPermissionGate({
  children,
  authorizedRoles
}: ServerPermissionGateProps) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return null
  }

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
