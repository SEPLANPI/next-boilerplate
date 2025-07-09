'use client'

import { ActionIcon, Divider, ScrollArea } from '@mantine/core'
import { NavItem } from './nav-item'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { UserMenu } from './user-menu'
import { useSidebar } from '@/contexts/sidebar-context'
import { MainNavProps } from '@/types/sidebar'
import Image from 'next/image'

export function MainNav({ config }: MainNavProps) {
  const { collapsed, toggleCollapsed } = useSidebar()

  return (
    <aside
      className={`flex h-full flex-col overflow-hidden bg-gray-100 transition-all duration-300 ${collapsed ? 'w-20' : 'w-[260px]'
        }`}
    >
      <div
        className={`pt-3 ${collapsed ? 'flex flex-col items-center justify-center gap-2' : 'flex items-center justify-between px-4'}`}
      >
        <div
          className={`flex items-center ${collapsed ? 'justify-center' : ''} `}
        >
          <Image
            src={config.app.logos.collapsed}
            alt={config.app.name}
            width={120}
            height={120}
            className={`size-[36px] ${!collapsed && 'hidden'}`}
            quality={100}
          />
          <Image
            src={config.app.logos.expanded}
            alt={config.app.name}
            width={300}
            height={56}
            className={`h-[36px] w-auto ${collapsed && 'hidden'}`}
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
      {collapsed && (
        <ActionIcon
          onClick={() => toggleCollapsed()}
          variant="ghost"
          size="lg"
          className="mx-auto my-3"
        >
          <PanelLeftOpen className="size-4" />
        </ActionIcon>
      )}
      <ScrollArea className="flex-1 px-4" type="scroll">
        <nav className="space-y-3">
          {config.sections.map((section, index) => (
            <section
              className="flex flex-col space-y-1.5"
              key={section.title || index}
            >
              {section.title &&
                (collapsed ? (
                  <Divider className="" />
                ) : (
                  <span className="block text-xxs font-semibold uppercase tracking-wide text-content-muted">
                    {section.title}
                  </span>
                ))}
              <div
                className={`flex flex-col space-y-1.5 ${collapsed ? 'items-center' : ''}`}
              >
                {section.items.map((item) => (
                  <NavItem key={item.label} item={item} collapsed={collapsed} />
                ))}
              </div>
            </section>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4">
        <UserMenu />
      </div>
    </aside>
  )
}
