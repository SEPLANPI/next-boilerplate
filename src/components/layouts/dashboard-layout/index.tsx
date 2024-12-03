'use client'
import { PropsWithChildren } from 'react'

import { TextInput } from '@mantine/core'
import { Search } from 'lucide-react'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { useMediaQuery } from '@/hooks/use-media-query'
import { UserMenu } from './user-menu'

export function DashboardLayout({ children }: PropsWithChildren) {
  const isMobile = useMediaQuery('(max-width: 1024px)')

  return (
    <div className="flex min-h-[100dvh]">
      {!isMobile && (
        <div className="w-64">
          <MainNav />
        </div>
      )}
      <div className="flex-1 shadow-sm">
        <header className="flex w-full items-center justify-between border-b px-5 py-2">
          {isMobile && <MobileNav />}
          <TextInput
            disabled={true}
            className="w-full max-w-96"
            placeholder="Pesquisar eventos, empresas, deputados"
            leftSection={<Search className="size-4" />}
          />
          <UserMenu />
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  )
}
