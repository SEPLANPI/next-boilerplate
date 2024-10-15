import { DashboardLayout } from '@/components/layouts/dashboard-layout'

export default function Dashboard({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout>{children}</DashboardLayout>
}
