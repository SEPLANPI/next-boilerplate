# Configuração de Rotas
O sistema de roteamento é configurado através de dois arquivos principais:

1. **Arquivo de Configuração**
   - Localização: `src/config/routing.ts`
   - Contém a configuração principal das rotas e permissões

2. **Arquivo de Tipos**
   - Localização: `src/types/routing.ts`
   - Define os tipos e interfaces do sistema de roteamento## Introdução

## Alterando Permissões Disponíveis

### 1. Definindo Novas Permissões

Para adicionar novas permissões, primeiro modifique o tipo `Role` no arquivo `src/types/roles.ts`:

```typescript
export type Role = 'admin' | 'user' | 'editor' | 'manager'
```

## Estrutura Básica

A configuração de rotas é definida através de um objeto que segue a interface `RoutingConfiguration`, contendo duas seções principais:

```typescript
interface RoutingConfiguration {
  defaults: {
    protection: 'public' | 'protected'
    permissions: Permission[]
    unauthorized: {
      defaultUnauthenticatedPath: string
      defaultAccessDeniedPath: string
      routeSpecificPaths?: {
        [routePath: string]: string
      }
    }
  }
  routes: RouteConfig[]
}
```

## Configurações Padrão (defaults)

### Propriedades

- `protection`: Define o tipo de proteção padrão para todas as rotas
  - `'public'`: Rotas acessíveis sem autenticação
  - `'protected'`: Rotas que requerem autenticação

- `permissions`: Array de permissões padrão requeridas para rotas protegidas

- `unauthorized`: Configurações para redirecionamento de usuários não autorizados
  - `defaultUnauthenticatedPath`: Rota padrão para usuários não autenticados
  - `defaultAccessDeniedPath`: Rota padrão para acesso negado
  - `routeSpecificPaths`: Objeto com redirecionamentos específicos por rota

## Configuração de Rotas Individuais

Cada rota pode ser configurada usando a interface `RouteConfig`:

```typescript
interface RouteConfig {
  path: string
  type?: 'public' | 'protected'
  permissions?: {
    required?: Permission[]
    accessDeniedPath?: string
    inherit?: boolean
  }
  exceptions?: {
    public?: string[]
    protected?: string[]
  }
}
```


### Propriedades

- `path`: Caminho da rota (suporta wildcard com `/*`)
- `type`: Tipo de proteção específico para a rota
- `permissions`: Configurações de permissões
  - `required`: Array de permissões necessárias
  - `accessDeniedPath`: Rota de redirecionamento para acesso negado
  - `inherit`: Se deve herdar permissões padrão. default `true`
- `exceptions`: Define exceções para a rota
  - `public`: Array de sub-rotas públicas
  - `protected`: Array de sub-rotas protegidas

## Exemplos de Uso

### Rota Pública com Sub-rotas Protegidas

```typescript
{
  path: '/dashboard',
  type: 'public',
  exceptions: {
    protected: ['/dashboard/admin/*']
  },
  permissions: {
    required: ['admin'],
    accessDeniedPath: '/dashboard'
  }
}
```


### Rota Protegida com Sub-rotas Públicas

```typescript
{
  path: '/app/*',
  type: 'protected',
  exceptions: {
    public: ['/app/preview', '/app/public-docs']
  },
  permissions: {
    required: ['admin']
  }
}
```


## Funcionamento do Sistema

O sistema utiliza três funções principais para gerenciar o acesso:

1. `matchRoute`: Verifica se um caminho corresponde a uma rota configurada
2. `checkPermissions`: Valida as permissões do usuário
3. `determineRouteAccess`: Determina o tipo de acesso e permissões necessárias para uma rota

O sistema primeiro verifica configurações específicas e depois aplica as configurações padrão quando necessário.

## Considerações Importantes

1. As rotas são avaliadas na ordem em que aparecem no array `routes`
2. Configurações mais específicas têm precedência sobre configurações mais gerais
3. Wildcards (`/*`) podem ser usados para configurar grupos de rotas
4. Permissões podem ser herdadas das configurações padrão

Esta configuração flexível permite criar diferentes níveis de acesso e proteção para sua aplicação, mantendo o código organizado e fácil de manter.