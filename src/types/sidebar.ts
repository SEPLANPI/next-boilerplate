import { LucideProps } from 'lucide-react'
import { ComponentType } from 'react'

export interface BaseNavigationItem {
  label: string
}

export interface NavigationLink extends BaseNavigationItem {
  href: string
  items?: never
  icon: ComponentType<LucideProps>
}

export interface NavigationChild extends BaseNavigationItem {
  href: string
}

export interface NavigationGroup extends BaseNavigationItem {
  items: readonly NavigationChild[]
  href?: never
  icon: ComponentType<LucideProps>
}

export type NavigationItem = NavigationLink | NavigationGroup

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export type SidebarConfig = NavigationSection[]
