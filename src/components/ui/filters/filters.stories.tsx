import { ApiResponse } from "@/lib/api"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  AsyncFilterPopover,
  FilterGroup,
  FilterManager,
  StaticFilterPopover,
} from "./"

// Real-world mock data based on application
const STATUS_OPTIONS = [
  { id: "aprovada", label: "Aprovadas" },
  { id: "pendente", label: "Pendentes" },
  { id: "rejeitada", label: "Rejeitadas" },
]

const EIXOS_OPTIONS = [
  { id: "saude", label: "Saúde" },
  { id: "educacao", label: "Educação" },
  { id: "seguranca", label: "Segurança" },
  { id: "infraestrutura", label: "Infraestrutura" },
]

const REGIAO_OPTIONS = [
  { id: "norte", label: "Norte" },
  { id: "sul", label: "Sul" },
  { id: "centro", label: "Centro" },
]

// Async functions based on real usage
const loadEixosOptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { data: EIXOS_OPTIONS } as ApiResponse<typeof EIXOS_OPTIONS>
}

const loadConselheiros = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    data: [
      { id: "1", nome: "Ana Silva", email: "ana@example.com" },
      { id: "2", nome: "João Santos", email: "joao@example.com" },
      { id: "3", nome: "Maria Costa", email: "maria@example.com" },
    ],
  } as ApiResponse<{ id: string; nome: string; email: string }[]>
}

const meta: Meta = {
  title: "Componentes/Filtros",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Sistema de Filtros

Componentes para filtros baseados em exemplos reais da aplicação.

**StaticFilterPopover**: Dados fixos (status, tipos)  
**AsyncFilterPopover**: Dados da API (eixos, conselheiros)  
**FilterManager**: Múltiplos filtros agrupados
        `,
      },
    },
  },
  argTypes: {
    // Essential props
    searchParamKey: {
      description: "Nome do parâmetro na URL (ex: ?status=aprovada)",
      control: "text",
      table: { category: "Essencial" },
    },

    // StaticFilterPopover props
    options: {
      description:
        "Array de opções para StaticFilterPopover: [{ id: string, label: string }]",
      control: "object",
      table: { category: "StaticFilterPopover" },
    },

    // AsyncFilterPopover props
    filterId: {
      description: "ID único para cache da requisição (obrigatório para async)",
      control: "text",
      table: { category: "AsyncFilterPopover" },
    },
    loadOptions: {
      description: "Função async que retorna as opções: () => Promise<T[]>",
      table: { category: "AsyncFilterPopover" },
    },
    getOptionLabel: {
      description: "Extrai texto de exibição: (option: T) => string",
      table: { category: "AsyncFilterPopover" },
    },
    getOptionValue: {
      description: "Extrai valor único: (option: T) => string",
      table: { category: "AsyncFilterPopover" },
    },

    // Behavior props
    showSearch: {
      description: "Habilita caixa de busca dentro do filtro",
      control: "boolean",
      table: { category: "Comportamento", defaultValue: { summary: "true" } },
    },
    showSelectedOnTop: {
      description: "Itens selecionados aparecem no topo da lista",
      control: "boolean",
      table: { category: "Comportamento", defaultValue: { summary: "true" } },
    },

    // Layout props
    position: {
      description: "Posição do popover",
      control: "select",
      options: ["bottom-end", "bottom-start", "top-end", "top-start"],
      table: { category: "Layout", defaultValue: { summary: "bottom-end" } },
    },
    width: {
      description: "Largura do popover (número ou string CSS)",
      control: "text",
      table: { category: "Layout", defaultValue: { summary: "300" } },
    },

    // FilterManager props
    onApply: {
      description: "Callback chamado quando filtros são aplicados",
      table: { category: "FilterManager" },
    },

    // Advanced props
    renderOption: {
      description:
        "Renderização customizada de cada opção: (option: T) => JSX.Element",
      table: { category: "Avançado" },
    },
    isDisabled: {
      description:
        "Determina se opção está desabilitada: (option: T) => boolean",
      table: { category: "Avançado" },
    },
    filterFn: {
      description:
        "Função de busca customizada: (option: T, search: string) => boolean",
      table: { category: "Avançado" },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

interface StaticFilterArgs {
  children: string
  searchParamKey: string
  options: Array<{ id: string; label: string }>
  showSearch: boolean
  showSelectedOnTop: boolean
  position: "bottom-end" | "bottom-start" | "top-end" | "top-start"
  width: string
}

// 1. Filtro Estático Básico
export const FiltroEstatico: StoryObj<StaticFilterArgs> = {
  name: "StaticFilterPopover",
  args: {
    children: "Filtro Interativo",
    searchParamKey: "status",
    options: STATUS_OPTIONS,
    showSearch: false,
    showSelectedOnTop: true,
    position: "bottom-end",
    width: "300",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Texto exibido no botão do filtro",
    },
    searchParamKey: {
      control: "text",
      description: "Nome do parâmetro na URL",
    },
    options: {
      control: {
        type: "select",
        labels: {
          STATUS_OPTIONS: "Status (Aprovada, Pendente, Rejeitada)",
          REGIAO_OPTIONS: "Região (Norte, Sul, Centro)",
          EIXOS_OPTIONS: "Eixos (Saúde, Educação, Segurança, Infraestrutura)",
        },
      },
      options: ["STATUS_OPTIONS", "REGIAO_OPTIONS", "EIXOS_OPTIONS"],
      mapping: {
        STATUS_OPTIONS: STATUS_OPTIONS,
        REGIAO_OPTIONS: REGIAO_OPTIONS,
        EIXOS_OPTIONS: EIXOS_OPTIONS,
      },
    },
    showSearch: {
      control: "boolean",
    },
    showSelectedOnTop: {
      control: "boolean",
    },
    position: {
      control: "select",
      options: ["bottom-end", "bottom-start", "top-end", "top-start"],
    },
    width: {
      control: "text",
    },
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <StaticFilterPopover
          searchParamKey={args.searchParamKey}
          options={args.options}
          showSearch={args.showSearch}
          showSelectedOnTop={args.showSelectedOnTop}
          position={args.position}
          width={args.width}
        >
          {args.children}
        </StaticFilterPopover>
      </div>

      <div className="rounded bg-gray-50 p-4 text-sm">
        <strong>Controles interativos:</strong> Use os controles abaixo para
        testar diferentes configurações do StaticFilterPopover
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Para dados fixos conhecidos em tempo de build.

\`\`\`tsx
<StaticFilterPopover
  searchParamKey="status"
  options={[
    { id: 'aprovada', label: 'Aprovadas' },
    { id: 'pendente', label: 'Pendentes' }
  ]}
  showSearch={false}
  showSelectedOnTop={true}
>
  Status
</StaticFilterPopover>
\`\`\`

**Controles interativos:** Use os controles para testar diferentes opções e comportamentos.
        `,
      },
    },
  },
}

interface AsyncFilterArgs {
  children: string
  filterId: string
  searchParamKey: string
  showSearch: boolean
  showSelectedOnTop: boolean
  position: "bottom-end" | "bottom-start" | "top-end" | "top-start"
  width: string
  loadOptionsType: "eixos" | "conselheiros"
}

// 2. Filtro Assíncrono Básico
export const FiltroAssincrono: StoryObj<AsyncFilterArgs> = {
  name: "AsyncFilterPopover",
  args: {
    children: "Filtro Assíncrono",
    filterId: "eixos-interactive",
    searchParamKey: "eixo",
    showSearch: true,
    showSelectedOnTop: true,
    position: "bottom-end",
    width: "300",
    loadOptionsType: "eixos",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Texto exibido no botão do filtro",
    },
    filterId: {
      control: "text",
      description: "ID único para cache da requisição",
    },
    searchParamKey: {
      control: "text",
      description: "Nome do parâmetro na URL",
    },
    showSearch: {
      control: "boolean",
    },
    showSelectedOnTop: {
      control: "boolean",
    },
    position: {
      control: "select",
      options: ["bottom-end", "bottom-start", "top-end", "top-start"],
    },
    width: {
      control: "text",
    },
    loadOptionsType: {
      control: {
        type: "select",
        labels: {
          eixos: "Eixos (Saúde, Educação, etc.)",
          conselheiros: "Conselheiros (Ana Silva, João Santos, etc.)",
        },
      },
      options: ["eixos", "conselheiros"],
    },
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="flex gap-4">
        {args.loadOptionsType === "eixos" ? (
          <AsyncFilterPopover
            filterId={args.filterId}
            searchParamKey={args.searchParamKey}
            loadOptions={loadEixosOptions}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.id}
            showSearch={args.showSearch}
            showSelectedOnTop={args.showSelectedOnTop}
            position={args.position}
            width={args.width}
          >
            {args.children}
          </AsyncFilterPopover>
        ) : (
          <AsyncFilterPopover
            filterId={args.filterId}
            searchParamKey={args.searchParamKey}
            loadOptions={loadConselheiros}
            getOptionLabel={(option) => option.nome}
            getOptionValue={(option) => option.id}
            showSearch={args.showSearch}
            showSelectedOnTop={args.showSelectedOnTop}
            position={args.position}
            width={args.width}
          >
            {args.children}
          </AsyncFilterPopover>
        )}
      </div>

      <div className="rounded bg-blue-50 p-4 text-sm">
        <strong>Controles interativos:</strong> Use os controles para testar
        diferentes configurações do AsyncFilterPopover
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Para dados carregados da API com loading automático.

\`\`\`tsx
<AsyncFilterPopover
  filterId="eixos"
  searchParamKey="eixo"
  loadOptions={getEixosFilterOptions}
  getOptionLabel={(option) => option.nome}
  getOptionValue={(option) => option.id}
>
  Eixos
</AsyncFilterPopover>
\`\`\`

**Controles interativos:** Use os controles para testar diferentes tipos de dados e comportamentos.
        `,
      },
    },
  },
}

interface FilterManagerArgs {
  buttonText: string
}

// 3. FilterManager para Múltiplos Filtros
export const FilterManagerExample: StoryObj<FilterManagerArgs> = {
  name: "FilterManager",
  args: {
    buttonText: "Filtros",
  },
  argTypes: {
    buttonText: {
      control: "text",
      description: "Texto exibido no botão do FilterManager",
    },
  },
  render: (args) => (
    <div className="space-y-4">
      <FilterManager
        buttonText={args.buttonText}
        onApply={() => console.log("Filtros aplicados!")}
      >
        <FilterGroup
          title="Status"
          searchParamKey="status"
          options={STATUS_OPTIONS}
          showSearch={false}
        />
        <FilterGroup
          title="Região"
          searchParamKey="regiao"
          options={REGIAO_OPTIONS}
          showSearch={false}
        />
      </FilterManager>

      <div className="rounded bg-green-50 p-4 text-sm">
        <strong>Controles interativos:</strong> Use os controles para
        personalizar o texto do botão de filtros
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Para organizar múltiplos filtros em um modal limpo.

\`\`\`tsx
<FilterManager 
  buttonText="Filtros Avançados"
  onApply={() => console.log('Applied!')}
>
  <FilterGroup
    title="Status"
    searchParamKey="status"
    options={statusOptions}
  />
  <FilterGroup
    title="Eixos"
    searchParamKey="eixo"
    filterId="eixos"
    loadOptions={loadEixos}
    getOptionLabel={(option) => option.nome}
    getOptionValue={(option) => option.id}
  />
</FilterManager>
\`\`\`

**Vantagens:** Interface limpa, aplicação em lote, organização por grupos relacionados  
**Controles interativos:** Use o controle de texto para personalizar o botão
        `,
      },
    },
  },
}

// 4. Abordagem Híbrida (Padrão Recomendado)
export const AbordagemHibrida: Story = {
  name: "Padrão Híbrido (Recomendado)",
  render: () => (
    <div className="space-y-4">
      <div className="rounded border p-4">
        <h3 className="mb-3 font-semibold">Header com Filtros</h3>
        <div className="flex items-center gap-4">
          {/* Filtro importante sempre visível */}
          <StaticFilterPopover
            searchParamKey="status"
            options={STATUS_OPTIONS}
            showSelectedOnTop={true}
          >
            Status
          </StaticFilterPopover>

          {/* Filtros secundários agrupados */}
          <FilterManager
            onApply={() => console.log("Filtros aplicados!")}
            buttonText="Mais filtros"
          >
            <FilterGroup
              title="Região"
              searchParamKey="regiao"
              options={REGIAO_OPTIONS}
            />
          </FilterManager>
        </div>
      </div>

      <div className="rounded bg-yellow-50 p-4 text-sm">
        <strong>Estratégia recomendada:</strong> Filtro crítico + FilterManager
        para secundários
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Combine FilterPopover + FilterManager para melhor UX.

**Regra:** Filtro usado em >80% das buscas → FilterPopover (sempre visível), filtros secundários → FilterManager (agrupados)
        `,
      },
    },
  },
}

// 5. Props Avançadas
export const PropsAvancadas: Story = {
  name: "Props Avançadas",
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Renderização Customizada</h3>
        <StaticFilterPopover
          searchParamKey="status-custom"
          options={STATUS_OPTIONS}
          renderOption={(option) => (
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  option.id === "aprovada"
                    ? "bg-green-500"
                    : option.id === "pendente"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
              <span>{option.label}</span>
            </div>
          )}
          showSearch={false}
        >
          Status com Ícones
        </StaticFilterPopover>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Opções Desabilitadas</h3>
        <StaticFilterPopover
          searchParamKey="regiao-disabled"
          options={REGIAO_OPTIONS}
          isDisabled={(option) => option.id === "centro"}
          renderOption={(option) => (
            <div className={option.id === "centro" ? "opacity-50" : ""}>
              {option.label}
              {option.id === "centro" && (
                <span className="ml-2 text-xs text-red-500">
                  (Indisponível)
                </span>
              )}
            </div>
          )}
          showSearch={false}
        >
          Região (Centro Desabilitado)
        </StaticFilterPopover>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Customize comportamento e aparência quando necessário.

\`\`\`tsx
<StaticFilterPopover
              renderOption={(option) => (
    <div className="flex items-center gap-2">
      <StatusIcon status={option.id} />
                  <span>{option.label}</span>
                </div>
              )}
  isDisabled={(option) => option.id === 'archived'}
  filterFn={(option, search) => 
    option.label.toLowerCase().includes(search.toLowerCase())
  }
>
  Status Customizado
</StaticFilterPopover>
\`\`\`
        `,
      },
    },
  },
}

// 6. Estados de Loading e Erro
export const EstadosAsincronos: Story = {
  name: "Loading e Erro",
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <AsyncFilterPopover
          filterId="loading-fast"
          searchParamKey="fast"
          loadOptions={async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
            return { data: STATUS_OPTIONS } as ApiResponse<
              typeof STATUS_OPTIONS
            >
          }}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.id}
        >
          Loading Rápido
        </AsyncFilterPopover>

        <AsyncFilterPopover
          filterId="loading-slow"
          searchParamKey="slow"
          loadOptions={async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            return { data: STATUS_OPTIONS } as ApiResponse<
              typeof STATUS_OPTIONS
            >
          }}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.id}
        >
          Loading Lento (3s)
        </AsyncFilterPopover>

        <AsyncFilterPopover
          filterId="loading-error"
          searchParamKey="error"
          loadOptions={async () => {
            await new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Erro na API")), 1000),
            )
            return { data: STATUS_OPTIONS } as ApiResponse<
              typeof STATUS_OPTIONS
            >
          }}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.id}
        >
          Com Erro
        </AsyncFilterPopover>
      </div>

      <div className="rounded bg-orange-50 p-4 text-sm">
        <strong>Estados automáticos:</strong> Loading spinner, cache, retry,
        mensagens de erro
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Estados automáticos para filtros assíncronos.

- **Loading**: Spinner automático durante carregamento
- **Cache**: React Query cache automático  
- **Erro**: Mensagens de erro com retry
- **Revalidação**: Dados sempre atualizados
        `,
      },
    },
  },
}
