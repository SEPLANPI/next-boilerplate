'use client'

import { ActionIcon, Divider, useMantineTheme } from '@mantine/core'
import { NavItem } from './nav-item'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { UserMenu } from './user-menu'
import { useSidebar } from '@/contexts/sidebar-context'
import { MainNavProps } from '@/types/sidebar'
import Image from 'next/image'
import { EventSelect } from './event-select'

export function MainNav({ config }: MainNavProps) {
  const { collapsed, toggleCollapsed } = useSidebar()
  const theme = useMantineTheme()

  console.log(theme.other)

  return (
    <aside
      className={`flex h-full flex-col overflow-hidden border-r bg-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div
        className={`mb-2 h-12 border-b ${collapsed ? 'flex flex-col items-center justify-center gap-2' : 'flex items-center justify-between px-4'}`}
      >
        <div
          className={`flex items-center ${collapsed ? 'justify-center' : ''} `}
        >
          <Image
            src={config.app.logos.collapsed}
            alt={config.app.name}
            width={120}
            height={120}
            className={`size-10 ${!collapsed && 'hidden'}`}
            quality={100}
          />
          <Image
            src={config.app.logos.expanded}
            alt={config.app.name}
            width={300}
            height={56}
            className={`h-7 w-auto ${collapsed && 'hidden'}`}
            quality={100}
          />
        </div>
        {!collapsed && (
          <ActionIcon
            onClick={() => toggleCollapsed()}
            variant="ghost"
            size="lg"
            className="ml-2"
          >
            <PanelLeftClose className="size-4" />
          </ActionIcon>
        )}
      </div>
      {!collapsed && (
        <div className="px-4 pb-4 pt-2">
          <EventSelect />
        </div>
      )}
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
                <span className="text-xxs text-content-muted mb-2 block font-semibold uppercase">
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
