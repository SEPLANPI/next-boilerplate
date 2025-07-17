# App Shell (`AppShell`)

## Como Usar

O componente `AppShell` fornece a estrutura visual principal para as áreas autenticadas da aplicação. Para usá-lo, você precisa:

1. **Configurar a barra lateral** em `src/config/sidebar.ts`
2. **Aplicar o layout** no seu arquivo de layout

### Exemplo Básico

```typescript
// src/config/sidebar.ts
import { SidebarConfig } from '@/types/sidebar'
import { Home, Users, Settings } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Meu App',
    logos: {
      expanded: '/logo-expanded.png',
      collapsed: '/logo-collapsed.png'
    }
  },
  sections: [
    {
      items: [
        {
          label: 'Visão Geral',
          href: '/:eventId/admin/visao-geral',
          icon: Home
        },
        {
          label: 'Usuários',
          href: '/:eventId/admin/usuarios',
          icon: Users,
          authorizedRoles: ['admin']
        }
      ]
    }
  ]
} as const
```

```typescript
// src/app/(admin)/layout.tsx
import { AppShell } from '@/components/layouts/app-shell';
import { sidebarConfig } from '@/config/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell config={sidebarConfig}>{children}</AppShell>;
}
```

### Exemplo com Grupos de Navegação

```typescript
// src/config/sidebar.ts
import { SidebarConfig } from '@/types/sidebar'
import { Home, Users, Settings, ClipboardList, Shield } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Sistema Admin',
    logos: {
      expanded: '/logo-expanded.png',
      collapsed: '/logo-collapsed.png'
    }
  },
  sections: [
    {
      items: [
        {
          label: 'Dashboard',
          href: '/:eventId/admin/dashboard',
          icon: Home
        }
      ]
    },
    {
      title: 'Gerenciamento',
      items: [
        {
          label: 'Administração',
          icon: Shield,
          authorizedRoles: ['admin'],
          children: [
            {
              label: 'Usuários',
              href: '/:eventId/admin/usuarios',
              icon: Users,
              match: '/admin/usuarios'
            },
            {
              label: 'Configurações',
              href: '/:eventId/admin/configuracoes',
              icon: Settings
            }
          ]
        }
      ]
    }
  ]
} as const
```

### Recursos Principais

- **Navegação Dinâmica**: Use `:paramName` nos links para rotas dinâmicas
- **Controle de Acesso**: Use `authorizedRoles` para controlar visibilidade por perfil
- **Grupos de Navegação**: Organize itens em grupos com `children`
- **Correspondência Customizada**: Use `match` para controle fino de estado ativo

## Visão Geral Técnica

O `AppShell` consiste em uma barra lateral de navegação dinâmica e uma área de conteúdo principal. A barra lateral é totalmente configurável através de um objeto, permitindo a definição de seções, itens de navegação, ícones, controle de acesso por perfil (RBAC) e rotas dinâmicas.

## Estrutura do Arquivo de Configuração

A configuração da barra lateral é definida em `src/config/sidebar.ts` e deve ser exportada como uma constante (`as const`) para garantir a inferência de tipo correta.

### Tipos de Configuração

```typescript
// Define a aparência e nome do app no topo da sidebar
interface AppConfig {
  name: string
  logos: {
    expanded: string // Logo para a sidebar expandida
    collapsed: string // Logo para a sidebar recolhida
  }
}

// Item de navegação final (um link clicável)
interface NavigationLeafItem {
  label: string // O texto exibido
  href: string // O caminho do link (pode conter parâmetros dinâmicos)
  icon: ComponentType<LucideProps> // Ícone de lucide-react
  match?: string // String para correspondência de rota ativa (opcional)
  authorizedRoles?: Role[] // Perfis que podem ver este item (opcional)
}

// Item de navegação pai (um grupo de sub-itens)
interface NavigationParentItem {
  label: string
  icon: ComponentType<LucideProps>
  children: NavigationLeafItem[] // Sub-itens
  authorizedRoles?: Role[] // Perfis que podem ver o grupo
}

// Tipo de união para um item de navegação
type NavigationItem = NavigationLeafItem | NavigationParentItem

// Seção da barra lateral
interface NavigationSection {
  title?: string // Título da seção (opcional)
  items: NavigationItem[]
}

// Objeto de configuração principal
interface SidebarConfig {
  app: AppConfig
  sections: NavigationSection[]
}
```

## Funcionalidades Detalhadas

### 1. Itens de Navegação

A configuração suporta dois tipos de itens: links diretos (`NavigationLeafItem`) e grupos de links (`NavigationParentItem`).

- **Links Diretos**: Um item de navegação padrão que renderiza um link.
- **Grupos**: Um item que agrupa `NavigationLeafItem`. O aninhamento é limitado a um nível.

### 2. Controle de Acesso (RBAC)

A propriedade `authorizedRoles` em qualquer item de navegação (`Leaf` ou `Parent`) controla sua visibilidade com base no perfil do usuário.

- **Implementação**: O componente `NavItem` utiliza internamente o `ClientPermissionGate`.
- **Propriedade**: `authorizedRoles?: Role[]`
- **Regras de Visibilidade**:
  - **Perfis Específicos**: Se `authorizedRoles` for uma lista de perfis (ex: `['admin', 'advisor']`), o item será visível apenas para usuários com pelo menos um desses perfis.
  - **Qualquer Usuário Autenticado**: Se `authorizedRoles` for omitido, o item será visível para qualquer usuário autenticado.
  - **Herança**: Em um `NavigationParentItem`, se o pai for oculto devido à falta de permissão, todos os seus filhos também serão ocultados, independentemente de suas próprias permissões.

### 3. Rotas Dinâmicas

A propriedade `href` pode conter parâmetros dinâmicos no formato `:paramName`. O componente substitui automaticamente o parâmetro pelo valor correspondente da URL atual.

- **Exemplo**:
  - `href` no config: `/:eventId/admin/visao-geral`
  - URL atual do navegador: `/123/admin/visao-geral`
  - O link renderizado apontará para `/123/admin/visao-geral`.

### 4. Correspondência de Rota Ativa (`match`)

Por padrão, um link é marcado como "ativo" se a URL atual começar com o `href` do item. A propriedade opcional `match` oferece um controle mais fino.

- **Caso de Uso**: Ativar um item de menu para múltiplos caminhos. Por exemplo, `/:eventId/admin/usuarios` e `/:eventId/admin/usuarios/novo` devem ambos ativar o item "Usuários".
- **Lógica**: Se `match` for fornecido, o link será considerado ativo se a URL atual **incluir** a string `match`.

## Exemplo de Implementação

```typescript
// src/config/sidebar.ts
import { SidebarConfig } from '@/types/sidebar'
import { Home, Users, Settings, ClipboardList, Shield } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Meu App',
    logos: {
      expanded: '/logo-expanded.png',
      collapsed: '/logo-collapsed.png'
    }
  },
  sections: [
    {
      // Seção sem título para itens de nível superior
      items: [
        {
          label: 'Visão Geral',
          href: '/:eventId/admin/visao-geral',
          icon: Home
          // Visível para todos os usuários logados, pois `authorizedRoles` é omitido
        }
      ]
    },
    {
      title: 'Gerenciamento',
      items: [
        {
          label: 'Propostas',
          href: '/:eventId/admin/propostas',
          icon: ClipboardList,
          authorizedRoles: ['admin', 'advisor'] // Visível para admins e advisors
        },
        {
          label: 'Administração',
          icon: Shield,
          authorizedRoles: ['admin'], // Grupo visível apenas para admins
          children: [
            {
              label: 'Usuários',
              href: '/:eventId/admin/usuarios',
              icon: Users,
              match: '/admin/usuarios' // Ativo para /usuarios, /usuarios/novo, etc.
            },
            {
              label: 'Configurações',
              href: '/:eventId/admin/configuracoes',
              icon: Settings
            }
          ]
        }
      ]
    }
  ]
} as const
```

## Uso na Aplicação

Para renderizar o layout, importe o componente `AppShell` e passe a configuração para a prop `config`.

```typescript
// Exemplo: src/app/(admin)/layout.tsx
import { AppShell } from '@/components/layouts/app-shell';
import { sidebarConfig } from '@/config/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell config={sidebarConfig}>{children}</AppShell>;
}
```

Este guia abrange a configuração e as funcionalidades do `AppShell`. Para detalhes de implementação, consulte o código-fonte em `src/components/layouts/app-shell`.
