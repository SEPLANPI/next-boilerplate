'use client'

import { Avatar, Button, Menu, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useSidebar } from '@/contexts/sidebar-context'
import { ChevronsUpDown, LogOut } from 'lucide-react'
import { formatCPF } from '@/lib/utils'

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
      <div className="flex items-stretch justify-start space-x-2 px-3 py-2">
        <Avatar
          color="initials"
          key={data?.user.name}
          name={data?.user.name}
          alt="Avatar do usuário"
          variant="filled"
        />
        <div className="flex min-w-0 flex-col items-start justify-between">
          <p className="w-full truncate text-xs font-medium text-content-emphasis">
            {getShortName(data?.user.name)}
          </p>
          <span className="w-full truncate text-xs font-normal text-content-muted">
            {formatCPF(data?.user.cpf || '')}
          </span>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item
        component={Link}
        href="/api/auth/sign-out?redirectTo=/"
        rightSection={<LogOut className="size-4" />}
      >
        Sair
      </Menu.Item>
    </Menu.Dropdown>
  )

  if (collapsed) {
    return (
      <div className="flex items-center justify-center">
        <Menu
          width={288}
          position="right-end"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Menu.Target>
            <UnstyledButton
              className={
                'flex size-12 items-center justify-center rounded-md border bg-white shadow-3 hover:bg-gray-100'
              }
            >
              <Avatar
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
      width={288}
      position="right-end"
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Menu.Target>
        <Button
          unstyled
          classNames={{
            inner: 'flex flex-nowrap items-center space-x-2  min-w-0',
            section: 'ml-auto flex-shrink-0',
            label: 'flex-1 min-w-0'
          }}
          className="w-full rounded-md border bg-white px-3 py-2 shadow-3 hover:bg-gray-100"
          rightSection={
            <ChevronsUpDown className="size-4 text-content-muted" />
          }
        >
          <div className="flex min-w-0 flex-1 flex-nowrap items-center justify-start space-x-2">
            <Avatar
              size="sm"
              color="initials"
              key={data?.user.name}
              name={data?.user.name}
              alt="Avatar do usuário"
              variant="filled"
              className="flex-shrink-0"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="min-w-0 truncate text-start text-xs font-medium text-content-emphasis">
                {getShortName(data?.user.name)}
              </p>
              <p className="min-w-0 truncate text-start text-xs text-content-muted">
                {formatCPF(data?.user.cpf || '')}
              </p>
            </div>
          </div>
        </Button>
      </Menu.Target>
      {menuContent}
    </Menu>
  )
}
