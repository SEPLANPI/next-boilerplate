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

interface ClientPermissionGateProps {
  children: ReactNode
  authorizedRoles?: Role[]
}

export function ClientPermissionGate({
  children,
  authorizedRoles
}: ClientPermissionGateProps) {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) {
    return null
  }

  // If authorizedRoles is not provided, any authenticated user has permission.
  if (!authorizedRoles) {
    return <>{children}</>
  }

  const hasPermission = user.roles.some((role) =>
    authorizedRoles.includes(role)
  )

  if (!hasPermission) {
    return null
  }

  return <>{children}</>
}
```

### Uso Básico

O `ClientPermissionGate` utiliza a prop `authorizedRoles` para definir quais perfis (`Role`) têm permissão para ver o conteúdo aninhado. A prop é **opcional**.

- **Se `authorizedRoles` for uma lista de perfis**: O conteúdo será exibido se o usuário logado possuir **pelo menos um** dos perfis listados.
- **Se `authorizedRoles` não for fornecido (`undefined`)**: O conteúdo será exibido para **qualquer usuário autenticado**, independentemente do seu perfil.
- **Se o usuário não estiver logado**: O conteúdo nunca será exibido.

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Exemplo 1: Apenas admins */}
      <ClientPermissionGate authorizedRoles={['admin']}>
        <button>Configurações Avançadas</button>
      </ClientPermissionGate>

      {/* Exemplo 2: Admin ou Advisor */}
      <ClientPermissionGate authorizedRoles={['admin', 'advisor']}>
        <section>
          <h2>Área de Gestão</h2>
          <p>Conteúdo visível para administradores e conselheiros.</p>
        </section>
      </ClientPermissionGate>

      {/* Exemplo 3: Qualquer usuário logado */}
      <ClientPermissionGate>
        <p>Esta informação é visível para todos os usuários logados.</p>
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
import { auth } from '@/auth'

interface ServerPermissionGateProps {
  children: ReactNode
  authorizedRoles?: Role[]
}

export async function ServerPermissionGate({
  children,
  authorizedRoles
}: ServerPermissionGateProps) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return null
  }

  // If authorizedRoles is not provided, any authenticated user has permission.
  if (!authorizedRoles) {
    return <>{children}</>
  }

  const hasPermission = user.roles.some((role) =>
    authorizedRoles.includes(role)
  )

  if (!hasPermission) {
    return null
  }

  return <>{children}</>
}
```

### Uso Básico

O `ServerPermissionGate` funciona exatamente como seu equivalente do cliente, mas é renderizado no servidor. Ele usa a prop opcional `authorizedRoles` para determinar o acesso.

- **Se `authorizedRoles` for uma lista de perfis**: O conteúdo será exibido se o usuário logado possuir **pelo menos um** dos perfis listados.
- **Se `authorizedRoles` não for fornecido (`undefined`)**: O conteúdo será exibido para **qualquer usuário autenticado**, independentemente do seu perfil.
- **Se o usuário não estiver logado**: O conteúdo nunca será exibido.

```typescript
import { ServerPermissionGate } from '@/components/permision-gates/server-permission-gate'
import { AdminPanel } from '@/components/admin/admin-panel'

export default async function ServerPage() {
  return (
    <div>
      <h1>Página Renderizada no Servidor</h1>

      {/* Exemplo 1: Conteúdo apenas para admins */}
      <ServerPermissionGate authorizedRoles={['admin']}>
        <div>
          <h2>Painel Administrativo</h2>
          <p>Este conteúdo é renderizado no servidor e visível apenas para admins.</p>
        </div>
      </ServerPermissionGate>

      {/* Exemplo 2: Componente aninhado para Admin ou Advisor */}
      <ServerPermissionGate authorizedRoles={['admin', 'advisor']}>
        <AdminPanel />
      </ServerPermissionGate>

      {/* Exemplo 3: Qualquer usuário logado */}
      <ServerPermissionGate>
        <p>Esta informação é visível para todos os usuários logados no servidor.</p>
      </ServerPermissionGate>
    </div>
  )
}
```

## Exemplos Práticos

### Navegação Condicional

Use o `ClientPermissionGate` para construir menus de navegação dinâmicos. Itens de menu para todos os usuários logados simplesmente omitem a prop `authorizedRoles`.

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'
import Link from 'next/link'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard', roles: ['admin', 'advisor'] },
  { label: 'Gestão de Usuários', href: '/admin/users', roles: ['admin'] },
  { label: 'Configurações', href: '/settings' }, // Todos logados
]

export function Navigation() {
  return (
    <nav>
      <ul>
        {menuItems.map(item => (
          <ClientPermissionGate
            key={item.href}
            authorizedRoles={item.roles}
          >
            <li>
              <Link href={item.href}>{item.label}</Link>
            </li>
          </ClientPermissionGate>
        ))}
      </ul>
    </nav>
  )
}
```

### Formulários com Campos Condicionais

Oculte ou exiba campos de um formulário com base no perfil do usuário, garantindo que apenas usuários autorizados possam ver ou editar dados sensíveis.

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'

export function UserForm() {
  return (
    <form>
      {/* Campos básicos */}
      <input name="name" placeholder="Nome" />
      <input name="email" type="email" placeholder="Email" />

      {/* Campo de status - Apenas para admins */}
      <ClientPermissionGate authorizedRoles={['admin']}>
        <fieldset>
          <legend>Controle de Acesso</legend>
          <select name="role">
            <option value="user">Usuário</option>
            <option value="advisor">Conselheiro</option>
            <option value="admin">Administrador</option>
          </select>
        </fieldset>
      </ClientPermissionGate>

      <button type="submit">Salvar</button>
    </form>
  )
}
```

### Botões de Ação Condicionais

Envolva botões ou outros elementos de ação com o `ClientPermissionGate` para garantir que apenas usuários com o perfil correto possam interagir com eles.

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'

interface ActionButtonsProps {
  onEdit: () => void
  onDelete: () => void
  onApprove: () => void
}

export function ActionButtons({ onEdit, onDelete, onApprove }: ActionButtonsProps) {
  return (
    <div className="flex space-x-2">
      {/* Editar: Admin ou Advisor */}
      <ClientPermissionGate authorizedRoles={['admin', 'advisor']}>
        <button onClick={onEdit}>Editar</button>
      </ClientPermissionGate>

      {/* Aprovar: Apenas Advisor */}
      <ClientPermissionGate authorizedRoles={['advisor']}>
        <button onClick={onApprove}>Aprovar</button>
      </ClientPermissionGate>

      {/* Excluir: Apenas Admin */}
      <ClientPermissionGate authorizedRoles={['admin']}>
        <button onClick={onDelete}>Excluir</button>
      </ClientPermissionGate>
    </div>
  )
}
```

### Layout com Seções Condicionais

Use o `ServerPermissionGate` para renderizar seções inteiras de um layout no servidor, como uma barra lateral de administração, ou para exibir conteúdo geral para qualquer usuário autenticado.

```typescript
import { ServerPermissionGate } from '@/components/permision-gates/server-permission-gate'
import Link from 'next/link'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>
        <h1>Painel de Administração</h1>
      </header>

      <aside>
        <nav>
          <ul>
            {/* Visível para todos os logados */}
            <ServerPermissionGate>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ServerPermissionGate>

            {/* Apenas Admins */}
            <ServerPermissionGate authorizedRoles={['admin']}>
              <li><Link href="/admin/users">Usuários</Link></li>
            </ServerPermissionGate>

            {/* Admins e Advisors */}
            <ServerPermissionGate authorizedRoles={['admin', 'advisor']}>
              <li><Link href="/admin/reports">Relatórios</Link></li>
            </ServerPermissionGate>
          </ul>
        </nav>
      </aside>

      <main>{children}</main>
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
