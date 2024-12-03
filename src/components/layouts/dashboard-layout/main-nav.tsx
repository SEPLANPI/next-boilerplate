import { Divider } from '@mantine/core'
import { NavItem } from './nav-item'
import { sidebarConfig } from '@/config/sidebar'

export function MainNav() {
  return (
    <aside className="h-full w-full border-r bg-gray-50 p-4">
      <div className="mb-4 flex items-center space-x-2">
        <span className="font-montserrat text-xl font-semibold">
          GOV<span className="font-extrabold text-green-900">PI</span>
        </span>
        <Divider orientation="vertical" />
        <span className="font-medium">Piauí 365</span>
      </div>
      <nav>
        {sidebarConfig.map((section) => (
          <section className="mb-4" key={section.title}>
            <span className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">
              {section.title}
            </span>
            {section.items.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </section>
        ))}
      </nav>
    </aside>
  )
}
