import { LucideProps } from 'lucide-react'
import { ComponentType } from 'react'

interface BaseNavigationItem {
  label: string
  icon: ComponentType<LucideProps>
}

interface NavigationLeafItem extends BaseNavigationItem {
  href: string
  match?: string
  children?: never
}

interface NavigationParentItem extends BaseNavigationItem {
  href?: never
  match?: never
  children: NavigationLeafItem[]
}

export type NavigationItem = NavigationLeafItem | NavigationParentItem

// Type guards
export function isNavigationLeafItem(
  item: NavigationItem
): item is NavigationLeafItem {
  return 'href' in item && typeof item.href === 'string'
}

export function isNavigationParentItem(
  item: NavigationItem
): item is NavigationParentItem {
  return 'children' in item && Array.isArray(item.children)
}

export interface NavigationSection {
  title?: string
  items: NavigationItem[]
}

export interface AppConfig {
  name: string
  logos: {
    collapsed: string
    expanded: string
  }
}

export interface SidebarConfig {
  app: AppConfig
  sections: NavigationSection[]
}

export interface MainNavProps {
  config: SidebarConfig
}
