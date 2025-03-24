'use client'

import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { NavigationTabs, TabItem } from '@/components/ui/navigation-tabs'
import { Divider } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { MobileMenu } from './mobile-menu'
import { UserMenu } from './user-menu'
import { FileSpreadsheet, UserPlus } from 'lucide-react'

const accessTabItems: TabItem[] = [
  { value: 'dados', icon: FileSpreadsheet, label: 'Dados' },
  { value: 'propostas', icon: UserPlus, label: 'Propostas' }
]

export function Header({ children }: PropsWithChildren) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="flex flex-col">
      <header className="flex h-12 w-full items-center justify-between border-b px-4 sm:px-6 md:px-8">
        <div className="flex h-full items-center space-x-4">
          <Image
            className="h-7 w-auto"
            src="/logo/horizontal/verde-verde.png"
            alt="Logo"
            width={208}
            height={56}
            quality={100}
            priority
          />

          {!isMobile && (
            <>
              <Divider orientation="vertical" className="my-auto h-6" />
              <NavigationTabs
                items={accessTabItems}
                basePath={`/conselheiros`}
                defaultValue="dados"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && children}
          {isMobile ? <MobileMenu items={accessTabItems} /> : <UserMenu />}
        </div>
      </header>
      {isMobile && (
        <div className="flex w-full justify-center px-8 pt-3">{children}</div>
      )}
    </div>
  )
}
