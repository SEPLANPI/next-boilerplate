# 🛣️ Configuração de Rotas

## Índice

- [Como Configurar](#como-configurar)
- [Arquivo de Configuração](#arquivo-de-configuração)
- [Exemplos Práticos](#exemplos-práticos)
- [Tipos Disponíveis](#tipos-disponíveis)
- [Padrões de URL](#padrões-de-url)
- [Customização para Seu Sistema](#customização-para-seu-sistema)

## Como Configurar

O arquivo `@/config/routing` define quais rotas são protegidas e que roles podem acessá-las.

**Por padrão, todas as rotas são públicas** - você deve configurar explicitamente as protegidas.

## Arquivo de Configuração

```typescript
// src/config/routing.ts
import { RoutingConfiguration } from '@/types/routing'

export const routingConfig: RoutingConfiguration = {
  defaults: {
    isPublic: true, // Padrão: rotas são públicas
    requiredRoles: [], // Padrão: sem roles necessários
    redirects: {
      loginPagePath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/acesso-negado',
      accessDeniedPageByRequiredRole: {}
    }
  },
  routes: [
    {
      path: '/:eventId/admin/*', // Padrão com parâmetro
      isPublic: false, // Protegida
      requiredRoles: ['admin'], // Apenas admins
      overrides: [
        {
          path: '/:eventId/admin/acesso-negado',
          isPublic: true // Exceção: página de erro é pública
        }
      ]
    },
    {
      path: '/conselheiros/*', // Padrão simples
      isPublic: false,
      requiredRoles: ['advisor'],
      overrides: [
        {
          path: '/conselheiros/acesso-negado',
          isPublic: true
        },
        {
          path: '/conselheiros/cadastro/*' // Sem config = herda do pai
        }
      ]
    }
  ]
}
```

## Exemplos Práticos

### Sistema Administrativo

```typescript
export const routingConfig: RoutingConfiguration = {
  defaults: {
    isPublic: true,
    requiredRoles: [],
    redirects: {
      loginPagePath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/acesso-negado'
    }
  },
  routes: [
    {
      path: '/admin/*',
      isPublic: false,
      requiredRoles: ['admin']
    },
    {
      path: '/dashboard/*',
      isPublic: false,
      requiredRoles: ['admin', 'manager']
    },
    {
      path: '/reports/*',
      isPublic: false,
      requiredRoles: ['admin', 'manager', 'operator']
    }
  ]
}
```

### Sistema com Múltiplos Níveis

```typescript
export const routingConfig: RoutingConfiguration = {
  routes: [
    {
      path: '/app/*',
      isPublic: false,
      requiredRoles: [], // Qualquer usuário logado
      overrides: [
        {
          path: '/app/admin/*',
          requiredRoles: ['admin'] // Mais restritivo
        },
        {
          path: '/app/public/*',
          isPublic: true // Menos restritivo
        }
      ]
    }
  ]
}
```

### Sistema por Departamento

```typescript
export const routingConfig: RoutingConfiguration = {
  routes: [
    {
      path: '/vendas/*',
      isPublic: false,
      requiredRoles: ['sales']
    },
    {
      path: '/rh/*',
      isPublic: false,
      requiredRoles: ['hr']
    },
    {
      path: '/financeiro/*',
      isPublic: false,
      requiredRoles: ['finance']
    },
    {
      path: '/gerencia/*',
      isPublic: false,
      requiredRoles: ['sales', 'hr', 'finance'] // Múltiplos roles
    }
  ]
}
```

## Tipos Disponíveis

### RouteConfig

```typescript
interface RouteConfig {
  path: string // Padrão da URL
  isPublic?: boolean // Se não definido, usa default
  requiredRoles?: Role[] // Roles necessários
  inheritRoles?: boolean // Herdar roles do pai
  overrides?: RouteConfig[] // Exceções mais específicas
}
```

### RoutingConfiguration

```typescript
interface RoutingConfiguration {
  defaults: {
    isPublic: boolean
    requiredRoles: Role[]
    redirects: AuthRedirectConfig
  }
  routes: RouteConfig[]
}
```

### AuthRedirectConfig

```typescript
interface AuthRedirectConfig {
  loginPagePath: string // Onde fazer login
  defaultAccessDeniedPath: string // Página padrão de acesso negado
  accessDeniedPageByRequiredRole: {
    // Páginas específicas por role
    [role in Role]?: string
  }
}
```

## Padrões de URL

### Wildcards

```typescript
{
  path: '/admin/*',           // Corresponde a /admin/users, /admin/config, etc.
  path: '/api/v1/*',          // Corresponde a /api/v1/users, /api/v1/auth, etc.
  path: '/*',                 // Corresponde a qualquer rota (cuidado!)
}
```

### Parâmetros

```typescript
{
  path: '/:eventId/admin/*',  // Corresponde a /123/admin/users, /abc/admin/config
  path: '/users/:id',         // Corresponde a /users/123, /users/abc
  path: '/:category/:id/*',   // Corresponde a /events/123/edit
}
```

### Rotas Exatas

```typescript
{
  path: '/admin',             // Apenas /admin (sem barra final)
  path: '/login',             // Apenas /login
  path: '/dashboard',         // Apenas /dashboard
}
```

## Customização para Seu Sistema

### 1. Definir Roles

```typescript
// src/types/roles.ts
export type Role = 'admin' | 'manager' | 'user' | 'guest'
```

### 2. Configurar Rotas

```typescript
// src/config/routing.ts
export const routingConfig: RoutingConfiguration = {
  defaults: {
    isPublic: true, // Seu padrão
    requiredRoles: [],
    redirects: {
      loginPagePath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/sem-permissao', // Sua página
      accessDeniedPageByRequiredRole: {
        admin: '/admin/acesso-negado', // Página específica para admin
        user: '/user/upgrade-needed' // Página específica para user
      }
    }
  },
  routes: [
    // Suas rotas específicas
    {
      path: '/meu-sistema/*',
      isPublic: false,
      requiredRoles: ['user']
    }
  ]
}
```

### 3. Solicitar Roles à ETIPI

Para configurar novos roles no Keycloak:

**Template de solicitação:**

```
Assunto: Configuração de Roles - [Nome do Sistema]

Prezado time ETIPI,

Solicito configuração dos seguintes roles:

- Client ID: meu-sistema-cliente
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

### 4. Testar Configuração

```typescript
// Teste cada rota configurada
console.log('Testando configuração de rotas:')

// Para cada rota protegida, verifique:
// 1. Usuário não logado → redirecionado para login
// 2. Usuário sem role → redirecionado para acesso negado
// 3. Usuário com role → acesso permitido
```

## Como o Middleware Usa Esta Configuração

O middleware carrega esta configuração e:

1. **Encontra a rota** que corresponde ao path
2. **Verifica overrides** mais específicos
3. **Determina se é pública** ou requer autenticação
4. **Valida roles necessários** contra roles do usuário
5. **Redireciona conforme** configuração de redirects

> **Importante**: Esta configuração é carregada pelo middleware em `@/middleware.ts`. Mudanças aqui afetam toda a proteção de rotas da aplicação.
