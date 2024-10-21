'use client'
import { PropsWithChildren } from 'react'

import {
  Avatar,
  Container,
  Menu,
  TextInput,
  UnstyledButton
} from '@mantine/core'
import { ChevronDown, LogOut, Search } from 'lucide-react'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useRouter } from 'next/navigation'

export function DashboardLayout({ children }: PropsWithChildren) {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const router = useRouter()

  async function handleSignOut() {
    router.push('/api/auth/sign-out')
  }

  return (
    <div className="flex min-h-[100dvh]">
      {!isMobile && (
        <div className="w-64">
          <MainNav />
        </div>
      )}
      <div className="flex-1 shadow-sm">
        <header className="flex border-b py-2">
          <Container
            className="flex w-full justify-between space-x-2"
            size="xl"
          >
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
                    key="Usuário"
                    name="Usuário"
                    alt="avatar do usuário"
                  />
                  <span className="hidden items-center space-x-2 md:flex">
                    <span className="text-sm font-semibold text-gray-900">
                      Usuário
                    </span>
                    <ChevronDown className="size-4 text-gray-600" />
                  </span>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Ação</Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={handleSignOut}
                  color="red"
                  rightSection={<LogOut className="size-4" />}
                >
                  Sair
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Container>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
