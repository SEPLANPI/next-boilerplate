'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbsWrapperProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbsWrapper({ items }: BreadcrumbsWrapperProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-gray-900 hover:underline"
            >
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
