import { match } from 'assert'
import { LucideProps } from 'lucide-react'
import { ComponentType } from 'react'
import { string } from 'zod'

export interface NavigationItem {
  label: string
  href: string
  icon: ComponentType<LucideProps>
  match?: string
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
