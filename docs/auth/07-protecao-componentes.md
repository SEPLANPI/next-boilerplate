# 🧩 Proteção de Componentes

## Índice

- [Permission Gates Implementados](#permission-gates-implementados)
- [Client Permission Gate](#client-permission-gate)
- [Server Permission Gate](#server-permission-gate)
- [Exemplos Práticos](#exemplos-práticos)
- [Padrões de Uso](#padrões-de-uso)

## Permission Gates Implementados

O sistema fornece dois componentes para controle de acesso granular na UI:

- **ClientPermissionGate**: Para componentes client-side
- **ServerPermissionGate**: Para componentes server-side

## Client Permission Gate

### Implementação

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

### Uso Básico

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Apenas admins */}
      <ClientPermissionGate allowedRoles={['admin']}>
        <button>Configurações</button>
      </ClientPermissionGate>

      {/* Admin ou Advisor */}
      <ClientPermissionGate allowedRoles={['admin', 'advisor']}>
        <section>
          <h2>Área Restrita</h2>
          <p>Conteúdo para usuários com permissão</p>
        </section>
      </ClientPermissionGate>
    </div>
  )
}
```

## Server Permission Gate

### Implementação

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

### Uso Básico

```typescript
import { ServerPermissionGate } from '@/components/permision-gates/server-permission-gate'

export default async function ServerPage() {
  return (
    <div>
      <h1>Página do Servidor</h1>

      {/* Renderizado no servidor - mais performático */}
      <ServerPermissionGate allowedRoles={['admin']}>
        <div>Conteúdo administrativo</div>
      </ServerPermissionGate>

      <ServerPermissionGate allowedRoles={['admin', 'advisor']}>
        <AdminPanel />
      </ServerPermissionGate>
    </div>
  )
}
```

## Exemplos Práticos

### Navegação Condicional

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'
import Link from 'next/link'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', roles: ['admin', 'advisor'] },
  { label: 'Usuários', href: '/admin/users', roles: ['admin'] },
  { label: 'Conselheiros', href: '/conselheiros', roles: ['advisor'] },
  { label: 'Relatórios', href: '/reports', roles: ['admin', 'advisor'] }
]

export function Navigation() {
  return (
    <nav className="main-navigation">
      <ul>
        {menuItems.map(item => (
          <ClientPermissionGate
            key={item.href}
            allowedRoles={item.roles}
          >
            <li>
              <Link href={item.href}>
                {item.label}
              </Link>
            </li>
          </ClientPermissionGate>
        ))}
      </ul>
    </nav>
  )
}
```

### Formulários com Campos Condicionais

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'

export function UserForm() {
  return (
    <form>
      {/* Campos básicos - todos podem ver */}
      <input name="name" placeholder="Nome" required />
      <input name="email" type="email" placeholder="Email" required />

      {/* Campos administrativos - apenas admin */}
      <ClientPermissionGate allowedRoles={['admin']}>
        <fieldset>
          <legend>Configurações Administrativas</legend>
          <select name="role">
            <option value="advisor">Conselheiro</option>
            <option value="admin">Administrador</option>
          </select>
        </fieldset>
      </ClientPermissionGate>

      {/* Campos de gestão - admin ou advisor */}
      <ClientPermissionGate allowedRoles={['admin', 'advisor']}>
        <fieldset>
          <legend>Informações de Gestão</legend>
          <textarea name="notes" placeholder="Observações" />
        </fieldset>
      </ClientPermissionGate>

      <button type="submit">Salvar</button>
    </form>
  )
}
```

### Botões de Ação Condicionais

```typescript
import { useSession } from 'next-auth/react'

interface ActionButtonsProps {
  itemId: string
  onEdit?: () => void
  onDelete?: () => void
  onApprove?: () => void
}

export function ActionButtons({
  itemId,
  onEdit,
  onDelete,
  onApprove
}: ActionButtonsProps) {
  const { data: session } = useSession()
  const userRoles = session?.user?.roles || []

  const isAdmin = userRoles.includes('admin')
  const isAdvisor = userRoles.includes('advisor')

  return (
    <div className="action-buttons">
      {/* Editar - admin ou advisor */}
      {(isAdmin || isAdvisor) && onEdit && (
        <button onClick={onEdit} className="btn-primary">
          Editar
        </button>
      )}

      {/* Aprovar - apenas advisors */}
      {isAdvisor && onApprove && (
        <button onClick={onApprove} className="btn-success">
          Aprovar
        </button>
      )}

      {/* Excluir - apenas admins */}
      {isAdmin && onDelete && (
        <button
          onClick={() => {
            if (confirm('Tem certeza que deseja excluir?')) {
              onDelete()
            }
          }}
          className="btn-danger"
        >
          Excluir
        </button>
      )}
    </div>
  )
}
```

### Layout com Seções Condicionais

```typescript
import { ServerPermissionGate } from '@/components/permision-gates/server-permission-gate'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <header>
        <h1>Painel Administrativo</h1>
      </header>

      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="/admin/dashboard">Dashboard</a></li>

            <ServerPermissionGate allowedRoles={['admin']}>
              <li><a href="/admin/users">Usuários</a></li>
              <li><a href="/admin/settings">Configurações</a></li>
            </ServerPermissionGate>

            <ServerPermissionGate allowedRoles={['admin', 'advisor']}>
              <li><a href="/admin/reports">Relatórios</a></li>
            </ServerPermissionGate>
          </ul>
        </nav>
      </aside>

      <main>
        {children}
      </main>
    </div>
  )
}
```

## Padrões de Uso

### Verificação Manual com useSession

```typescript
'use client'
import { useSession } from 'next-auth/react'

export function ManualRoleCheck() {
  const { data: session, status } = useSession()

  // Estados de loading
  if (status === 'loading') {
    return <div>Carregando...</div>
  }

  // Não autenticado
  if (!session) {
    return <div>Faça login para continuar</div>
  }

  // Verificação manual de roles
  const isAdmin = session.user?.roles?.includes('admin')
  const isAdvisor = session.user?.roles?.includes('advisor')

  return (
    <div>
      <h2>Olá, {session.user.fullName}!</h2>

      {isAdmin && (
        <section className="admin-section">
          <h3>Controles de Admin</h3>
          <button>Gerenciar Sistema</button>
        </section>
      )}

      {isAdvisor && (
        <section className="advisor-section">
          <h3>Ferramentas do Conselheiro</h3>
          <button>Emitir Parecer</button>
        </section>
      )}

      {(isAdmin || isAdvisor) && (
        <section className="common-section">
          <h3>Ferramentas Comuns</h3>
          <button>Relatórios</button>
        </section>
      )}
    </div>
  )
}
```

### Hook Personalizado (Sugestão)

```typescript
// src/hooks/useRoles.ts (você pode criar)
import { useSession } from 'next-auth/react'
import { Role } from '@/types/roles'

export function useRoles() {
  const { data: session, status } = useSession()
  const userRoles = session?.user?.roles || []

  const hasRole = (role: Role): boolean => {
    return userRoles.includes(role)
  }

  const hasAnyRole = (roles: Role[]): boolean => {
    return roles.some((role) => hasRole(role))
  }

  const can = (action: string, resource: string): boolean => {
    // Lógica personalizada de permissões
    if (action === 'delete' && resource === 'user') {
      return hasRole('admin')
    }

    if (action === 'edit' && resource === 'profile') {
      return hasAnyRole(['admin', 'advisor'])
    }

    return false
  }

  return {
    userRoles,
    hasRole,
    hasAnyRole,
    can,
    isAdmin: hasRole('admin'),
    isAdvisor: hasRole('advisor'),
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated'
  }
}
```

### Usando Hook Personalizado

```typescript
import { useRoles } from '@/hooks/useRoles'

export function RoleBasedDashboard() {
  const { isAdmin, isAdvisor, can, isLoading } = useRoles()

  if (isLoading) return <div>Carregando...</div>

  return (
    <div>
      <h1>Dashboard</h1>

      {isAdmin && (
        <section>
          <h2>Painel Admin</h2>
          <button>Configurações</button>
        </section>
      )}

      {isAdvisor && (
        <section>
          <h2>Ferramentas do Conselheiro</h2>
          <button>Pareceres</button>
        </section>
      )}

      {can('edit', 'profile') && (
        <button>Editar Perfil</button>
      )}

      {can('delete', 'user') && (
        <button className="danger">Excluir Usuário</button>
      )}
    </div>
  )
}
```

### Componente de Fallback

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'

interface ProtectedContentProps {
  children: React.ReactNode
  requiredRoles: Role[]
  fallback?: React.ReactNode
}

export function ProtectedContent({
  children,
  requiredRoles,
  fallback = <div>Acesso restrito</div>
}: ProtectedContentProps) {
  return (
    <ClientPermissionGate allowedRoles={requiredRoles}>
      {children}
    </ClientPermissionGate>
  ) || fallback
}

// Uso:
export function MyPage() {
  return (
    <div>
      <h1>Página</h1>

      <ProtectedContent
        requiredRoles={['admin']}
        fallback={<p>Você precisa ser admin para ver isto</p>}
      >
        <AdminControls />
      </ProtectedContent>
    </div>
  )
}
```

## Diferenças entre Client e Server Gates

| Aspecto          | ClientPermissionGate  | ServerPermissionGate |
| ---------------- | --------------------- | -------------------- |
| **Renderização** | Client-side           | Server-side          |
| **Performance**  | Hidratação necessária | Mais rápido          |
| **SEO**          | Conteúdo não indexado | Conteúdo indexado    |
| **Uso**          | Interações dinâmicas  | Conteúdo estático    |
| **Loading**      | Pode mostrar flash    | Sem flash            |

### Quando Usar Cada Um

**ClientPermissionGate:**

- Botões interativos
- Formulários dinâmicos
- Navegação que muda baseada em estado
- Componentes que precisam de interação

**ServerPermissionGate:**

- Seções de layout
- Conteúdo estático
- Navegação principal
- Componentes que não mudam após renderização

> **Importante**: Ambos os gates usam a mesma lógica de verificação de roles. A diferença está apenas em onde a verificação é executada (cliente vs servidor).

## Navegação

⬅️ **[Proteção de Rotas](./06-protecao-rotas.md)** - Middleware e configuração de acesso  
✅ **Proteção de Componentes** (você está aqui)  
➡️ **[Debug e Troubleshooting](./08-debug-troubleshooting.md)** - Ferramentas de depuração

## Boas Práticas

### ✅ Recomendado

- Use Server Gates para performance e SEO
- Centralize lógica de verificação em hooks
- Sempre trate estados de loading
- Forneça feedback claro sobre permissões

### ❌ Evite

- Confiar apenas na proteção do frontend
- Verificações desnecessárias em cada render
- Não tratar estados de erro
- Lógica de permissão duplicada

### 🔒 Segurança

- **Sempre valide permissões no backend/API**
- Use verificações redundantes para ações críticas
- Não exponha dados sensíveis no cliente
