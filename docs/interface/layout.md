# Documentação do Layout do Painel

## Visão Geral

O layout do painel fornece uma barra lateral de navegação responsiva e colapsável que pode ser configurada através de um objeto de configuração. A barra lateral suporta múltiplas seções com títulos opcionais e itens de navegação com ícones.

## Notas Importantes

1. Todos os ícones devem ser importados de `lucide-react`
2. Todos os hrefs devem ser caminhos absolutos
3. A configuração deve ser exportada com `as const`
4. O estado colapsado da barra lateral é persistido no localStorage
5. As seções podem ter títulos opcionais que se adaptam ao estado colapsado

## Melhores Práticas

1. Agrupe itens de navegação relacionados sob títulos de seção significativos
2. Use ícones de forma consistente - ou todos os itens têm ícones ou nenhum
3. Mantenha os rótulos de navegação concisos
4. Limite o aninhamento a um nível para melhor UX
5. Considere a experiência móvel ao adicionar novos itens

## Localização do Arquivo

O arquivo de configuração da barra lateral deve ser criado em:

```typescript
src / config / sidebar.ts
```

## Tipos de Navegação

Existem dois tipos de itens de navegação:

1. **Links Simples**: Links de navegação diretos com ícones opcionais
2. **Grupos de Navegação**: Itens de navegação aninhados com sub-itens

### Exemplo de Link Simples

```typescript
{
  label: 'Painel',
  href: '/painel',
  icon: HomeIcon // Componente de ícone Lucide opcional
}
```

### Exemplo de Grupo de Navegação

```typescript
{
  label: 'Configurações',
  icon: Settings,
  items: [
    {
      label: 'Perfil',
      href: '/configuracoes/perfil'
    },
    {
      label: 'Segurança',
      href: '/configuracoes/seguranca'
    }
  ]
}
```

## Configuração

### Estrutura Básica

A barra lateral é configurada através de um objeto `sidebarConfig` que contém configurações do aplicativo e seções de navegação:

```typescript
export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Nome do App',
    logo: '/caminho/do/logo.png' // opcional
  },
  sections: [
    {
      title: 'Título da Seção', // opcional
      items: [
        {
          label: 'Item',
          href: '/caminho',
          icon: IconComponent
        }
      ]
    }
  ]
} as const
```

### Tipos

```typescript
interface AppConfig {
  name: string
  logo?: string
}

interface NavigationItem {
  label: string
  href: string
  icon: ComponentType<LucideProps>
}

interface NavigationSection {
  title?: string
  items: NavigationItem[]
}

interface SidebarConfig {
  app: AppConfig
  sections: NavigationSection[]
}
```

## Funcionalidades

### Barra Lateral Colapsável

A barra lateral pode ser alternada entre os estados expandido e colapsado:

- Expandida: 256px de largura (w-64)
- Colapsada: 80px de largura (w-20)

O estado é persistido localmente usando o hook `useLocalStorage` do Mantine.

### Suporte a Logo

- Aceita uma imagem de logo através da propriedade `app.logo`
- Fallback para um texto estilizado quando nenhum logo é fornecido
- Logo é redimensionado automaticamente quando a barra está colapsada

### Seções de Navegação

- Suporta múltiplas seções
- Títulos de seção são opcionais
- Seções são separadas por divisores quando colapsadas
- Cada item requer um ícone do Lucide React

## Exemplo de Implementação

```typescript
import { SidebarConfig } from '@/types/sidebar'
import { Home, Users, Settings } from 'lucide-react'

export const sidebarConfig: SidebarConfig = {
  app: {
    name: 'Meu App',
    logo: '/logo.png'
  },
  sections: [
    {
      items: [
        {
          label: 'Dashboard',
          href: '/',
          icon: Home
        }
      ]
    },
    {
      title: 'Gerenciamento',
      items: [
        {
          label: 'Usuários',
          href: '/usuarios',
          icon: Users
        },
        {
          label: 'Configurações',
          href: '/configuracoes',
          icon: Settings
        }
      ]
    }
  ]
} as const
```

## Uso no Layout

```typescript
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { sidebarConfig } from '@/config/sidebar'

export default function Dashboard({ children }) {
  return <DashboardLayout config={sidebarConfig}>{children}</DashboardLayout>
}
```

## Componentes

### Componente MainNav

O componente `MainNav` renderiza a navegação da barra lateral:

```typescript
import { Divider } from '@mantine/core'
import { NavItem } from './nav-item'
import { sidebarConfig } from '@/config/sidebar'

export function MainNav() {
  return (
    <aside className="h-full w-full border-r bg-gray-50 p-4">
      <div className="mb-4 flex items-center space-x-2">
        <span className=" text-xl font-semibold">
          GOV<span className="font-extrabold text-green-900">PI</span>
        </span>
        <Divider orientation="vertical" />
        <span className="font-medium">Piauí 365</span>
      </div>
      <nav>
        {sidebarConfig.sections.map((section) => (
          <section className="mb-4" key={section.title}>
            {section.title && (
              <span className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">
                {section.title}
              </span>
            )}
            {section.items.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </section>
        ))}
      </nav>
    </aside>
  )
}
```

### Componente NavItem

O componente `NavItem` lida com a renderização de itens de navegação individuais e suporta o estado colapsado:

```typescript
interface NavItemProps {
  item: NavigationItem
  collapsed: boolean
}

const NAV_LINK_BASE_STYLES =
  'rounded flex items-center text-gray-700 [&:not([data-active=true])]:hover:bg-gray-200 data-[active=true]:text-govBlue-600 data-[active=true]:bg-govBlue-50'

const NAV_LINK_STYLES = {
  root: `${NAV_LINK_BASE_STYLES} block whitespace-nowrap no-underline space-x-2 font-medium text-sm w-full px-3 py-2 font-normal data-[active=true]:font-semibold`
}

const NAV_LINK_COLLAPSED_STYLES = {
  root: `${NAV_LINK_BASE_STYLES} justify-center size-9`
}

export function NavItem({ item, collapsed }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname.endsWith(item.href)
  const IconComponent = item.icon ? <item.icon className="size-4" /> : null

  if (collapsed) {
    return (
      <Tooltip label={item.label} position="right" withArrow openDelay={300}>
        <Anchor
          href={item.href}
          component={Link}
          data-active={isActive}
          classNames={NAV_LINK_COLLAPSED_STYLES}
          key={item.label}
        >
          {IconComponent}
        </Anchor>
      </Tooltip>
    )
  }

  return (
    <Anchor
      href={item.href}
      component={Link}
      data-active={isActive}
      classNames={NAV_LINK_STYLES}
      key={item.label}
    >
      {IconComponent}
      <span>{item.label}</span>
    </Anchor>
  )
}
```
