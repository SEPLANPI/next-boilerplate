'use client'

import { NavLink } from '@mantine/core'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NavigationItem } from '@/types/sidebar'
import { isNavigationGroup } from '@/config/sidebar'

interface NavItemProps {
  item: NavigationItem
}

const NAV_LINK_STYLES = {
  root: '[&:not([data-active])]:text-gray-700 font-medium text-sm w-auto mb-1 -mx-2 p-2 [&:not([data-active])]:hover:bg-gray-200 rounded'
}

export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname()
  const IconComponent = item.icon ? <item.icon className="size-4" /> : null

  if (isNavigationGroup(item)) {
    return (
      <NavLink
        label={item.label}
        leftSection={IconComponent}
        childrenOffset={16}
        classNames={NAV_LINK_STYLES}
      >
        {item.items.map((childItem) => (
          <Link href={childItem.href} key={childItem.label}>
            <NavLink
              component="span"
              active={pathname.endsWith(childItem.href)}
              classNames={NAV_LINK_STYLES}
              label={childItem.label}
            />
          </Link>
        ))}
      </NavLink>
    )
  }

  return (
    <Link href={item.href}>
      <NavLink
        component="span"
        active={pathname.endsWith(item.href)}
        leftSection={IconComponent}
        classNames={NAV_LINK_STYLES}
        key={item.label}
        label={item.label}
      />
    </Link>
  )
}
