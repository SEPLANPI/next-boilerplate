'use client'
import { PropsWithChildren } from 'react'

import { Avatar, Menu, TextInput, UnstyledButton } from '@mantine/core'
import { ChevronDown, LogOut, Search } from 'lucide-react'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { useMediaQuery } from '@/hooks/use-media-query'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export function DashboardLayout({ children }: PropsWithChildren) {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const { data } = useSession()
  return (
    <div className="flex min-h-[100dvh]">
      {!isMobile && (
        <div className="w-64">
          <MainNav />
        </div>
      )}
      <div className="flex-1 shadow-sm">
        <header className="flex w-full justify-between border-b px-5 py-2">
          {isMobile && <MobileNav />}
          <TextInput
            className="w-full max-w-96"
            placeholder="Pesquisar"
            leftSection={<Search className="size-4" />}
          />
          <Menu shadow="sm" width={124} position="bottom-end">
            <Menu.Target>
              <UnstyledButton className="flex items-center gap-2">
                <Avatar
                  radius="xl"
                  color="govBlue"
                  key={data?.user.name}
                  name={data?.user.name}
                  alt="Avatar do usuário"
                />
                <span className="hidden items-center space-x-2 md:flex">
                  <span className="text-sm font-semibold text-gray-900">
                    {data?.user.name}
                  </span>
                  <ChevronDown className="size-4 text-gray-600" />
                </span>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                href="/api/auth/sign-out"
                color="red"
                rightSection={<LogOut className="size-4" />}
              >
                Sair
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  )
}
