import { Divider } from '@mantine/core'
import { items } from './data'
import { SidebarItem } from './sidebar-item'

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-gray-50 p-4">
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-lg font-semibold">
          GOV<span className="font-bold text-green-900">PI</span>
        </span>
        <Divider orientation="vertical" />
        <span className="font-medium">Aplicação</span>
      </div>
      <nav>
        {items.map((section) => (
          <section className="mb-4" key={section.title}>
            <span className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">
              {section.title}
            </span>
            {section.items.map((item) => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </section>
        ))}
      </nav>
    </aside>
  )
}
