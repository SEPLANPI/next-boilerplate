# Autenticação com Keycloak

Este documento descreve a configuração de autenticação usando Keycloak integrado com NextAuth.js na aplicação.

## Estrutura de Arquivos

```
src/
├── auth.ts                         # Configuração principal do NextAuth
├── lib/
│   └── auth/
│       ├── types.ts               # Tipos relacionados à autenticação
│       ├── get-user-info.ts       # Função para buscar dados do usuário
│       ├── handle-initial-signin.ts # Lógica do login inicial
│       └── refresh-access-token.ts # Renovação de tokens
└── app/
    └── api/
        └── auth/
            ├── [...nextauth]/     # Rotas do NextAuth
            │   └── route.ts
            ├── sign-in/           # Rota de login
            │   └── route.ts
            ├── sign-out/          # Rota de logout do Keycloak
            │   └── route.ts
            └── callback-sign-out/ # Callback após logout do Keycloak
                └── route.ts
```

### Descrição dos Arquivos Principais

- **auth.ts**: Configuração central do NextAuth, define providers e callbacks
- **types.ts**: Define interfaces como `KeycloakAccessTokenPayload`, `UserInfo`, etc
- **get-user-info.ts**: Busca informações adicionais do usuário no Keycloak
- **handle-initial-signin.ts**: Processa o login inicial, extraindo roles e dados do usuário
- **refresh-access-token.ts**: Gerencia a renovação automática de tokens

## Configuração Inicial

### Variáveis de Ambiente Necessárias

```env
# ID do cliente Keycloak
AUTH_KEYCLOAK_ID=""

# Secret do cliente Keycloak
AUTH_KEYCLOAK_SECRET=""

# URL do servidor Keycloak com o realm
AUTH_KEYCLOAK_ISSUER="http://servidor:porta/realms/nome-do-realm"

# Chave secreta para assinatura de tokens
AUTH_SECRET=""

# URL base da aplicação (para callbacks)
NEXT_PUBLIC_APP_URL=""
```

### Inicialização do Provider

```typescript
const keycloakProvider = KeycloakProvider({
  clientId: env.AUTH_KEYCLOAK_ID,
  clientSecret: env.AUTH_KEYCLOAK_SECRET,
  issuer: env.AUTH_KEYCLOAK_ISSUER
})
```

## Estrutura de Tipos

### Token JWT
```typescript
interface JWT {
  accessToken: string
  refreshToken: string
  idToken: string
  accessTokenExpired: number
  refreshTokenExpired: number
  user: User
  error?: string
}
```

### Sessão
```typescript
interface Session {
  user: BaseUser & AdapterUser
  accessToken: string
  refreshToken: string
  error?: string
}
```

## Fluxos de Autenticação

### 1. Sign In

O processo de sign in é gerenciado pelo callback `signIn`, que:
- Valida as credenciais do usuário
- Redireciona para a rota não autenticada em caso de falha
- Mantém o usuário na URL atual em caso de sucesso

### 2. Sign Out

O processo de logout é mais complexo pois precisa encerrar a sessão tanto no NextAuth quanto no Keycloak:

#### Rota de Sign-Out (`/api/auth/sign-out/route.ts`)

```typescript
export async function GET(req: Request) {
  const token = await getToken({
    req,
    secret: env.AUTH_SECRET,
    secureCookie: false
  })

  if (!token) {
    return new Response('No Token', {
      status: 400
    })
  }

  // Constrói a URL de logout do Keycloak
  const url = `${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
  const params = new URLSearchParams({
    client_id: env.AUTH_KEYCLOAK_ID,
    id_token_hint: token.idToken as string,
    post_logout_redirect_uri: `${env.APP_URL}/api/auth/callback-sign-out`
  })

  const keycloakLogoutUrl = `${url}?${params}`

  redirect(keycloakLogoutUrl)
}
```

#### Callback de Sign-Out (`/api/auth/callback-sign-out/route.ts`)

```typescript
export async function GET() {
  await signOut()
}
```

O fluxo completo de logout funciona assim:

1. Usuário acessa `/api/auth/sign-out`
2. Sistema obtém o token atual
3. Redireciona para o endpoint de logout do Keycloak com:
   - client_id
   - id_token_hint (para validação)
   - URL de callback
4. Keycloak encerra a sessão e redireciona para o callback
5. Callback finaliza a sessão do NextAuth

### 3. Gerenciamento de Token

O sistema implementa um mecanismo completo de gerenciamento de tokens, incluindo:

- Armazenamento de tokens (access, refresh e id)
- Renovação automática de tokens expirados
- Extração de informações do usuário e roles

### 4. Sessão do Usuário

A sessão mantém as seguintes informações:
- Dados básicos do usuário (nome, email)
- CPF (obtido do preferred_username)
- Roles do usuário (extraídas do token)
- Token de acesso atual
- Status de erro (se houver)

## Renovação de Tokens

O sistema implementa renovação automática de tokens através do `refreshAccessToken`, que:

1. Verifica a validade do refresh token
2. Solicita novos tokens ao Keycloak
3. Atualiza a sessão com os novos tokens
4. Gerencia erros de renovação

## Proteção de Rotas

O middleware de autenticação protege as rotas baseado na configuração definida em `routingConfig`, que permite:

- Definir rotas públicas e protegidas
- Configurar redirecionamentos personalizados
- Validar permissões específicas por rota

## Tratamento de Erros

O sistema possui tratamento para diversos cenários de erro:

- Falha na obtenção de informações do usuário
- Erro na renovação de tokens
- Tokens expirados
- Permissões insuficientes

## Considerações de Segurança

1. Tokens são armazenados apenas em memória do servidor
2. Renovação automática inclui margem de segurança para expiração
3. Validação de roles é feita no servidor
4. Implementação de logout limpa corretamente a sessão no Keycloak



