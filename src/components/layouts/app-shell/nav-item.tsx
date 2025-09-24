"use client"

import { Tooltip, Anchor, Collapse, Menu, Box } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import {
  NavigationItem,
  isNavigationLeafItem,
  isNavigationParentItem,
} from "@/types/sidebar"
import { ChevronDown } from "lucide-react"
import { useSession } from "next-auth/react"

interface NavItemProps {
  item: NavigationItem
  collapsed: boolean
}

// Base navigation styles
const NAV_BASE_CLASSES = {
  base: "rounded-md flex items-center font-medium text-content",
  interactive: "[&:not([data-active=true])]:hover:bg-gray-700/[.12]",
  active: {
    background: "data-[active=true]:bg-primary-700/[.08]",
    text: "data-[active=true]:text-primary-700",
    font: "data-[active=true]:font-semibold",
  },
}

// Navigation style variants
const NAV_STYLES = {
  // Regular navigation link (expanded sidebar)
  link: {
    root: [
      NAV_BASE_CLASSES.base,
      NAV_BASE_CLASSES.interactive,
      NAV_BASE_CLASSES.active.background,
      NAV_BASE_CLASSES.active.text,
      NAV_BASE_CLASSES.active.font,
      "block whitespace-nowrap no-underline space-x-2 text-sm w-full px-3 py-2 ",
    ].join(" "),
  },

  // Collapsed navigation link (collapsed sidebar)
  collapsed: {
    root: [
      NAV_BASE_CLASSES.base,
      NAV_BASE_CLASSES.interactive,
      NAV_BASE_CLASSES.active.background,
      NAV_BASE_CLASSES.active.text,
      "justify-center size-9",
    ].join(" "),
  },

  // Parent navigation item (with children)
  parent: {
    root: [
      NAV_BASE_CLASSES.base,
      NAV_BASE_CLASSES.interactive,
      "cursor-pointer space-x-2 text-sm w-full px-3 py-2  justify-between text-gray-700",
    ].join(" "),
  },
}

export function NavItem({ item, collapsed }: NavItemProps) {
  const pathname = usePathname()
  const params = useParams()
  const [opened, { toggle }] = useDisclosure(false)
  const { data: session } = useSession()
  const userRoles = session?.user?.roles ?? []

  const hasPermission =
    !item.authorizedRoles ||
    item.authorizedRoles.length === 0 ||
    item.authorizedRoles.some((role) => userRoles.includes(role))

  if (!hasPermission) {
    return null
  }

  if (isNavigationLeafItem(item)) {
    const href = item.href.replace(
      /:(\w+)/g,
      (_, param) => params[param] as string,
    )

    const isActive =
      pathname.endsWith(href) || (item.match && pathname.includes(item.match))

    const IconComponent = item.icon ? <item.icon className="size-4" /> : null

    if (collapsed) {
      return (
        <Tooltip label={item.label} position="right" withArrow openDelay={100}>
          <Anchor
            href={href}
            component={Link}
            data-active={isActive}
            classNames={NAV_STYLES.collapsed}
            key={item.label}
          >
            {IconComponent}
          </Anchor>
        </Tooltip>
      )
    }

    return (
      <Anchor
        href={href}
        component={Link}
        data-active={isActive}
        classNames={NAV_STYLES.link}
        key={item.label}
      >
        {IconComponent}
        <span>{item.label}</span>
      </Anchor>
    )
  }

  if (isNavigationParentItem(item)) {
    const IconComponent = item.icon ? <item.icon className="size-4" /> : null

    const visibleChildren = item.children.filter((child) => {
      const childHasPermission =
        !child.authorizedRoles ||
        child.authorizedRoles.length === 0 ||
        child.authorizedRoles.some((role) => userRoles.includes(role))
      return childHasPermission
    })

    if (visibleChildren.length === 0) {
      return null
    }

    const isAnyChildActive = visibleChildren.some((child) => {
      const childHref = child.href.replace(
        /:(\w+)/g,
        (_, param) => params[param] as string,
      )
      return (
        pathname.startsWith(childHref) ||
        (child.match && pathname.includes(child.match))
      )
    })

    if (collapsed) {
      return (
        <Menu
          shadow="md"
          width={200}
          position="right-start"
          trigger="hover"
          openDelay={100}
          offset={0}
          closeDelay={100}
        >
          <Menu.Target>
            <Box
              className={NAV_STYLES.collapsed.root}
              data-active={isAnyChildActive}
              component="button"
            >
              {IconComponent}
            </Box>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{item.label}</Menu.Label>
            {visibleChildren.map((child) => {
              const childHref = child.href.replace(
                /:(\w+)/g,
                (_, param) => params[param] as string,
              )
              const isChildActive =
                pathname.startsWith(childHref) ||
                (child.match && pathname.includes(child.match))

              const ChildIcon = child.icon ? <child.icon size={14} /> : null

              return (
                <Menu.Item
                  key={child.label}
                  leftSection={ChildIcon}
                  component={Link}
                  href={childHref}
                  data-active={isChildActive}
                  className={
                    isChildActive ? "bg-primary-50 text-primary-700" : ""
                  }
                >
                  {child.label}
                </Menu.Item>
              )
            })}
          </Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <Box>
        <Box
          onClick={toggle}
          className={NAV_STYLES.parent.root}
          data-active={isAnyChildActive}
          component="button"
        >
          <Box className="flex items-center space-x-2">
            {IconComponent}
            <span>{item.label}</span>
          </Box>
          <ChevronDown
            className={`size-4 transition-transform duration-200 ease-in-out ${
              opened ? "rotate-180" : "rotate-0"
            }`}
          />
        </Box>

        <Collapse in={opened}>
          <Box className="ml-5 space-y-1.5 border-l-2 border-secondary py-1 pl-1">
            {visibleChildren.map((child) => {
              const childHref = child.href.replace(
                /:(\w+)/g,
                (_, param) => params[param] as string,
              )
              const isChildActive =
                pathname.startsWith(childHref) ||
                (child.match && pathname.includes(child.match))

              const ChildIcon = child.icon ? (
                <child.icon className="size-4" />
              ) : null

              return (
                <Anchor
                  key={child.label}
                  href={childHref}
                  component={Link}
                  data-active={isChildActive}
                  classNames={NAV_STYLES.link}
                >
                  {ChildIcon}
                  <span>{child.label}</span>
                </Anchor>
              )
            })}
          </Box>
        </Collapse>
      </Box>
    )
  }

  return null
}
