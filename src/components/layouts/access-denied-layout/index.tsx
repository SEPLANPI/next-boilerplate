import { auth } from "@/auth"
import { Avatar, Button } from "@mantine/core"
import { Home, Lock } from "lucide-react"
import Link from "next/link"
import { SignOutButton } from "./sign-out-button"

interface AccessDeniedLayoutProps {
  title: string
  description: string
  suggestions?: string[]
}

export async function AccessDeniedLayout({
  title,
  description,
  suggestions,
}: AccessDeniedLayoutProps) {
  const session = await auth()
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="flex flex-col items-start gap-8">
        <div className="bg-muted rounded p-4">
          <Lock className="size-12 text-content-muted" />
        </div>

        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-semibold text-content-emphasis">
            {title}
          </h1>
          <p className="">{description}</p>
        </div>

        {suggestions && suggestions.length > 0 && (
          <div className="flex flex-col items-start gap-2">
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
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
