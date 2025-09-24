"use client"

import { routingConfig } from "@/config/routing"
import { Button } from "@mantine/core"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <Button
      variant="subtle"
      rightSection={<LogOut className="size-4" />}
      onClick={() =>
        signOut({
          redirectTo: routingConfig.defaults.redirects.postAuthRedirectPath,
        })
      }
    >
      Sair do sistema
    </Button>
  )
}
