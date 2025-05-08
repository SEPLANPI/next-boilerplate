import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import React, { ComponentType, memo, useMemo } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ComponentType<LucideProps>
}

interface DashboardBreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

export const DashboardBreadcrumbs: React.FC<DashboardBreadcrumbsProps> = memo(
  ({ items, separator = '/' }) => {
    const breadcrumbs = useMemo(
      () =>
        items.map(({ href, label, icon: Icon }, index) => {
          const isLastItem = index === items.length - 1
          const content = (
            <div className="flex items-center space-x-2 text-xs">
              {Icon && <Icon className="size-4" />}
              <span className={` ${isLastItem ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </div>
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
