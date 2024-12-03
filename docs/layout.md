# Documentação do Layout do Painel

## Visão Geral

O layout do painel fornece uma barra lateral de navegação responsiva que suporta links únicos e grupos de navegação aninhados. O layout lida automaticamente com a responsividade móvel e inclui um menu de usuário.

## Notas Importantes

1. Ícones devem ser importados de `lucide-react`
2. Todos os hrefs devem ser caminhos absolutos
3. Grupos de navegação e links simples requerem um ícone, enquanto links aninhados não têm ícones
4. A configuração deve ser exportada com `as const` para garantir a inferência de tipo adequada

## Melhores Práticas

1. Agrupe itens de navegação relacionados sob títulos de seção significativos
2. Use ícones de forma consistente - ou todos os itens têm ícones ou nenhum
3. Mantenha os rótulos de navegação concisos
4. Limite o aninhamento a um nível para melhor UX
5. Considere a experiência móvel ao adicionar novos itens

## Localização do Arquivo

O arquivo de configuração da barra lateral deve ser criado em:
```typescript
src/config/sidebar.ts
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

A barra lateral é configurada através de um array `sidebarConfig` no seu arquivo de configuração. Cada item no array representa uma seção que pode conter vários itens de navegação.

```typescript
export const sidebarConfig: SidebarConfig = [
  {
    title: 'Título da Seção',
    items: [
      // Itens de navegação vão aqui
    ]
  }
] as const
```

### Exemplo de Implementação Completa

```typescript
import { SidebarConfig } from '@/types/sidebar'
import { Home, Settings, Users } from 'lucide-react'

export const sidebarConfig: SidebarConfig = [
  {
    title: 'Principal',
    items: [
      {
        label: 'Painel',
        href: '/',
        icon: Home
      }
    ]
  },
  {
    title: 'Administração',
    items: [
      {
        label: 'Configurações',
        icon: Settings,
        items: [
          {
            label: 'Usuários',
            href: '/configuracoes/usuarios'
          },
          {
            label: 'Permissões',
            href: '/configuracoes/permissoes'
          }
        ]
      }
    ]
  }
] as const
```

## Definições de Tipo

A configuração da barra lateral é estritamente tipada usando TypeScript. Os principais tipos são definidos em:

```typescript
import { LucideProps } from 'lucide-react'
import { ComponentType } from 'react'

export interface BaseNavigationItem {
  label: string
}

export interface NavigationLink extends BaseNavigationItem {
  href: string
  items?: never
  icon?: ComponentType<LucideProps>
}

export interface NavigationChild extends BaseNavigationItem {
  href: string
}

export interface NavigationGroup extends BaseNavigationItem {
  items: readonly NavigationChild[]
  href?: never
  icon: ComponentType<LucideProps>
}

export type NavigationItem = NavigationLink | NavigationGroup

export interface NavigationSection {
  title: string
  items: NavigationItem[]
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
        <span className="font-montserrat text-xl font-semibold">
          GOV<span className="font-extrabold text-green-900">PI</span>
        </span>
        <Divider orientation="vertical" />
        <span className="font-medium">Piauí 365</span>
      </div>
      <nav>
        {sidebarConfig.map((section) => (
          <section className="mb-4" key={section.title}>
            <span className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">
              {section.title}
            </span>
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

O componente `NavItem` lida com a renderização de itens de navegação individuais:

```typescript
'use client'

import { NavLink } from '@mantine/core'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NavigationItem } from '@/types/sidebar'
import { isNavigationGroup } from '@/config/sidebar'

interface NavItemProps {
  item: NavigationItem
}

const NAV_LINK_STYLES = {
  root: '[&:not([data-active])]:text-gray-700 font-medium text-sm w-auto mb-1 -mx-2 p-2 [&:not([data-active])]:hover:bg-gray-200 rounded'
}

export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname()
  const IconComponent = item.icon ? <item.icon className="size-4" /> : null

  if (isNavigationGroup(item)) {
    return (
      <NavLink
        label={item.label}
        leftSection={IconComponent}
        childrenOffset={16}
        classNames={NAV_LINK_STYLES}
      >
        {item.items.map((childItem) => (
          <Link href={childItem.href} key={childItem.label}>
            <NavLink
              component="span"
              active={pathname.endsWith(childItem.href)}
              classNames={NAV_LINK_STYLES}
              label={childItem.label}
            />
          </Link>
        ))}
      </NavLink>
    )
  }

  return (
    <Link href={item.href}>
      <NavLink
        component="span"
        active={pathname.endsWith(item.href)}
        leftSection={IconComponent}
        classNames={NAV_LINK_STYLES}
        key={item.label}
        label={item.label}
      />
    </Link>
  )
}
```

## Suporte Móvel

O layout lida automaticamente com visualizações móveis através do componente MobileNav:

```typescript
'use client'
import { useDisclosure } from '@mantine/hooks'
import { Drawer, UnstyledButton } from '@mantine/core'
import { Menu } from 'lucide-react'
import { MainNav } from './main-nav'

export function MobileNav() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer.Root size="xs" opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Body className="h-full p-0">
            <MainNav />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <UnstyledButton onClick={open}>
        <Menu className="size-5" />
      </UnstyledButton>
    </>
  )
}
```

## Estilização

A navegação usa uma combinação do componente `NavLink` do Mantine e classes CSS personalizadas do Tailwind. Os estilos padrão podem ser personalizados modificando o objeto `NAV_LINK_STYLES` no componente NavItem.
```
