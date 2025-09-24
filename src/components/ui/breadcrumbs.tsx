"use client"

import {
  ActionIcon,
  Anchor,
  Breadcrumbs as MantineBreadcrumbs,
  Menu,
} from "@mantine/core"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { memo, useMemo } from "react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  maxVisibleItems?: number
  maxItemWidth?: string
}

interface BreadcrumbItemProps {
  item: BreadcrumbItem
  isLastItem: boolean
  maxWidth?: string
}

const BreadcrumbItemComponent: React.FC<BreadcrumbItemProps> = memo(
  ({ item, maxWidth = "160px" }) => {
    const { href, label } = item

    const itemClasses = `
      inline-flex items-center text-xs transition-colors duration-200 text-content-muted hover:text-content cursor-pointer"}
    `

    const content = (
      <span className="truncate" style={{ maxWidth }} title={label}>
        {label}
      </span>
    )

    return href ? (
      <Anchor
        unstyled
        component={Link}
        href={href}
        className={itemClasses}
        underline="never"
      >
        {content}
      </Anchor>
    ) : (
      <span className={itemClasses}>{content}</span>
    )
  },
)

BreadcrumbItemComponent.displayName = "BreadcrumbItem"

interface DropdownMenuProps {
  items: BreadcrumbItem[]
  maxItemWidth?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = memo(
  ({ items, maxItemWidth }) => (
    <Menu shadow="md" width={200} position="bottom-start">
      <Menu.Target>
        <ActionIcon
          variant="white"
          color="gray.4"
          size="sm"
          aria-label="Show more breadcrumb items"
          className="mx-1"
        >
          <MoreHorizontal className="size-4" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((item, index) => {
          const MenuItemContent = (
            <span
              className="truncate"
              style={{ maxWidth: maxItemWidth }}
              title={item.label}
            >
              {item.label}
            </span>
          )

          return item.href ? (
            <Menu.Item key={index} className="text-xs">
              <Link href={item.href} className="block w-full">
                {MenuItemContent}
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item key={index} className="text-xs">
              {MenuItemContent}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  ),
)

DropdownMenu.displayName = "DropdownMenu"

export const Breadcrumbs: React.FC<BreadcrumbsProps> = memo(
  ({
    items,
    separator = <span className="text-content-muted">/</span>,
    maxVisibleItems = 4,
    maxItemWidth = "180px",
  }) => {
    const { visibleItems, hiddenItems } = useMemo(() => {
      if (items.length <= maxVisibleItems) {
        return { visibleItems: items, hiddenItems: [] }
      }

      // Always show first item, last item, and some middle items
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const middleItems = items.slice(1, -1)

      // Calculate how many middle items we can show
      const availableSlots = maxVisibleItems - 2 // Reserve slots for first and last
      const visibleMiddleCount = Math.max(0, availableSlots - 1) // Reserve 1 slot for dropdown

      const visibleMiddleItems = middleItems.slice(-visibleMiddleCount)
      const hiddenMiddleItems = middleItems.slice(0, -visibleMiddleCount)

      return {
        visibleItems: [firstItem, ...visibleMiddleItems, lastItem],
        hiddenItems: hiddenMiddleItems,
      }
    }, [items, maxVisibleItems])

    const breadcrumbs = useMemo(() => {
      const elements: React.ReactNode[] = []

      visibleItems.forEach((item, index) => {
        const isLastItem = index === visibleItems.length - 1

        // Add dropdown before the last visible item if there are hidden items
        if (hiddenItems.length > 0 && index === visibleItems.length - 1) {
          elements.push(
            <DropdownMenu
              key="dropdown"
              items={hiddenItems}
              maxItemWidth={maxItemWidth}
            />,
          )
        }

        elements.push(
          <BreadcrumbItemComponent
            key={`item-${index}`}
            item={item}
            isLastItem={isLastItem}
            maxWidth={maxItemWidth}
          />,
        )
      })

      return elements
    }, [visibleItems, hiddenItems, maxItemWidth])

    return (
      <MantineBreadcrumbs
        separator={separator}
        separatorMargin="xs"
        className="flex items-center"
      >
        {breadcrumbs}
      </MantineBreadcrumbs>
    )
  },
)

Breadcrumbs.displayName = "Breadcrumbs"
