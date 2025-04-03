'use client'
import { ActionIcon, Avatar, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Menu as MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { TabItem } from '@/components/ui/navigation-tabs'

interface MobileMenuProps {
  items: TabItem[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const { data } = useSession()
  const [mobileMenuOpen, { toggle, close }] = useDisclosure(false)

  return (
    <Menu
      shadow="sm"
      position="bottom-end"
      opened={mobileMenuOpen}
      onChange={toggle}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <MenuIcon size={24} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <nav className="flex flex-col space-y-2">
          {items.map((item) => (
            <Menu.Item
              key={item.value}
              component={Link}
              href={`/conselheiros/${item.value}`}
              onClick={close}
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
        <Menu.Item component={Link} href="/api/auth/sign-out?redirectTo=/">
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
