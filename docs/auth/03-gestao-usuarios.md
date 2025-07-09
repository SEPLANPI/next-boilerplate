# 👤 Gestão de Usuários

## Índice

- [Estrutura do Usuário](#estrutura-do-usuário)
- [Definição de Roles](#definição-de-roles)
- [Acessar Dados da Sessão](#acessar-dados-da-sessão)
- [Componentes Server-Side](#componentes-server-side)
- [Formatação de Dados](#formatação-de-dados)
- [Atualização de Sessão](#atualização-de-sessão)
- [Extensão da Interface](#extensão-da-interface)

## Estrutura do Usuário

```typescript
// src/types/auth.ts
export interface BaseUser {
  name: string // Nome do usuário
  email: string // Email
  id: string // ID único
  cpf: string // CPF (sem formatação)
  fullName: string // Nome completo
  birthDate: string // Data de nascimento (ISO string)
  roles: Role[] // Roles do usuário
}
```

## Definição de Roles

### Onde os Roles são Definidos

```typescript
// src/types/roles.ts - Definição atual
export type Role = 'admin' | 'advisor'
```

### Como Estender para Seu Sistema

```typescript
// src/types/roles.ts - Exemplo para sistema administrativo
export type Role = 'admin' | 'manager' | 'operator' | 'viewer'

// src/types/roles.ts - Exemplo para sistema de atendimento
export type Role = 'supervisor' | 'agent' | 'specialist'

// src/types/roles.ts - Exemplo para sistema de vendas
export type Role = 'admin' | 'sales-manager' | 'sales-rep' | 'customer'
```

### Configuração no Keycloak

Os roles devem ser configurados pela **ETIPI** no Keycloak GovPI:

```json
// Como aparecem no token JWT
{
  "resource_access": {
    "seu-client-id": {
      "roles": ["admin", "manager"]
    }
  }
}
```

> **Para novos roles**: Solicite à ETIPI conforme [Configuração Inicial](./01-configuracao-inicial.md#solicitar-novos-roles-à-etipi)

### Dados Disponíveis na Sessão

```typescript
// src/types/next-auth.d.ts
interface Session {
  user: BaseUser
  accessToken: string
  refreshToken: string
  error: string
}
```

## Acessar Dados da Sessão

### Client Components

```typescript
'use client'
import { useSession } from 'next-auth/react'

export function UserProfile() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Carregando...</div>
  if (!session) return <div>Não logado</div>

  const { user } = session

  return (
    <div className="user-profile">
      <h2>Perfil do Usuário</h2>
      <div className="user-info">
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Nome Completo:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>CPF:</strong> {user.cpf}</p>
        <p><strong>Data de Nascimento:</strong> {user.birthDate}</p>
        <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
      </div>
    </div>
  )
}
```

## Componentes Server-Side

### Páginas com Dados do Usuário

```typescript
// src/app/profile/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/sign-in')
  }

  const { user } = session

  return (
    <div>
      <h1>Bem-vindo, {user.fullName}!</h1>
      <div className="user-details">
        <p>Email: {user.email}</p>
        <p>CPF: {user.cpf}</p>
        <p>Roles: {user.roles.join(', ')}</p>
        <p>Tipo: {user.roles.includes('admin') ? 'Administrador' : 'Usuário'}</p>
      </div>
    </div>
  )
}
```

### Componente Reutilizável

```typescript
// src/components/user-info.tsx
import { BaseUser } from '@/types/auth'

interface UserInfoProps {
  user: BaseUser
  showRoles?: boolean
  compact?: boolean
}

export function UserInfo({ user, showRoles = true, compact = false }: UserInfoProps) {
  if (compact) {
    return (
      <div className="user-info-compact">
        <span>{user.name}</span>
        <small>{user.cpf}</small>
      </div>
    )
  }

  return (
    <div className="user-info">
      <h3>{user.fullName}</h3>
      <p>Email: {user.email}</p>
      <p>CPF: {user.cpf}</p>
      <p>Data de Nascimento: {user.birthDate}</p>

      {showRoles && (
        <p>Roles: {user.roles.join(', ')}</p>
      )}
    </div>
  )
}

// Uso em página server:
export default async function MyPage() {
  const session = await auth()

  return (
    <div>
      <UserInfo user={session.user} />
    </div>
  )
}
```

## Formatação de Dados

### Utilitários de Formatação

```typescript
// src/lib/user-utils.ts
import { BaseUser } from '@/types/auth'

export function formatCPF(cpf: string): string {
  if (!cpf) return ''
  // Remove caracteres não numéricos e formata
  const numbers = cpf.replace(/\D/g, '')
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatBirthDate(birthDate: string): string {
  if (!birthDate) return ''
  try {
    const date = new Date(birthDate)
    return date.toLocaleDateString('pt-BR')
  } catch {
    return birthDate
  }
}

export function getUserDisplayName(user: BaseUser): string {
  return user.fullName || user.name || user.email || 'Usuário'
}

export function getUserInitials(user: BaseUser): string {
  const name = getUserDisplayName(user)
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getUserRoleLabel(roles: string[]): string {
  if (roles.includes('admin')) return 'Administrador'
  if (roles.includes('advisor')) return 'Conselheiro'
  return 'Usuário'
}
```

### Componente com Formatação

```typescript
import { formatCPF, formatBirthDate, getUserInitials } from '@/lib/user-utils'

export function FormattedUserCard({ user }: { user: BaseUser }) {
  return (
    <div className="user-card">
      <div className="avatar">
        {getUserInitials(user)}
      </div>

      <div className="user-details">
        <h3>{user.fullName}</h3>
        <p>CPF: {formatCPF(user.cpf)}</p>
        <p>Nascimento: {formatBirthDate(user.birthDate)}</p>
        <p>Email: {user.email}</p>

        <div className="roles">
          {user.roles.map(role => (
            <span key={role} className={`role-badge role-${role}`}>
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

## Atualização de Sessão

### Hook para Atualização

```typescript
// src/hooks/useSessionUpdate.ts
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

export function useSessionUpdate() {
  const { update } = useSession()

  const updateUserData = useCallback(async () => {
    // Força renovação dos dados da sessão
    await update()
  }, [update])

  const handleUserUpdate = useCallback(
    async (userData: any) => {
      // Salva dados no backend (implementar conforme sua API)
      // await saveUserData(userData)

      // Atualiza sessão para refletir mudanças
      await updateUserData()
    },
    [updateUserData]
  )

  return {
    updateUserData,
    handleUserUpdate
  }
}
```

### Exemplo de Uso

```typescript
export function EditProfileForm() {
  const { user } = useUser()
  const { handleUserUpdate } = useSessionUpdate()

  const onSubmit = async (formData: FormData) => {
    const updatedData = {
      name: formData.get('name'),
      email: formData.get('email')
    }

    await handleUserUpdate(updatedData)
  }

  return (
    <form action={onSubmit}>
      <input
        name="name"
        defaultValue={user?.name}
        placeholder="Nome"
      />

      <input
        name="email"
        type="email"
        defaultValue={user?.email}
        placeholder="Email"
      />

      <input
        name="cpf"
        defaultValue={user?.cpf}
        placeholder="CPF"
        readOnly
      />

      <button type="submit">Atualizar Perfil</button>
    </form>
  )
}
```

## Extensão da Interface

### Para Campos Personalizados

Se você precisar de campos adicionais (ex: telefone, departamento):

1. **Solicite à ETIPI:**

   - Novos atributos de usuário no Keycloak
   - Configuração de mappers para incluir nos tokens

2. **Estenda a interface:**

```typescript
// src/types/auth.ts
export interface BaseUser {
  name: string
  email: string
  id: string
  cpf: string
  fullName: string
  birthDate: string
  roles: Role[]
  // Campos personalizados
  telefone?: string
  departamento?: string
  cargo?: string
}
```

3. **Atualize o token handler:**

```typescript
// src/lib/auth/token-handlers.ts (se implementado)
export async function enrichTokenWithUserData(token: JWT, accessToken: string) {
  const userInfo = await getUserInfo(accessToken)

  return {
    ...token,
    user: {
      ...userInfo,
      // Inclua os novos campos aqui
      telefone: userInfo.telefone,
      departamento: userInfo.departamento
    }
  }
}
```

### Exemplo com Campos Personalizados

```typescript
interface ExtendedUser extends BaseUser {
  telefone?: string
  departamento?: string
}

export function ExtendedUserProfile({ user }: { user: ExtendedUser }) {
  return (
    <div>
      <h2>{user.fullName}</h2>
      <p>Email: {user.email}</p>
      <p>CPF: {formatCPF(user.cpf)}</p>

      {user.telefone && (
        <p>Telefone: {user.telefone}</p>
      )}

      {user.departamento && (
        <p>Departamento: {user.departamento}</p>
      )}

      <div className="roles">
        {user.roles.map(role => (
          <span key={role}>{role}</span>
        ))}
      </div>
    </div>
  )
}
```

## Padrões de Uso

### Menu de Usuário

```typescript
'use client'
import { useUser } from '@/hooks/useUser'
import { formatCPF, getUserInitials } from '@/lib/user-utils'

export function UserMenu() {
  const { user, isAuthenticated } = useUser()

  if (!isAuthenticated) return null

  return (
    <div className="user-menu">
      <button className="user-trigger">
        <div className="avatar">
          {getUserInitials(user)}
        </div>
        <div className="user-info">
          <span className="name">{user.name}</span>
          <span className="cpf">{formatCPF(user.cpf)}</span>
        </div>
      </button>

      <div className="menu-dropdown">
        <a href="/profile">Meu Perfil</a>
        <a href="/api/auth/sign-out">Sair</a>
      </div>
    </div>
  )
}
```

### Lista de Usuários (Admin)

```typescript
import { BaseUser } from '@/types/auth'
import { formatCPF, getUserRoleLabel } from '@/lib/user-utils'

interface UserListProps {
  users: BaseUser[]
}

export function UserList({ users }: UserListProps) {
  return (
    <table className="user-list">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{formatCPF(user.cpf)}</td>
            <td>{getUserRoleLabel(user.roles)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

> **Importante**: Os dados do usuário vêm do **Keycloak GovPI** e são gerenciados pela **ETIPI**. Para modificar campos ou adicionar novos atributos, entre em contato com a equipe ETIPI.
