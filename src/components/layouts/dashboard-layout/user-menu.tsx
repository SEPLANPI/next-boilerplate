'use client'

import { Avatar, Menu, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useSidebar } from '@/contexts/sidebar-context'

export function UserMenu() {
  const { data } = useSession()
  const [open, setOpen] = useState(false)
  const { collapsed } = useSidebar()

  const getShortName = (fullName?: string) => {
    if (!fullName) return ''
    const names = fullName.split(' ')
    return names.length > 1
      ? `${names[0]} ${names[names.length - 1]}`
      : names[0]
  }

  const menuContent = (
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
  )

  if (collapsed) {
    return (
      <div className="flex items-center justify-center">
        <Menu
          shadow="sm"
          width={288}
          position="right-end"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Menu.Target>
            <UnstyledButton
              className={`${
                open ? 'ring-4' : ''
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
          {menuContent}
        </Menu>
      </div>
    )
  }

  return (
    <Menu
      shadow="sm"
      width={288}
      position="bottom-end"
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Menu.Target>
        <button className="flex w-full cursor-pointer items-center justify-start space-x-2 rounded p-2 hover:bg-gray-200">
          <Avatar
            radius="xl"
            size="sm"
            color="initials"
            key={data?.user.name}
            name={data?.user.name}
            alt="Avatar do usuário"
            variant="filled"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-start text-xs font-medium">
              {getShortName(data?.user.name)}
            </p>
          </div>
        </button>
      </Menu.Target>
      {menuContent}
    </Menu>
  )
}
