'use client'
import { PropsWithChildren } from 'react'
import Image from 'next/image'
import { TabItem, NavigationTabs } from '@/components/ui/navigation-tabs'
import { FileSpreadsheet, UserPlus, Menu as MenuIcon } from 'lucide-react'
import { ActionIcon, Avatar, Divider, UnstyledButton } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'

export default function Layout({ children }: PropsWithChildren) {
  const { data } = useSession()
  const [userMenuOpen, { open: openUserMenu, close: closeUserMenu }] =
    useDisclosure(false)
  const [
    mobileMenuOpen,
    { open: openMobileMenu, close: closeMobileMenu, toggle: toggleMobileMenu }
  ] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const accessTabItems: TabItem[] = [
    { value: 'dados', icon: FileSpreadsheet, label: 'Dados' },
    { value: 'propostas', icon: UserPlus, label: 'Propostas' }
  ]

  return (
    <div className="flex min-h-screen flex-col">
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

        {isMobile ? (
          <Menu
            shadow="sm"
            position="bottom-end"
            opened={mobileMenuOpen}
            onChange={toggleMobileMenu}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <MenuIcon size={24} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <nav className="flex flex-col space-y-2">
                {accessTabItems.map((item) => (
                  <Menu.Item
                    key={item.value}
                    component={Link}
                    href={`/conselheiros/${item.value}`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </nav>

              <Menu.Divider />

              <Menu.Label>Conta</Menu.Label>
              <div className="flex items-stretch justify-start space-x-2 px-3 py-2">
                <Avatar
                  radius="xl"
                  color="initials"
                  key={data?.user.name}
                  name={data?.user.name}
                  alt="Avatar do usuário"
                  variant="filled"
                />
                <div className="flex min-w-0 flex-col items-start justify-between">
                  <p className="w-full truncate text-xs font-medium">
                    {data?.user.name}
                  </p>
                  <span className="w-full truncate text-xs text-secondary-foreground">
                    {data?.user.email}
                  </span>
                </div>
              </div>
              <Menu.Item component={Link} href="/api/auth/sign-out">
                Sair
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Menu
            shadow="sm"
            width={288}
            position="bottom-end"
            opened={userMenuOpen}
            onOpen={openUserMenu}
            onClose={closeUserMenu}
          >
            <Menu.Target>
              <UnstyledButton
                className={`${
                  userMenuOpen ? 'ring-4' : ''
                } h-min rounded-full ring-gray-300 hover:ring-4`}
              >
                <Avatar
                  radius="xl"
                  size="sm"
                  color="initials"
                  key={data?.user.name}
                  name={data?.user.name}
                  alt="Avatar do usuário"
                  variant="filled"
                />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Conta</Menu.Label>
              <div className="flex items-stretch justify-start space-x-2 px-3 py-2">
                <Avatar
                  radius="xl"
                  color="initials"
                  key={data?.user.name}
                  name={data?.user.name}
                  alt="Avatar do usuário"
                  variant="filled"
                />
                <div className="flex min-w-0 flex-col items-start justify-between">
                  <p className="w-full truncate text-xs font-medium">
                    {data?.user.name}
                  </p>
                  <span className="w-full truncate text-xs text-secondary-foreground">
                    {data?.user.email}
                  </span>
                </div>
              </div>
              <Menu.Divider />
              <Menu.Item component={Link} href="/api/auth/sign-out">
                Sair
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50">{children}</main>
    </div>
  )
}
