import { AppShell } from '@/components/layouts/app-shell'
import { sidebarConfig } from '@/config/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell config={sidebarConfig}>{children}</AppShell>
}
