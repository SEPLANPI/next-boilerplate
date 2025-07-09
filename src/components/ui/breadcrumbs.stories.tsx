import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Breadcrumbs, BreadcrumbItem } from './breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Componentes/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Breadcrumbs

Sistema de breadcrumbs usado em aplicações para indicar a localização atual.

**Funcionalidades:** Truncamento inteligente com tooltips, dropdown automático quando há muitos itens, responsivo
        `
      }
    }
  },
  argTypes: {
    items: {
      description: 'Array de itens do breadcrumb: BreadcrumbItem[]',
      control: { type: 'object' },
      table: {
        category: 'Essencial',
        type: { summary: 'BreadcrumbItem[]' }
      }
    },
    maxVisibleItems: {
      description: 'Máximo de itens visíveis antes do dropdown (padrão: 4)',
      control: { type: 'range', min: 3, max: 8, step: 1 },
      table: {
        category: 'Comportamento',
        defaultValue: { summary: '4' }
      }
    },
    maxItemWidth: {
      description: 'Largura máxima de cada item em CSS (padrão: "180px")',
      control: { type: 'select' },
      options: ['120px', '150px', '180px', '200px', '250px'],
      table: {
        category: 'Layout',
        defaultValue: { summary: '"180px"' }
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof Breadcrumbs>

// Generic examples following real-world patterns
const dashboardBasico: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projetos' }
]

const dashboardCompleto: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Departamento TI', href: '/dashboard/departments/ti' },
  { label: 'Projetos', href: '/dashboard/departments/ti/projects' },
  { label: 'Novo Projeto' }
]

const userArea: BreadcrumbItem[] = [
  { label: 'Minha Conta', href: '/account' },
  { label: 'Configurações', href: '/account/settings' },
  { label: 'Preferências' }
]

const navegacaoLonga: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Recursos Humanos', href: '/dashboard/hr' },
  { label: 'Funcionários', href: '/dashboard/hr/employees' },
  { label: 'Cadastros', href: '/dashboard/hr/employees/records' },
  { label: 'João Silva', href: '/dashboard/hr/employees/records/123' },
  { label: 'Editar Dados', href: '/dashboard/hr/employees/records/123/edit' },
  { label: 'Informações Bancárias' }
]

const textoLongo: BreadcrumbItem[] = [
  { label: 'Sistema de Gerenciamento Empresarial', href: '/system' },
  { label: 'Módulo de Controle de Qualidade', href: '/system/quality' },
  { label: 'Relatórios de Conformidade e Auditoria' }
]

export const UsoBasico: Story = {
  name: 'Uso Básico',
  args: {
    items: dashboardBasico,
    maxVisibleItems: 4,
    maxItemWidth: '180px'
  },
  argTypes: {
    separator: {
      control: {
        type: 'text'
      }
    },
    maxVisibleItems: {
      control: {
        type: 'range',
        min: 3,
        max: 8,
        step: 1
      }
    },
    maxItemWidth: {
      control: {
        type: 'select'
      },
      options: ['120px', '150px', '180px', '200px', '250px']
    }
  },
  render: (args) => (
    <Breadcrumbs
      items={args.items}
      maxVisibleItems={args.maxVisibleItems}
      maxItemWidth={args.maxItemWidth}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
Padrão mais comum em dashboards e painéis administrativos.

\`\`\`tsx
const items = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projetos' }
]

<Breadcrumbs items={items} />
\`\`\`

**Estrutura:** Seção → Página atual  
**Usado em:** Páginas de listagem, dashboards

**Controles interativos:** Use os controles abaixo para testar diferentes configurações de breadcrumbs.
        `
      }
    }
  }
}

export const NavegacaoHierarquica: Story = {
  name: 'Navegação Hierárquica',
  args: {
    items: dashboardCompleto
  },
  parameters: {
    docs: {
      description: {
        story: `
Navegação completa com contexto hierárquico organizacional.

\`\`\`tsx
const items = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Departamento TI', href: '/dashboard/departments/ti' },
  { label: 'Projetos', href: '/dashboard/departments/ti/projects' },
  { label: 'Novo Projeto' }
]
\`\`\`

**Estrutura:** Dashboard → Departamento → Seção → Página atual  
**Usado em:** Formulários, páginas de detalhes
        `
      }
    }
  }
}

export const DropdownAutomatico: Story = {
  name: 'Dropdown Automático',
  args: {
    items: navegacaoLonga,
    maxVisibleItems: 4
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstra o dropdown automático para navegações profundas.

\`\`\`tsx
<Breadcrumbs 
  items={longNavigation}
  maxVisibleItems={4}  // Força dropdown
/>
\`\`\`

**Como funciona:** Primeiro e último item sempre visíveis, itens do meio ficam no dropdown (⋯)  
**Usado em:** Formulários longos, edição detalhada
        `
      }
    }
  }
}

export const ControleLargura: Story = {
  name: 'Controle de Largura',
  args: {
    items: textoLongo,
    maxItemWidth: '120px'
  },
  parameters: {
    docs: {
      description: {
        story: `
Controla largura máxima para textos longos.

\`\`\`tsx
<Breadcrumbs 
  items={longTextItems}
  maxItemWidth="120px"  // Trunca textos longos
/>
\`\`\`

**Comportamento:** Texto truncado com "...", tooltip no hover mostra texto completo  
**Usado em:** Nomes longos de sistemas, títulos extensos
        `
      }
    }
  }
}

export const SeparadorCustomizado: Story = {
  name: 'Separador Customizado',
  args: {
    items: userArea,
    separator: '→'
  },
  parameters: {
    docs: {
      description: {
        story: `
Separador personalizado para diferentes contextos.

\`\`\`tsx
<Breadcrumbs 
  items={items}
  separator="→"  // ou ">", "|", etc.
/>
\`\`\`

**Opções comuns:** \`/\` (padrão), \`→\`, \`>\`, \`|\`, \`•\`
        `
      }
    }
  }
}

export const ExemplosPorArea: Story = {
  name: 'Exemplos por Área',
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-semibold">Dashboard Administrativo</h3>
        <Breadcrumbs items={dashboardCompleto} />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Área do Usuário</h3>
        <Breadcrumbs items={userArea} />
      </div>

      <div>
        <h3 className="mb-2 font-semibold">Portal Público</h3>
        <Breadcrumbs
          items={[
            { label: 'Portal', href: '/' },
            { label: 'Serviços', href: '/services' },
            { label: 'Solicitação' }
          ]}
        />
      </div>

      <div className="rounded bg-blue-50 p-4 text-sm">
        <strong>Cada área tem seu padrão:</strong> Dashboard (hierárquico),
        Usuário (configurações), Portal (processo)
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Padrões por área da aplicação.

**Dashboard:** Hierarquia organizacional completa  
**Usuário:** Área pessoal e configurações  
**Portal:** Fluxo de processo público
        `
      }
    }
  }
}
