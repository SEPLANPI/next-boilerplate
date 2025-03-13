import { PropsWithChildren } from 'react'

export function DashboardContent({ children }: PropsWithChildren) {
  return <div className="p-5">{children}</div>
}
