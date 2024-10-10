'use client'

import { NavLink } from '@mantine/core'
import { Item } from './data'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavItemProps {
  item: Item
}
export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname()
  const IconComponent = item.Icon ? <item.Icon className="size-4" /> : null

  if (item.items) {
    return (
      <NavLink
        label={item.label}
        leftSection={IconComponent}
        childrenOffset={16}
        classNames={{
          root: '[&:not([data-active])]:text-gray-700 font-medium text-sm w-auto mb-1 -mx-2 p-2 [&:not([data-active])]:hover:bg-gray-200 rounded'
        }}
      >
        {item?.items.map((childItem) => (
          <Link href={childItem.href} key={childItem.label}>
            <NavLink
              active={pathname.endsWith(childItem.href)}
              classNames={{
                root: '[&:not([data-active])]:text-gray-700 font-medium text-sm w-auto mb-1 -mx-2 p-2 [&:not([data-active])]:hover:bg-gray-200 rounded'
              }}
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
        active={pathname.endsWith(item.href)}
        leftSection={IconComponent}
        classNames={{
          root: '[&:not([data-active])]:text-gray-700 font-medium text-sm w-auto mb-1 -mx-2 p-2 [&:not([data-active])]:hover:bg-gray-200 rounded'
        }}
        key={item.label}
        label={item.label}
      />
    </Link>
  )
}
