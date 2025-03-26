import { auth } from '@/auth'
import { Avatar, Button } from '@mantine/core'
import { Lock, LogOut, Home } from 'lucide-react'
import Link from 'next/link'

interface AccessDeniedLayoutProps {
  title: string
  description: string
  suggestions?: string[]
}

export async function AccessDeniedLayout({
  title,
  description,
  suggestions
}: AccessDeniedLayoutProps) {
  const session = await auth()
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="flex flex-col items-start gap-8">
        <div className="rounded bg-muted p-4">
          <Lock className="size-12 text-muted-foreground" />
        </div>

        <div className="flex flex-col items-start gap-4">
          <h1 className="font-montserrat text-4xl font-bold">{title}</h1>
          <p className="text-secondary-foreground">{description}</p>
        </div>

        {suggestions && suggestions.length > 0 && (
          <div className="flex flex-col items-start gap-2 text-secondary-foreground">
            <p className="font-medium">O que você pode fazer:</p>
            <ul className="ml-5 list-disc space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <p>{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {session?.user && (
          <div className="flex items-center gap-4">
            <Avatar
              radius="xl"
              color="initials"
              key={session?.user.name}
              name={session?.user.name}
              alt="Avatar do usuário"
              variant="filled"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs">{session.user.cpf}</p>
            </div>
          </div>
        )}
        <div className="mt-4 flex gap-4">
          <Button
            component={Link}
            href="/"
            rightSection={<Home className="size-4" />}
          >
            Voltar para página inicial
          </Button>
          <Button
            component={Link}
            href="/api/auth/sign-out"
            variant="subtle"
            rightSection={<LogOut className="size-4" />}
          >
            Sair do sistema
          </Button>
        </div>
      </div>
    </div>
  )
}
