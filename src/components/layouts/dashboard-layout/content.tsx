import { PropsWithChildren } from 'react'

export function DashboardContent({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 bg-gray-100 p-8 pb-0">
      <div className="flex-1 rounded-t-lg border-2 bg-white p-6">{children}</div>
    </div>
  )
}
