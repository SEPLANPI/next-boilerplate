'use client'
import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import { parseAsString, useQueryState } from 'nuqs'

export function SignInGovpiButton() {
  const [code] = useQueryState('code', parseAsString)
  return (
    <Button
      fullWidth
      className="font-normal"
      onClick={() =>
        signIn('keycloak', {
          redirectTo: `/conselheiros/cadastro/form?code=${code}`
        })
      }
    >
      Entrar com{' '}
      <span className="font-montserrat font-bold">&nbsp;gov.pi cidadão</span>
    </Button>
  )
}
