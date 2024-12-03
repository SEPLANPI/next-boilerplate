'use client'

import { Avatar, Menu, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function UserMenu() {
  const { data } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <Menu
      shadow="sm"
      width={288}
      position="bottom-end"
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)} 
    >
      <Menu.Target>
        <UnstyledButton
          className={`${
            open ? 'ring-4' : ''
          } h-min rounded-full hover:ring-4 ring-gray-300`}
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
          <div className="flex flex-col items-start justify-between min-w-0">
            <p className="w-full truncate text-xs font-medium">
              {data?.user.name}
            </p> 
            <span className="w-full truncate text-xs text-secondary-foreground ">
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
  )
}
