'use client'

import { ActionIcon, Divider } from '@mantine/core'
import { NavItem } from './nav-item'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { UserMenu } from './user-menu'
import { useSidebar } from '@/contexts/sidebar-context'
import { MainNavProps } from '@/types/sidebar'
import Image from 'next/image'

export function MainNav({ config }: MainNavProps) {
  const { collapsed, toggleCollapsed } = useSidebar()
  const defaultLogo = (
    <span className="text-xl font-extrabold text-green-900">PI</span>
  )

  return (
    <aside
      className={`flex h-full flex-col overflow-hidden border-r-2 bg-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div
        className={`mb-2 h-12 border-b-2 ${collapsed ? 'flex flex-col items-center justify-center gap-2' : 'flex items-center justify-between px-4'}`}
      >
        <div
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2'} `}
        >
          {collapsed ? (
            <Image
              src={'/logo/icon/verde-verde.png'}
              alt={config.app.name}
              width={120}
              height={120}
              className="size-10"
              quality={100}
            />
          ) : (
            <Image
              src={'/logo/horizontal/verde-verde.png'}
              alt={config.app.name}
              width={205}
              height={56}
              className="h-7 w-auto"
              quality={100}
            />
          )}
        </div>
        {!collapsed && (
          <ActionIcon
            onClick={() => toggleCollapsed()}
            variant="ghost"
            size="lg"
          >
            <PanelLeftClose className="size-4" />
          </ActionIcon>
        )}
      </div>
      {collapsed && (
        <ActionIcon
          onClick={() => toggleCollapsed()}
          variant="ghost"
          size="lg"
          className="mx-auto mb-2"
        >
          <PanelLeftOpen className="size-4" />
        </ActionIcon>
      )}
      <nav className="flex-1 space-y-2 overflow-y-auto overflow-x-clip px-4">
        {config.sections.map((section, index) => (
          <section className="flex flex-col" key={section.title || index}>
            {section.title &&
              (collapsed ? (
                <Divider className="mb-2" />
              ) : (
                <span className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">
                  {section.title}
                </span>
              ))}
            <div
              className={`flex flex-col space-y-0.5 ${collapsed ? 'items-center' : ''}`}
            >
              {section.items.map((item) => (
                <NavItem key={item.label} item={item} collapsed={collapsed} />
              ))}
            </div>
          </section>
        ))}
      </nav>
      <div className="border-t p-2">
        <UserMenu />
      </div>
    </aside>
  )
}
