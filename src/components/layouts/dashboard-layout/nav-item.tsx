'use client'

import { Tooltip, Anchor } from '@mantine/core'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NavigationItem } from '@/types/sidebar'

interface NavItemProps {
  item: NavigationItem
  collapsed: boolean
}

const NAV_LINK_BASE_STYLES =
  'rounded flex items-center text-gray-700 [&:not([data-active=true])]:hover:bg-gray-200 data-[active=true]:text-govGreen-700 data-[active=true]:bg-govGreen-50 '

const NAV_LINK_STYLES = {
  root: `${NAV_LINK_BASE_STYLES} block whitespace-nowrap no-underline space-x-2 font-medium text-sm w-full px-3 py-2 font-normal data-[active=true]:font-semibold `
}

const NAV_LINK_COLLAPSED_STYLES = {
  root: `${NAV_LINK_BASE_STYLES} justify-center size-9`
}

export function NavItem({ item, collapsed }: NavItemProps) {
  const pathname = usePathname()
  const isActive = item.match
    ? pathname.startsWith(item.match)
    : pathname.endsWith(item.href)
  const IconComponent = item.icon ? <item.icon className="size-4" /> : null

  if (collapsed) {
    return (
      <Tooltip label={item.label} position="right" withArrow openDelay={300}>
        <Anchor
          href={item.href}
          component={Link}
          data-active={isActive}
          classNames={NAV_LINK_COLLAPSED_STYLES}
          key={item.label}
        >
          {IconComponent}
        </Anchor>
      </Tooltip>
    )
  }

  return (
    <Anchor
      href={item.href}
      component={Link}
      data-active={isActive}
      classNames={NAV_LINK_STYLES}
      key={item.label}
    >
      {IconComponent}
      <span>{item.label}</span>
    </Anchor>
  )
}
