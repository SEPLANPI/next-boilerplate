# 🛡️ Proteção de Rotas

## Índice

- [Como Funciona](#como-funciona)
- [Middleware Implementado](#middleware-implementado)
- [Fluxo de Verificação](#fluxo-de-verificação)
- [Lógica de Acesso](#lógica-de-acesso)
- [Páginas de Redirecionamento](#páginas-de-redirecionamento)
- [Debug e Troubleshooting](#debug-e-troubleshooting)

## Como Funciona

O middleware intercepta **todas as requisições** e decide automaticamente:

1. ✅ **Permitir acesso** (rota pública ou usuário autorizado)
2. 🔄 **Redirecionar para login** (usuário não autenticado)
3. ⛔ **Redirecionar para acesso negado** (usuário sem permissão)
4. ⏰ **Redirecionar para sessão expirada** (token inválido)

> **Você NÃO precisa proteger páginas manualmente** - o middleware faz tudo automaticamente baseado na [configuração](./05-configuracao-rotas.md).

## Middleware Implementado

### Arquivo Principal

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { determineRouteAccess } from '@/lib/routes/matcher'
import { routingConfig } from './config/routing'

export default auth((req) => {
  const path = req.nextUrl.pathname

  // Determina acesso baseado no caminho e roles do usuário
  const routeAccess = determineRouteAccess(path, req?.auth?.user?.roles || [])

  // 1. ROTA PÚBLICA: Permite acesso imediatamente
  if (routeAccess.isPublic) {
    return NextResponse.next()
  }

  // 2. ERRO NA SESSÃO: Redireciona para sessão expirada
  if (req.auth?.error) {
    const sessionExpiredUrl = new URL('/sessao-expirada', req.nextUrl.origin)
    sessionExpiredUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(sessionExpiredUrl)
  }

  // 3. NÃO AUTENTICADO: Redireciona para login
  if (!req.auth) {
    const loginPath = routingConfig.defaults.redirects.loginPagePath
    const newUrl = new URL(loginPath, req.nextUrl.origin)
    newUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(newUrl)
  }

  // 4. SEM PERMISSÃO: Redireciona para acesso negado
  if (!routeAccess.hasPermission) {
    const newUrl = new URL(routeAccess.accessDeniedPath!, req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  // 5. AUTORIZADO: Permite acesso
  return NextResponse.next()
})

// Aplica a TODAS as rotas (exceto assets estáticos)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp)).*)'
  ]
}
```

## Fluxo de Verificação

### 1. Usuário não autenticado

```
Usuário acessa /admin/users
↓
Middleware detecta: !req.auth
↓
Redireciona para: /api/auth/sign-in?redirectTo=/admin/users
↓
Após login: Keycloak redireciona para /admin/users
```

### 2. Usuário sem permissão

```
Usuário 'advisor' acessa /admin/users
↓
Middleware detecta: autenticado mas sem role 'admin'
↓
Redireciona para: /acesso-negado
```

### 3. Sessão expirada

```
Usuário com token inválido acessa /dashboard
↓
Middleware detecta: req.auth.error
↓
Redireciona para: /sessao-expirada?redirectTo=/dashboard
```

### 4. Acesso permitido

```
Usuário 'admin' acessa /admin/users
↓
Middleware verifica: autenticado + role correto
↓
Permite acesso: NextResponse.next()
```

## Lógica de Acesso

### Função de Determinação

```typescript
// src/lib/routes/matcher.ts
export function determineRouteAccess(
  path: string,
  userRoles: Role[] = []
): {
  isPublic: boolean
  hasPermission: boolean
  accessDeniedPath?: string
} {
  // 1. Encontra configuração que corresponde ao caminho
  let matchedConfig = routingConfig.routes.find((route) =>
    matchRoute(path, [route.path])
  )

  // 2. Verifica se há override mais específico
  if (matchedConfig?.overrides) {
    const override = matchedConfig.overrides.find((override) =>
      matchRoute(path, [override.path])
    )
    if (override) {
      matchedConfig = override
    }
  }

  // 3. Determina se é pública e quais roles são necessários
  const isPublic = matchedConfig?.isPublic ?? routingConfig.defaults.isPublic
  const requiredRoles =
    matchedConfig?.requiredRoles ?? routingConfig.defaults.requiredRoles

  // 4. Verifica se usuário tem permissão
  const hasPermission = checkPermissions(userRoles, requiredRoles)

  // 5. Determina página de acesso negado
  let accessDeniedPath =
    routingConfig.defaults.redirects.defaultAccessDeniedPath
  if (!hasPermission && requiredRoles.length > 0) {
    const roleSpecificPath = requiredRoles
      .map(
        (role) =>
          routingConfig.defaults.redirects.accessDeniedPageByRequiredRole[role]
      )
      .find((path) => path !== undefined)
    if (roleSpecificPath) {
      accessDeniedPath = roleSpecificPath
    }
  }

  return {
    isPublic,
    hasPermission,
    accessDeniedPath
  }
}
```

### Verificação de Permissões

```typescript
// src/lib/routes/matcher.ts
function checkPermissions(userRoles: Role[], requiredRoles: Role[]): boolean {
  // Se não há roles requeridos, qualquer usuário autenticado pode acessar
  if (requiredRoles.length === 0) {
    return true
  }

  // Verifica se usuário tem pelo menos um dos roles necessários
  return userRoles.some((userRole) => requiredRoles.includes(userRole))
}
```

### Correspondência de Rotas

```typescript
// src/lib/routes/matcher.ts
function matchRoute(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    // Converte padrão para regex
    const regexPattern = pattern
      .replace(/:\w+/g, '[^/]+') // :param vira [^/]+
      .replace(/\*/g, '.*') // * vira .*
      .replace(/\//g, '\\/') // / vira \/

    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(pathname)
  })
}
```

## Páginas de Redirecionamento

### Sessão Expirada

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

### Como Criar Páginas de Acesso Negado

```typescript
// src/app/acesso-negado/page.tsx
export default function AccessDenied() {
  return (
    <div className="access-denied-page">
      <h1>Acesso Negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <a href="/">Voltar ao Início</a>
    </div>
  )
}

// src/app/admin/acesso-negado/page.tsx (específica para admin)
export default function AdminAccessDenied() {
  return (
    <div className="access-denied-page">
      <h1>Área Administrativa</h1>
      <p>Você precisa de permissões de administrador.</p>
      <p>Entre em contato com o administrador do sistema.</p>
      <a href="/dashboard">Voltar ao Dashboard</a>
    </div>
  )
}
```

## Debug e Troubleshooting

### Logs de Debug

```typescript
// src/middleware.ts (versão com debug)
export default auth((req) => {
  const path = req.nextUrl.pathname

  // Log para debug (remover em produção)
  console.log('🛣️ Middleware checking:', {
    path,
    userRoles: req?.auth?.user?.roles,
    isAuthenticated: !!req.auth,
    hasError: !!req.auth?.error
  })

  const routeAccess = determineRouteAccess(path, req?.auth?.user?.roles || [])

  console.log('🔍 Route access result:', routeAccess)

  // ... resto do middleware
})
```

### Teste Manual de Configuração

```typescript
// src/lib/routes/matcher.ts
// Adicione função para testes manuais
export function testRouteAccess(path: string, roles: Role[] = []) {
  const result = determineRouteAccess(path, roles)
  console.log(`Testing ${path} with roles [${roles.join(', ')}]:`, result)
  return result
}

// Para testar no console:
// testRouteAccess('/admin/users', ['admin'])
// testRouteAccess('/admin/users', ['advisor'])
// testRouteAccess('/public/page', [])
```

### Ferramentas de Debug

```typescript
// src/components/debug/RouteDebugger.tsx (apenas em dev)
'use client'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { determineRouteAccess } from '@/lib/routes/matcher'

export function RouteDebugger() {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (process.env.NODE_ENV !== 'development') return null

  const userRoles = session?.user?.roles || []
  const routeAccess = determineRouteAccess(pathname, userRoles)

  return (
    <div className="fixed bottom-0 right-0 bg-black text-white p-4 text-xs">
      <h4>Route Debug</h4>
      <p>Path: {pathname}</p>
      <p>Roles: [{userRoles.join(', ')}]</p>
      <p>Public: {routeAccess.isPublic ? 'Yes' : 'No'}</p>
      <p>Has Permission: {routeAccess.hasPermission ? 'Yes' : 'No'}</p>
      {routeAccess.accessDeniedPath && (
        <p>Denied Path: {routeAccess.accessDeniedPath}</p>
      )}
    </div>
  )
}
```

### Problemas Comuns

#### 1. Middleware não executa

```typescript
// Verifique o matcher no middleware.ts
export const config = {
  matcher: [
    // ✅ Correto - exclui assets
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|webp)).*)'
  ]
}
```

#### 2. Loop de redirecionamento

```typescript
// ❌ Problema: página de login protegida
{
  path: '/api/auth/sign-in',
  isPublic: false  // Isso causa loop!
}

// ✅ Solução: garanta que páginas de login sejam públicas
```

#### 3. Página de erro protegida

```typescript
// ✅ Sempre marque páginas de erro como públicas
{
  path: '/admin/*',
  isPublic: false,
  requiredRoles: ['admin'],
  overrides: [
    {
      path: '/admin/acesso-negado',
      isPublic: true  // Importante!
    }
  ]
}
```

#### 4. Headers já enviados

```typescript
// ❌ Problema: modificar resposta após next()
export default auth((req) => {
  const response = NextResponse.next()

  // Alguma lógica...

  return NextResponse.redirect(new URL('/login')) // ❌ Headers já enviados
})

// ✅ Solução: decida o redirecionamento antes de chamar next()
```

### Verificar Estado do Middleware

```typescript
// Adicione em uma página para verificar se middleware funciona
// src/app/debug/middleware/page.tsx
import { auth } from '@/auth'

export default async function MiddlewareDebug() {
  const session = await auth()

  return (
    <div>
      <h1>Debug do Middleware</h1>
      <p>Se você consegue ver esta página, o middleware permitiu acesso.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
```

> **Importante**: Para configurar **quais rotas** são protegidas, veja [Configuração de Rotas](./05-configuracao-rotas.md). Este documento explica **como** a proteção funciona internamente.
