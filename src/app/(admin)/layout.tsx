import { AppShell } from "@/components/layouts/app-shell"
import { sidebarConfig } from "@/config/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell config={sidebarConfig}>{children}</AppShell>
}
