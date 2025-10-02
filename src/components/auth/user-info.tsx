'use client'

import { useSession, signOut } from 'next-auth/react'
import { Card, Text, Group, Button, Badge, Stack, Divider } from '@mantine/core'
import { User, LogOut, Shield } from 'lucide-react'

export function UserInfo() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Stack gap="md">
        <Group>
          <User size={20} />
          <Text fw={500}>Informações do Usuário</Text>
        </Group>

        <Divider />

        <div>
          <Text size="sm" c="dimmed">Nome</Text>
          <Text fw={500}>{session.user.name}</Text>
        </div>

        <div>
          <Text size="sm" c="dimmed">Email</Text>
          <Text size="sm">{session.user.email}</Text>
        </div>

        <div>
          <Text size="sm" c="dimmed">ID</Text>
          <Text size="sm" tt="uppercase">{session.user.id}</Text>
        </div>

        {session.user.roles && (
          <div>
            <Text size="sm" c="dimmed">Funções</Text>
            <Group gap="xs" mt="xs">
              {session.user.roles.map((role: string) => (
                <Badge key={role} size="sm" variant="light">
                  {role}
                </Badge>
              ))}
            </Group>
          </div>
        )}

        {session.user.permissions && (
          <div>
            <Text size="sm" c="dimmed">Permissões</Text>
            <Group gap="xs" mt="xs">
              {session.user.permissions.map((permission: string) => (
                <Badge key={permission} size="xs" variant="outline" color="blue">
                  {permission}
                </Badge>
              ))}
            </Group>
          </div>
        )}

        <Divider />

        <Group>
          <Shield size={16} />
          <Text size="xs" c="dimmed">
            {session.accessToken ? 'Token válido' : 'Token inválido'}
          </Text>
        </Group>

        <Button
          variant="light"
          color="red"
          leftSection={<LogOut size={16} />}
          onClick={handleSignOut}
          fullWidth
        >
          Sair
        </Button>
      </Stack>
    </Card>
  )
}
