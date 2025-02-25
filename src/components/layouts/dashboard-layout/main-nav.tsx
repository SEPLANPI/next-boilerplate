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
      className={`flex h-full flex-col overflow-hidden border-r bg-gray-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div
        className={`mb-2 border-b py-2 ${collapsed ? 'flex flex-col items-center gap-2' : 'flex items-center justify-between px-4'}`}
      >
        <div
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2'} `}
        >
          {config.app.logo ? (
            <Image
              src={config.app.logo}
              alt={config.app.name}
              width={120}
              height={120}
              className="size-10"
              quality={100}
            />
          ) : (
            defaultLogo
          )}
          {!collapsed && (
            <>
              <Divider orientation="vertical" className="my-auto h-6" />
              <span className="font-medium">{config.app.name}</span>
            </>
          )}
        </div>
        <ActionIcon onClick={() => toggleCollapsed()} variant="ghost" size="lg">
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </ActionIcon>
      </div>
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
