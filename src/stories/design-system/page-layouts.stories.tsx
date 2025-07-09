import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import {
  PageHeader,
  HeaderRow,
  HeaderActions,
  HeaderContent
} from '@/components/layouts/dashboard-layout'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import {
  FilterManager,
  FilterGroup,
  StaticFilterPopover,
  AsyncFilterPopover
} from '@/components/ui/filters'
import {
  Button,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Badge,
  Avatar
} from '@mantine/core'
import {
  Plus,
  Download,
  BarChart3,
  User,
  FileSpreadsheet,
  Edit,
  CheckCircle,
  Settings
} from 'lucide-react'
import { SearchInput } from '@/components/ui/search-input'
import {
  NavigationTabsContainer,
  NavigationTabs,
  NavigationTabsItem
} from '@/components/ui/navigation-tabs'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'
import { Card } from '@/components/ui/card'

const meta: Meta = {
  title: 'Padrões/Layout de Páginas Administrativas',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Layout de Páginas Administrativas

Sistema de layout usado nas páginas administrativas da aplicação. Estes exemplos mostram a progressão dos padrões de header e layouts completos.

## Organização dos Padrões

### 1. Header Básico
- Breadcrumbs + Ações principais
- Usado em: Visão Geral, páginas simples

### 2. Header com Filtros  
- Breadcrumbs + SearchInput + Filtros
- Usado em: Listagens (Conselheiros, Propostas)

### 3. Header com Tabs
- Breadcrumbs + Ações + NavigationTabs
- Usado em: Visualização de detalhes

### 4. Layout Completo
- Header + Cards + Tabela + Paginação
- Usado em: Dashboards operacionais, gestão complexa
        `
      }
    }
  },
  argTypes: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj

// Mock data baseado nos dados reais das páginas admin
const statusOptions = [
  { id: 'aprovada', label: 'Aprovada' },
  { id: 'pendente', label: 'Pendente' },
  { id: 'rejeitada', label: 'Rejeitada' },
  { id: 'em_analise', label: 'Em Análise' }
]

const eixosOptions = [
  { id: 'saude', label: 'Saúde' },
  { id: 'educacao', label: 'Educação' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'mobilidade', label: 'Mobilidade Urbana' },
  { id: 'meio_ambiente', label: 'Meio Ambiente' }
]

// Função async simulada para filtros
const loadEixosOptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return eixosOptions
}

// 1. Header Básico
export const HeaderBasico: Story = {
  name: '1. Header Básico',
  render: () => (
    <div className="flex min-h-screen flex-col gap-4 p-6">
      <PageHeader>
        <HeaderRow>
          <HeaderContent>
            <Breadcrumbs items={[{ label: 'Visão Geral' }]} />
          </HeaderContent>
          <HeaderActions>
            <Button leftSection={<Download size={16} />} variant="default">
              Exportar
            </Button>
          </HeaderActions>
        </HeaderRow>
      </PageHeader>

      <div className="flex flex-col items-center justify-center p-20">
        <BarChart3 size={64} className="mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900">
          Conteúdo da Página
        </h2>
        <p className="text-gray-500">
          Header básico com breadcrumbs e ação principal
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Header mais simples com breadcrumbs e ações principais.

\`\`\`tsx
// src/app/(admin)/[eventId]/admin/visao-geral/page.tsx
<PageHeader>
  <HeaderRow>
    <HeaderContent>
      <Breadcrumbs items={[{ label: 'Visão Geral' }]} />
    </HeaderContent>
    <HeaderActions>
      <Button>Exportar</Button>
    </HeaderActions>
  </HeaderRow>
</PageHeader>
\`\`\`

**Usado em:** Visão Geral, páginas simples sem filtros
**Características:** Uma única linha com breadcrumbs e ações
        `
      }
    }
  }
}

// 2. Header com Filtros
export const HeaderComFiltros: Story = {
  name: '2. Header com Filtros',
  render: () => (
    <div className="flex min-h-screen flex-col gap-4 p-6">
      <PageHeader>
        <HeaderRow>
          <HeaderContent>
            <Breadcrumbs items={[{ label: 'Conselheiros' }]} />
          </HeaderContent>
        </HeaderRow>
        <HeaderRow>
          <HeaderContent>
            <SearchInput placeholder="Pesquisar por nome ou CPF" />
            <StaticFilterPopover
              searchParamKey="status"
              options={statusOptions}
              showSearch={false}
              showSelectedOnTop={true}
            >
              Status
            </StaticFilterPopover>
            <AsyncFilterPopover
              filterId="regiao"
              searchParamKey="regiao"
              loadOptions={async () => [
                { id: 'norte', label: 'Norte' },
                { id: 'sul', label: 'Sul' },
                { id: 'centro', label: 'Centro' },
                { id: 'leste', label: 'Leste' }
              ]}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              showSearch={true}
            >
              Região
            </AsyncFilterPopover>
            <FilterManager
              onApply={() => console.log('Filtros aplicados!')}
              buttonText="Mais filtros"
            >
              <FilterGroup
                title="Eixo Temático"
                searchParamKey="eixo"
                filterId="eixos-header"
                loadOptions={loadEixosOptions}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.id}
                showSearch={true}
              />
              <FilterGroup
                title="Data de Cadastro"
                searchParamKey="data"
                options={[
                  { id: 'hoje', label: 'Hoje' },
                  { id: 'semana', label: 'Esta semana' },
                  { id: 'mes', label: 'Este mês' }
                ]}
              />
            </FilterManager>
          </HeaderContent>
        </HeaderRow>
      </PageHeader>

      <div className="flex flex-col items-center justify-center p-20">
        <Settings size={64} className="mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900">Lista Filtrada</h2>
        <p className="text-gray-500">
          Header com busca, filtros visíveis e FilterManager
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Header com sistema completo de filtros para listagens.

\`\`\`tsx
// src/app/(admin)/[eventId]/admin/conselheiros/cadastros/page.tsx
<PageHeader>
  <HeaderRow>
    <HeaderContent>
      <Breadcrumbs items={items} />
    </HeaderContent>
  </HeaderRow>
  <HeaderRow>
    <HeaderContent>
      <SearchInput placeholder="Pesquisar por nome ou CPF" />
      <StaticFilterPopover>Status</StaticFilterPopover>
      <AsyncFilterPopover>Região</AsyncFilterPopover>
      <FilterManager>
        <FilterGroup title="Eixo Temático" />
        <FilterGroup title="Data de Cadastro" />
      </FilterManager>
    </HeaderContent>
  </HeaderRow>
</PageHeader>
\`\`\`

**Usado em:** Conselheiros, Propostas, Convites, Avaliações
**Características:** 
- Primeira linha: Breadcrumbs
- Segunda linha: SearchInput + filtros importantes + FilterManager
        `
      }
    }
  }
}

// 3. Header com Tabs
export const HeaderComTabs: Story = {
  name: '3. Header com Tabs',
  render: () => (
    <div className="flex min-h-screen flex-col gap-4 p-6">
      <PageHeader>
        <HeaderRow>
          <HeaderContent>
            <Breadcrumbs
              items={[
                {
                  label: 'Conselheiros',
                  href: '/admin/conselheiros/cadastros'
                },
                { label: 'Ana Silva Santos' }
              ]}
            />
          </HeaderContent>
          <HeaderActions>
            <Button leftSection={<Edit size={16} />} variant="default">
              Editar
            </Button>
            <Button leftSection={<CheckCircle size={16} />}>Validar</Button>
          </HeaderActions>
        </HeaderRow>

        <NavigationTabsContainer basePath="/admin/conselheiros/cadastros/123">
          <NavigationTabs>
            <NavigationTabsItem
              value="dados"
              leftSection={<User className="size-4" />}
            >
              Dados Pessoais
            </NavigationTabsItem>
            <NavigationTabsItem
              value="propostas"
              leftSection={<FileSpreadsheet className="size-4" />}
            >
              Propostas
            </NavigationTabsItem>
          </NavigationTabs>
        </NavigationTabsContainer>
      </PageHeader>

      <div className="flex flex-col items-center justify-center p-20">
        <User size={64} className="mb-4 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900">Dados Pessoais</h2>
        <p className="text-gray-500">
          Header com navegação por tabs e ações contextuais
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Header com navegação por tabs para visualização de detalhes.

\`\`\`tsx
// src/app/(admin)/[eventId]/admin/conselheiros/cadastros/[id]/layout.tsx
<PageHeader>
  <HeaderRow>
    <HeaderContent>
      <Breadcrumbs items={breadcrumbs} />
    </HeaderContent>
    <HeaderActions>
      <Button>Editar</Button>
      <Button>Validar</Button>
    </HeaderActions>
  </HeaderRow>

  <NavigationTabsContainer basePath="/admin/conselheiros/cadastros/123">
    <NavigationTabs>
      <NavigationTabsItem value="dados" leftSection={<User />}>
        Dados Pessoais
      </NavigationTabsItem>
      <NavigationTabsItem value="propostas" leftSection={<FileSpreadsheet />}>
        Propostas
      </NavigationTabsItem>
    </NavigationTabs>
  </NavigationTabsContainer>
</PageHeader>
\`\`\`

**Usado em:** Visualização de conselheiros, detalhes de propostas
**Características:**
- Breadcrumbs + ações na primeira linha
- NavigationTabs com ícones na segunda linha
        `
      }
    }
  }
}

// 4. Layout Completo
export const LayoutCompleto: Story = {
  name: '4. Layout Completo (Cards + Tabela + Paginação)',
  render: () => (
    <div className="flex min-h-screen flex-col gap-4 p-6">
      <PageHeader>
        <HeaderRow>
          <HeaderContent>
            <Breadcrumbs
              items={[
                { label: 'Admin', href: '/admin' },
                { label: 'Evento Diálogos 2024', href: '/admin/evento-2024' },
                { label: 'Propostas', href: '/admin/evento-2024/propostas' },
                { label: 'Gestão Avançada' }
              ]}
            />
          </HeaderContent>
          <HeaderActions>
            <Button leftSection={<Download size={16} />} variant="default">
              Exportar Excel
            </Button>
            <Button leftSection={<Settings size={16} />} variant="default">
              Configurações
            </Button>
            <Button leftSection={<Plus size={16} />}>Nova Proposta</Button>
          </HeaderActions>
        </HeaderRow>

        <HeaderRow>
          <HeaderContent>
            <SearchInput placeholder="Buscar por título, autor ou número..." />

            <StaticFilterPopover
              searchParamKey="status"
              options={statusOptions}
              showSearch={false}
              showSelectedOnTop={true}
            >
              Status
            </StaticFilterPopover>

            <AsyncFilterPopover
              filterId="eixos-completo"
              searchParamKey="eixos"
              loadOptions={loadEixosOptions}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              showSearch={true}
              showSelectedOnTop={false}
            >
              Eixos
            </AsyncFilterPopover>

            <FilterManager
              onApply={() => console.log('Filtros aplicados!')}
              buttonText="Filtros Avançados"
            >
              <FilterGroup
                title="Região"
                searchParamKey="regiao"
                options={[
                  { id: 'norte', label: 'Norte' },
                  { id: 'sul', label: 'Sul' },
                  { id: 'centro', label: 'Centro' },
                  { id: 'leste', label: 'Leste' },
                  { id: 'oeste', label: 'Oeste' }
                ]}
                showSearch={false}
              />
              <FilterGroup
                title="Orçamento"
                searchParamKey="orcamento"
                options={[
                  { id: 'ate_10k', label: 'Até R$ 10.000' },
                  { id: '10k_50k', label: 'R$ 10.000 - R$ 50.000' },
                  { id: '50k_100k', label: 'R$ 50.000 - R$ 100.000' },
                  { id: 'acima_100k', label: 'Acima de R$ 100.000' }
                ]}
              />
              <FilterGroup
                title="Data de Submissão"
                searchParamKey="data_submissao"
                options={[
                  { id: 'ultima_semana', label: 'Última semana' },
                  { id: 'ultimo_mes', label: 'Último mês' },
                  { id: 'ultimos_3_meses', label: 'Últimos 3 meses' },
                  { id: 'mais_antigo', label: 'Mais antigo' }
                ]}
              />
            </FilterManager>
          </HeaderContent>
        </HeaderRow>
      </PageHeader>

      {/* Cards de Métricas */}
      <Card.List>
        <Card.Root>
          <Card.Header>
            <Card.Title>Total de Propostas</Card.Title>
            <Card.Icon>
              <FileSpreadsheet className="size-4" />
            </Card.Icon>
          </Card.Header>
          <Card.Content>
            <Card.Value>1,247</Card.Value>
          </Card.Content>
          <Card.Footer>
            <Card.Trend value={12} />
            <Card.Description>vs mês anterior</Card.Description>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Aprovadas</Card.Title>
            <Card.Icon>
              <CheckCircle className="size-4" />
            </Card.Icon>
          </Card.Header>
          <Card.Content>
            <Card.Value>834</Card.Value>
          </Card.Content>
          <Card.Footer>
            <Card.Trend value={8} />
            <Card.Description>67% aprovação</Card.Description>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Em Análise</Card.Title>
            <Card.Icon>
              <Settings className="size-4" />
            </Card.Icon>
          </Card.Header>
          <Card.Content>
            <Card.Value>298</Card.Value>
          </Card.Content>
          <Card.Footer>
            <Card.Trend value={-5} />
            <Card.Description>aguardando revisão</Card.Description>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Orçamento Total</Card.Title>
            <Card.Icon>
              <BarChart3 className="size-4" />
            </Card.Icon>
          </Card.Header>
          <Card.Content>
            <Card.Value prefix="R$">2.4M</Card.Value>
          </Card.Content>
          <Card.Footer>
            <Card.Trend value={15} />
            <Card.Description>para propostas aprovadas</Card.Description>
          </Card.Footer>
        </Card.Root>
      </Card.List>

      {/* Tabela Completa */}
      <Table className="w-full table-fixed" highlightOnHover>
        <TableThead>
          <TableTr>
            <TableTh>#</TableTh>
            <TableTh>Proposta</TableTh>
            <TableTh>Eixo</TableTh>
            <TableTh>Status</TableTh>
            <TableTh>Autor</TableTh>
            <TableTh>Orçamento</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          <TableTr>
            <TableTd>
              <span className="font-semibold">001</span>
            </TableTd>
            <TableTd>
              <div className="flex flex-col">
                <span className="font-medium text-content-emphasis">
                  Implementação de ciclovias na região central
                </span>
                <span className="text-sm text-gray-500">
                  Criação de 15km de ciclovias conectando pontos estratégicos
                </span>
              </div>
            </TableTd>
            <TableTd>
              <span className="rounded-full border p-1.5 text-xs">
                Mobilidade Urbana
              </span>
            </TableTd>
            <TableTd>
              <Badge color="green" variant="light" radius="xs">
                Aprovada
              </Badge>
            </TableTd>
            <TableTd>
              <div className="flex items-center gap-2">
                <Avatar
                  size="sm"
                  name="Ana Silva"
                  color="initials"
                  variant="filled"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Ana Silva</span>
                  <span className="text-xs text-gray-500">Região Norte</span>
                </div>
              </div>
            </TableTd>
            <TableTd>
              <span className="font-medium text-green-600">R$ 450.000</span>
            </TableTd>
          </TableTr>

          <TableTr>
            <TableTd>
              <span className="font-semibold">002</span>
            </TableTd>
            <TableTd>
              <div className="flex flex-col">
                <span className="font-medium text-content-emphasis">
                  Ampliação do atendimento em postos de saúde
                </span>
                <span className="text-sm text-gray-500">
                  Extensão do horário de funcionamento até 22h
                </span>
              </div>
            </TableTd>
            <TableTd>
              <span className="rounded-full border p-1.5 text-xs">Saúde</span>
            </TableTd>
            <TableTd>
              <Badge color="yellow" variant="light" radius="xs">
                Pendente
              </Badge>
            </TableTd>
            <TableTd>
              <div className="flex items-center gap-2">
                <Avatar
                  size="sm"
                  name="João Santos"
                  color="initials"
                  variant="filled"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">João Santos</span>
                  <span className="text-xs text-gray-500">Região Sul</span>
                </div>
              </div>
            </TableTd>
            <TableTd>
              <span className="font-medium text-blue-600">R$ 120.000</span>
            </TableTd>
          </TableTr>

          <TableTr>
            <TableTd>
              <span className="font-semibold">003</span>
            </TableTd>
            <TableTd>
              <div className="flex flex-col">
                <span className="font-medium text-content-emphasis">
                  Criação de biblioteca comunitária
                </span>
                <span className="text-sm text-gray-500">
                  Espaço cultural com acervo de 5.000 livros
                </span>
              </div>
            </TableTd>
            <TableTd>
              <span className="rounded-full border p-1.5 text-xs">
                Educação
              </span>
            </TableTd>
            <TableTd>
              <Badge color="green" variant="light" radius="xs">
                Aprovada
              </Badge>
            </TableTd>
            <TableTd>
              <div className="flex items-center gap-2">
                <Avatar
                  size="sm"
                  name="Maria Costa"
                  color="initials"
                  variant="filled"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Maria Costa</span>
                  <span className="text-xs text-gray-500">Região Centro</span>
                </div>
              </div>
            </TableTd>
            <TableTd>
              <span className="font-medium text-green-600">R$ 80.000</span>
            </TableTd>
          </TableTr>

          <TableTr>
            <TableTd>
              <span className="font-semibold">004</span>
            </TableTd>
            <TableTd>
              <div className="flex flex-col">
                <span className="font-medium text-content-emphasis">
                  Instalação de câmeras de segurança
                </span>
                <span className="text-sm text-gray-500">
                  Sistema de monitoramento em 20 pontos estratégicos
                </span>
              </div>
            </TableTd>
            <TableTd>
              <span className="rounded-full border p-1.5 text-xs">
                Segurança
              </span>
            </TableTd>
            <TableTd>
              <Badge color="red" variant="light" radius="xs">
                Rejeitada
              </Badge>
            </TableTd>
            <TableTd>
              <div className="flex items-center gap-2">
                <Avatar
                  size="sm"
                  name="Pedro Lima"
                  color="initials"
                  variant="filled"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Pedro Lima</span>
                  <span className="text-xs text-gray-500">Região Leste</span>
                </div>
              </div>
            </TableTd>
            <TableTd>
              <span className="font-medium text-gray-600">R$ 200.000</span>
            </TableTd>
          </TableTr>

          <TableTr>
            <TableTd>
              <span className="font-semibold">005</span>
            </TableTd>
            <TableTd>
              <div className="flex flex-col">
                <span className="font-medium text-content-emphasis">
                  Revitalização de praças públicas
                </span>
                <span className="text-sm text-gray-500">
                  Reforma completa de 8 praças com nova infraestrutura
                </span>
              </div>
            </TableTd>
            <TableTd>
              <span className="rounded-full border p-1.5 text-xs">
                Meio Ambiente
              </span>
            </TableTd>
            <TableTd>
              <Badge color="blue" variant="light" radius="xs">
                Em Análise
              </Badge>
            </TableTd>
            <TableTd>
              <div className="flex items-center gap-2">
                <Avatar
                  size="sm"
                  name="Carlos Oliveira"
                  color="initials"
                  variant="filled"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Carlos Oliveira</span>
                  <span className="text-xs text-gray-500">Região Oeste</span>
                </div>
              </div>
            </TableTd>
            <TableTd>
              <span className="font-medium text-blue-600">R$ 350.000</span>
            </TableTd>
          </TableTr>
        </TableTbody>
      </Table>

      {/* Paginação */}
      <UrlPaginationFooter
        totalItems={1247}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Layout completo demonstrando todos os elementos em uma página de gestão avançada.

\`\`\`tsx
// Exemplo de página complexa completa
<div className="flex min-h-screen flex-col gap-4 p-6">
  {/* Header com filtros avançados */}
  <PageHeader>
    <HeaderRow>
      <HeaderContent>
        <Breadcrumbs items={multiLevelBreadcrumbs} />
      </HeaderContent>
      <HeaderActions>
        <Button>Exportar Excel</Button>
        <Button>Configurações</Button>
        <Button>Nova Proposta</Button>
      </HeaderActions>
    </HeaderRow>
    <HeaderRow>
      <HeaderContent>
        <SearchInput />
        <StaticFilterPopover>Status</StaticFilterPopover>
        <AsyncFilterPopover>Eixos</AsyncFilterPopover>
        <FilterManager>
          <FilterGroup title="Região" />
          <FilterGroup title="Orçamento" />
          <FilterGroup title="Data de Submissão" />
        </FilterManager>
      </HeaderContent>
    </HeaderRow>
  </PageHeader>

  {/* Cards de métricas */}
  <Card.List>
    <Card.Root>...</Card.Root>
    <Card.Root>...</Card.Root>
    <Card.Root>...</Card.Root>
    <Card.Root>...</Card.Root>
  </Card.List>

  {/* Tabela com dados */}
  <Table>...</Table>

  {/* Paginação */}
  <UrlPaginationFooter />
</div>
\`\`\`

**Elementos incluídos:**
- ✅ **Header**: Breadcrumbs de 4 níveis + 3 ações + filtros completos
- ✅ **Cards**: 4 métricas com ícones, valores, trends e descrições  
- ✅ **Tabela**: 6 colunas com dados ricos (avatares, badges, valores)
- ✅ **Paginação**: Componente real com contadores

**Quando usar:** Dashboards operacionais, páginas de gestão complexa, relatórios administrativos
        `
      }
    }
  }
}
