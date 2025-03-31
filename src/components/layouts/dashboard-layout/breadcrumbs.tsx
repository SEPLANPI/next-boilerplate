import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import React, { ComponentType, memo, useMemo } from 'react'

export interface BreadcrumbItem {
  // Label for the breadcrumb
  label: string
  // Optional link URL for clickable breadcrumb
  href?: string
  // Optional icon for the breadcrumb
  icon?: ComponentType<LucideProps>
}

interface DashboardBreadcrumbsProps {
  // Array of breadcrumb items
  items: BreadcrumbItem[]
  // Custom separator, default is '/'
  separator?: React.ReactNode
}

export const DashboardBreadcrumbs: React.FC<DashboardBreadcrumbsProps> = memo(
  ({ items, separator = '/' }) => {
    const breadcrumbs = useMemo(
      () =>
        items.map(({ href, label, icon: Icon }, index) => {
          const isLastItem = index === items.length - 1
          const content = (
            <>
              {Icon && <Icon className="size-4 text-secondary-foreground" />}
              <span
                className={`text-secondary-foreground ${isLastItem ? 'font-semibold' : ''}`}
              >
                {label}
              </span>
            </>
          )
          return href ? (
            <Anchor
              component={Link}
              key={index}
              href={href}
              className={`flex items-center space-x-2 text-xs`}
            >
              {content}
            </Anchor>
          ) : (
            <span key={index} className={`flex items-center space-x-2 text-xs`}>
              {content}
            </span>
          )
        }),
      [items]
    )

    return (
      <MantineBreadcrumbs separator={separator}>
        {breadcrumbs}
      </MantineBreadcrumbs>
    )
  }
)

DashboardBreadcrumbs.displayName = 'DashboardBreadcrumbs'
