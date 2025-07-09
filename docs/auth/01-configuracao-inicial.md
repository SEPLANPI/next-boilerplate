# 🚀 Configuração Inicial

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração das Variáveis](#configuração-das-variáveis)
- [Teste da Configuração](#teste-da-configuração)
- [Uso Básico](#uso-básico)
- [Próximos Passos](#próximos-passos)

## Pré-requisitos

- ✅ Next.js 13+ com App Router
- ✅ Credenciais do Keycloak GovPI (fornecidas pela ETIPI)
- ✅ Node.js 18+ instalado

## Configuração das Variáveis

Crie `.env.local` na raiz do projeto:

```env
# Keycloak GovPI (fornecidos pela ETIPI)
AUTH_KEYCLOAK_ID="seu-client-id"
AUTH_KEYCLOAK_SECRET="seu-client-secret"
AUTH_KEYCLOAK_ISSUER="https://keycloak-url/realms/cidadao"

# NextAuth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_SECURE_COOKIE="true"  # false apenas em dev local

# URL da aplicação
NEXT_PUBLIC_APP_URL="https://sua-app.com"
```

**Gerar AUTH_SECRET:**

```bash
openssl rand -base64 32
```

## Teste da Configuração

```bash
# Verificar variáveis
node -e "console.log(process.env.AUTH_KEYCLOAK_ISSUER)"

# Testar Keycloak
curl "$(echo $AUTH_KEYCLOAK_ISSUER)/.well-known/openid_configuration"

# Iniciar app
npm run dev

# Testar login
# Acesse: http://localhost:3000/api/auth/sign-in
```

## Uso Básico

### Verificar Sessão

```typescript
'use client'
import { useSession } from 'next-auth/react'

export function UserInfo() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Carregando...</div>
  if (!session) return <div>Não logado</div>

  return (
    <div>
      <p>Nome: {session.user.name}</p>
      <p>CPF: {session.user.cpf}</p>
      <p>Roles: {session.user.roles.join(', ')}</p>
    </div>
  )
}
```

### Proteger Página

```typescript
// src/app/admin/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/sign-in')
  }

  if (!session.user?.roles?.includes('admin')) {
    redirect('/acesso-negado')
  }

  return <div>Área administrativa</div>
}
```

### Conteúdo Condicional

```typescript
import { ClientPermissionGate } from '@/components/permision-gates/client-permission-gate'

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <ClientPermissionGate allowedRoles={['admin']}>
        <button>Apenas Admin</button>
      </ClientPermissionGate>

      <ClientPermissionGate allowedRoles={['admin', 'advisor']}>
        <section>Conteúdo para Admin ou Advisor</section>
      </ClientPermissionGate>
    </div>
  )
}
```

## Próximos Passos

1. **Fluxo de Autenticação** → [Fluxo de Autenticação](./02-fluxo-autenticacao.md)
2. **Configurar Rotas** → [Configuração de Rotas](./05-configuracao-rotas.md)
3. **Proteger Componentes** → [Proteção de Componentes](./07-protecao-componentes.md)

## Solicitar Novos Roles à ETIPI

Para configurar roles personalizados no Keycloak:

**Template de solicitação:**

```
Assunto: Configuração de Roles - [Nome do Sistema]

Prezado time ETIPI,

Solicito configuração dos seguintes roles:

- Client ID: seu-client-id
- Ambiente: [desenvolvimento/produção]
- Roles necessários:
  * admin (Administradores)
  * manager (Gerentes)
  * user (Usuários padrão)

Usuários de teste:
- [CPF do admin de teste]
- [CPF do manager de teste]

Atenciosamente,
[Seu nome]
```

Após configuração, atualize os tipos:

```typescript
// src/types/roles.ts
export type Role = 'admin' | 'advisor' | 'novo-role'
```

## Detalhes Técnicos (Como Funciona)

### Estrutura do NextAuth

```typescript
// src/auth.ts - Configuração principal
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: env.AUTH_KEYCLOAK_ID,
      clientSecret: env.AUTH_KEYCLOAK_SECRET,
      issuer: env.AUTH_KEYCLOAK_ISSUER
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account, trigger }) => {
      // Processamento inicial do login
      if (account && user) {
        return handleInitialSignIn(token, user, account)
      }

      // Renovação automática de tokens
      if (Date.now() > token.accessTokenExpires || trigger === 'update')
        return refreshAccessToken(token)

      // Verificação de sessão ativa
      if (token.accessToken) {
        const isActive = await verifySessionActivity(token.accessToken)
        if (!isActive) {
          return { ...token, error: 'TokenInvalidError' }
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user
        session.error = token.error
        session.accessToken = token.accessToken
      }
      return session
    }
  }
})
```

### Fluxo de Autenticação

1. **Login Inicial**: `handleInitialSignIn()` processa o primeiro login
2. **Enriquecimento**: `enrichTokenWithUserData()` busca dados do Keycloak
3. **Renovação**: `refreshAccessToken()` renova tokens automaticamente
4. **Verificação**: `verifySessionActivity()` valida sessão no Keycloak

### Integração com GovPI

O sistema está configurado para usar o **Keycloak GovPI Cidadão**:

- **Issuer**: URL do realm cidadão no GovPI
- **Client ID**: Identificador fornecido pela ETIPI
- **Client Secret**: Chave secreta gerenciada pela ETIPI
- **Scopes**: Configurados para incluir roles e atributos

## Variáveis de Ambiente Detalhadas

| Variável               | Obrigatória | Descrição                                                      | Exemplo                                     |
| ---------------------- | ----------- | -------------------------------------------------------------- | ------------------------------------------- |
| `AUTH_KEYCLOAK_ID`     | ✅          | ID do cliente (fornecido pela ETIPI)                           | `dialogos-cliente`                          |
| `AUTH_KEYCLOAK_SECRET` | ✅          | Secret do cliente (fornecido pela ETIPI)                       | `abc123...`                                 |
| `AUTH_KEYCLOAK_ISSUER` | ✅          | URL do realm GovPI                                             | `https://keycloak.govpi.com/realms/cidadao` |
| `AUTH_SECRET`          | ✅          | Chave para assinatura JWT (gere com `openssl rand -base64 32`) | `random-string-32-chars`                    |
| `AUTH_SECURE_COOKIE`   | ❌          | Usar cookies seguros HTTPS (default: `true`)                   | `true`                                      |
| `NEXT_PUBLIC_APP_URL`  | ✅          | URL pública da aplicação                                       | `https://app.exemplo.com`                   |

## Contato ETIPI

Para solicitações relacionadas ao Keycloak GovPI:

- **Novos clientes ou configurações**
- **Roles e permissões**
- **Atributos de usuário**
- **Mappers e scopes**
- **Troubleshooting de autenticação**

Entre em contato com a **equipe ETIPI** através dos canais oficiais do projeto.

## Troubleshooting Rápido

### ❌ Erro: "Client not found"

- Verifique `AUTH_KEYCLOAK_ID`
- Confirme com ETIPI se o cliente existe

### ❌ Erro: "Invalid redirect URI"

- Verifique se a URL está registrada com a ETIPI
- Formato: `https://sua-app.com/api/auth/callback/keycloak`

### ❌ Roles não aparecem

- Verifique com ETIPI se os mappers estão configurados
- Confirme se o usuário tem roles atribuídos
