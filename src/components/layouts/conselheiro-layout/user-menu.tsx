'use client'
import { Avatar, Menu, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function UserMenu() {
  const { data } = useSession()
  const [userMenuOpen, { open, close }] = useDisclosure(false)

  return (
    <Menu
      shadow="sm"
      width={288}
      position="bottom-end"
      opened={userMenuOpen}
      onOpen={open}
      onClose={close}
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
        <Menu.Item component={Link} href="/api/auth/sign-out?redirectTo=/">
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
