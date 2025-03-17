'use client'
import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import { useParams, useSearchParams } from 'next/navigation'
import { parseAsString, useQueryState } from 'nuqs'

export function SignInGovpiButton() {
  const [code] = useQueryState('code', parseAsString)
  return (
    <Button
      onClick={() =>
        signIn('keycloak', {
          redirectTo: `/conselheiros/cadastro/form?code=${code}`
        })
      }
    >
      Entrar com gov.pi
    </Button>
  )
}
