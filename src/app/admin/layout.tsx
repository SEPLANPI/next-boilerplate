import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { sidebarConfig } from '@/config/sidebar'

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout config={sidebarConfig}>{children}</DashboardLayout>
}
