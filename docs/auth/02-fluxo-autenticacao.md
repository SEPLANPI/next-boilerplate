# 🔑 Fluxo de Autenticação

## Índice

- [🔑 Fluxo de Autenticação](#-fluxo-de-autenticação)
  - [Índice](#índice)
  - [Como Funciona](#como-funciona)
  - [API Routes Implementadas](#api-routes-implementadas)
    - [Login (`/api/auth/sign-in`)](#login-apiauthsign-in)
    - [Logout (`/api/auth/sign-out`)](#logout-apiauthsign-out)
  - [Middleware de Proteção](#middleware-de-proteção)
  - [Callbacks do NextAuth](#callbacks-do-nextauth)
    - [Configuração Principal](#configuração-principal)
  - [Componentes de Sessão](#componentes-de-sessão)
    - [Página de Sessão Expirada](#página-de-sessão-expirada)
    - [Client Permission Gate](#client-permission-gate)
    - [Server Permission Gate](#server-permission-gate)
  - [Renovação de Tokens](#renovação-de-tokens)
    - [Verificação de Sessão](#verificação-de-sessão)
    - [Fluxo de Renovação](#fluxo-de-renovação)
  - [Navegação](#navegação)

## Como Funciona

O sistema usa **middleware automático** que intercepta todas as requisições e:

1. **Verifica se a rota é pública** (configurada em `@/config/routing`)
2. **Redireciona para login** se não autenticado
3. **Redireciona para "sessão expirada"** se token inválido
4. **Redireciona para "acesso negado"** se sem permissão
5. **Permite acesso** se autorizado

## API Routes Implementadas

### Login (`/api/auth/sign-in`)

```typescript
// src/app/api/auth/sign-in/route.ts
import { signIn } from '@/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirectTo')

  return signIn('keycloak', {
    redirectTo: redirectTo || '/'
  })
}
```

**Uso automático pelo middleware:**

- Usuário tenta acessar `/admin`
- Middleware redireciona para `/api/auth/sign-in?redirectTo=/admin`

### Logout (`/api/auth/sign-out`)

```typescript
// src/app/api/auth/sign-out/route.ts
import { signOut } from '@/auth'
import { env } from '@/config/env'
import { getToken } from '@auth/core/jwt'

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams
  const redirectTo = searchParams.get('redirectTo') || ''

  const token = await getToken({
    req,
    secret: env.AUTH_SECRET,
    secureCookie: env.AUTH_SECURE_COOKIE
  })

  if (!token?.idToken) {
    return await signOut({ redirectTo: redirectTo || '' })
  }

  try {
    // Logout completo no Keycloak
    const url = `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: env.AUTH_KEYCLOAK_ID,
        client_secret: env.AUTH_KEYCLOAK_SECRET,
        refresh_token: token.refreshToken as string
      }).toString()
    })
  } catch (error) {
    logger.error('Erro ao realizar logout no Keycloak:', error)
  }

  return await signOut({ redirectTo: redirectTo || '' })
}
```

## Middleware de Proteção

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { determineRouteAccess } from '@/lib/routes/matcher'
import { routingConfig } from './config/routing'

export default auth((req) => {
  const path = req.nextUrl.pathname
  const routeAccess = determineRouteAccess(path, req?.auth?.user?.roles || [])

  // 1. Rota pública: permite acesso
  if (routeAccess.isPublic) {
    return NextResponse.next()
  }

  // 2. Erro na sessão: redireciona para sessão expirada
  if (req.auth?.error) {
    const sessionExpiredUrl = new URL('/sessao-expirada', req.nextUrl.origin)
    sessionExpiredUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(sessionExpiredUrl)
  }

  // 3. Não autenticado: redireciona para login
  if (!req.auth) {
    const loginPath = routingConfig.defaults.redirects.loginPagePath
    const newUrl = new URL(loginPath, req.nextUrl.origin)
    newUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(newUrl)
  }

  // 4. Sem permissão: redireciona para acesso negado
  if (!routeAccess.hasPermission) {
    const newUrl = new URL(routeAccess.accessDeniedPath!, req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  // 5. Autorizado: permite acesso
  return NextResponse.next()
})
```

**Aplica a todas as rotas exceto assets estáticos:**

```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp)).*)'
  ]
}
```

## Callbacks do NextAuth

### Configuração Principal

```typescript
// src/auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: env.AUTH_KEYCLOAK_ID,
      clientSecret: env.AUTH_KEYCLOAK_SECRET,
      issuer: env.AUTH_KEYCLOAK_ISSUER
    })
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account && user) {
        return true
      } else {
        return routingConfig.defaults.redirects.loginPagePath
      }
    },
    jwt: async ({ token, user, account, trigger }) => {
      // Processamento inicial do login (conta como verificação da sessão)
      if (account && user) {
        const inicial = await handleInitialSignIn(token, user, account)
        return { ...inicial, sessaoVerificadaEm: Date.now() }
      }

      // Renovação automática (só funciona com a sessão ativa: também conta)
      if (Date.now() > token.accessTokenExpires || trigger === 'update') {
        const renovado = await refreshAccessToken(token)
        return renovado.error
          ? renovado
          : { ...renovado, sessaoVerificadaEm: Date.now() }
      }

      // Verificação de sessão ativa: no máximo a cada 5 min
      if (token.accessToken && precisaVerificarSessao(token)) {
        const isActive = await verifySessionActivity(token.accessToken)
        if (!isActive) {
          return { ...token, error: 'TokenInvalidError' }
        }
        return { ...token, sessaoVerificadaEm: Date.now() }
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user
        session.error = token.error
        session.accessToken = token.accessToken
        session.accessTokenExpires = token.accessTokenExpires
      }
      return session
    }
  }
})
```

## Componentes de Sessão

### Página de Sessão Expirada

```typescript
// src/app/sessao-expirada/page.tsx
import { signIn } from '@/auth'
import { Button } from '@mantine/core'
import { AlertCircle } from 'lucide-react'

export default async function SessionExpired({
  searchParams: { redirectTo = '/' }
}: {
  searchParams: { redirectTo?: string }
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-6 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sessão Expirada</h1>
          <p>Sua sessão expirou. Por favor, faça login novamente.</p>
        </div>
        <form
          action={async () => {
            'use server'
            await signIn('keycloak', { redirectTo })
          }}
        >
          <Button type="submit">Atualizar Sessão</Button>
        </form>
      </div>
    </div>
  )
}
```

### Client Permission Gate

```typescript
// src/components/permision-gates/client-permission-gate.tsx
'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { Role } from '@/types/roles'

interface ClientPermissionGateProps {
  children: ReactNode
  allowedRoles: Role[]
}

export function ClientPermissionGate({
  children,
  allowedRoles
}: ClientPermissionGateProps) {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) {
    return null
  }

  const hasPermission = user.roles.some((role) => allowedRoles.includes(role))

  if (!hasPermission) {
    return null
  }

  return <>{children}</>
}
```

### Server Permission Gate

```typescript
// src/components/permision-gates/server-permission-gate.tsx
import 'server-only'
import { ReactNode } from 'react'
import { Role } from '@/types/roles'
import { auth } from '@/auth'

interface ServerPermissionGateProps {
  children: ReactNode
  allowedRoles: Role[]
}

export async function ServerPermissionGate({
  children,
  allowedRoles
}: ServerPermissionGateProps) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return null
  }

  const hasPermission = user.roles.some((role) => allowedRoles.includes(role))

  if (!hasPermission) {
    return null
  }

  return <>{children}</>
}
```

## Renovação de Tokens

### Verificação de Sessão

```typescript
// src/lib/auth/verify-session.ts
export async function verifySessionActivity(
  accessToken: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token/introspect`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          token: accessToken,
          client_id: env.AUTH_KEYCLOAK_ID,
          client_secret: env.AUTH_KEYCLOAK_SECRET
        })
      }
    )

    const data = await response.json()
    return data.active === true
  } catch (error) {
    logger.error('Erro ao verificar sessão', { error })
    return false
  }
}
```

### Fluxo de Renovação

O sistema automaticamente:

1. **Verifica expiração** a cada requisição
2. **Renova tokens** quando necessário via `refreshAccessToken()`
3. **Valida sessão** no Keycloak via `verifySessionActivity()`, no máximo a cada 5 min
4. **Marca erro** se token inválido para redirecionamento

### Quantas vezes o app vai ao Keycloak

O callback `jwt` roda a cada `auth()` (servidor) e `getSession()` (navegador) — várias vezes por tela. Para não chamar o Keycloak em todas:

| Onde | Regra | Código |
|---|---|---|
| Callback `jwt` | introspect só se a última verificação passou de 5 min (`sessaoVerificadaEm` no token); login e renovação contam como verificação | `src/lib/auth/sessao.ts` (`precisaVerificarSessao`) |
| Servidor | `auth()` uma vez por renderização: use `sessaoDoServidor()` em vez de `auth()` | `src/lib/auth/sessao-servidor.ts` |
| Layout raiz | a sessão vai pronta para o `SessionProvider`, que não busca `/api/auth/session` ao montar nem a cada foco | `src/app/layout.tsx`, `src/app/providers.tsx` |
| Navegador | o token fica em memória até perto de expirar, em vez de um `getSession()` por chamada à API | `criarCacheDeToken` em `src/lib/api/interceptors.ts` e `src/lib/client-api.ts` |

Resultado medido nos testes de ponta a ponta: de **4 introspects por página para 0** com a sessão verificada há pouco (até 2 na primeira página depois de 5 min, e 0 nas seguintes).

**Troca aceita:** um logout feito em outro lugar (ou sessão derrubada no Keycloak) derruba o acesso em até 5 min, não na hora. Se alguma operação precisar de confirmação imediata, chame `verifySessionActivity()` nela.

Mesmo modelo do SAPO (sapo-front#245), em produção desde nov/2026.

## Navegação

⬅️ **[Estrutura e Arquitetura](./02-estrutura-arquitetura.md)** - Como o código está organizado  
✅ **Fluxo de Autenticação** (você está aqui)  
➡️ **[Gestão de Usuários](./04-gestao-usuarios.md)** - Trabalhando com dados do usuário
