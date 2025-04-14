'use client'
import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import { useParams } from 'next/navigation'

export function SignInGovpiButton() {
  const { token } = useParams<{ token: string }>()
  return (
    <Button
      fullWidth
      className="font-normal"
      onClick={() =>
        signIn('keycloak', {
          redirectTo: `/conselheiros/cadastro/${token}/form`
        })
      }
    >
      Entrar com
      <span className="font-bold">&nbsp;gov.pi cidadão</span>
    </Button>
  )
}
