import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { Card } from "./card"
import { Sparkline } from "@mantine/charts"
import {
  Users,
  DollarSign,
  BarChart3,
  ShoppingCart,
  Eye,
  Star,
  Calendar,
  Target,
} from "lucide-react"

const meta: Meta<typeof Card.Root> = {
  title: "Componentes/Card",
  component: Card.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Card

Sistema de cards usando padrão de composição para máxima flexibilidade.

**Funcionalidades:** Múltiplas orientações, trends automáticos, suporte a gráficos, ícones consistentes

\`\`\`tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Revenue</Card.Title>
    <Card.Icon><DollarSign /></Card.Icon>
  </Card.Header>
  <Card.Content>
    <Card.Value prefix="R$">12,345</Card.Value>
    <Sparkline w="100%" h={40} data={[...]} />
  </Card.Content>
  <Card.Footer>
    <Card.Trend value={15} />
    <Card.Description>vs mês anterior</Card.Description>
  </Card.Footer>
</Card.Root>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    className: {
      description: "Classes CSS adicionais para o container do card",
      control: "text",
      table: {
        category: "Layout",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card.Root>

export default meta
type Story = StoryObj<typeof Card.Root>

// Mock data for charts
const revenueData = [45, 52, 38, 44, 60, 76, 78, 51, 65, 85, 92, 89]
const usersData = [10, 15, 12, 8, 14, 18, 16, 20, 25, 22, 28, 30]

export const UsoBasico: Story = {
  name: "Uso Básico",
  render: () => (
    <Card.Root>
      <Card.Header>
        <Card.Title>Receita Mensal</Card.Title>
        <Card.Icon>
          <DollarSign className="size-4" />
        </Card.Icon>
      </Card.Header>
      <Card.Content>
        <Card.Value prefix="R$">156,789</Card.Value>
      </Card.Content>
      <Card.Footer>
        <Card.Description>vs mês anterior</Card.Description>
      </Card.Footer>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Estrutura básica de um card com título, valor e descrição.

\`\`\`tsx
<Card.Root>
  <Card.Header>
    <Card.Title>Receita Mensal</Card.Title>
    <Card.Icon><DollarSign /></Card.Icon>
  </Card.Header>
  <Card.Content>
    <Card.Value prefix="R$">156,789</Card.Value>
  </Card.Content>
  <Card.Footer>
    <Card.Description>vs mês anterior</Card.Description>
  </Card.Footer>
</Card.Root>
\`\`\`

**Estrutura:** Header (título + ícone) → Content (valor) → Footer (descrição)  
**Usado em:** Métricas simples, KPIs básicos
        `,
      },
    },
  },
}

export const ComGrafico: Story = {
  name: "Card com Gráfico",
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <Card.Title>Usuários Ativos</Card.Title>
        <Card.Icon>
          <Users className="size-4" />
        </Card.Icon>
      </Card.Header>
      <Card.Content>
        <Card.Value>8,429</Card.Value>
        <Sparkline
          w="100%"
          h={40}
          data={usersData}
          curveType="linear"
          color="blue"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </Card.Content>
      <Card.Footer>
        <Card.Trend value={12} />
        <Card.Description>últimos 12 meses</Card.Description>
      </Card.Footer>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Card com gráfico Sparkline integrado para mostrar tendências.

\`\`\`tsx
<Card.Content>
  <Card.Value>8,429</Card.Value>
  <Sparkline
    w="100%"
    h={40}
    data={usersData}
    curveType="linear"
    color="blue"
    fillOpacity={0.3}
  />
</Card.Content>
\`\`\`

**Usado em:** Dashboards, métricas com histórico, análises temporais
        `,
      },
    },
  },
}

export const ComTrend: Story = {
  name: "Card com Trend",
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card.Root>
        <Card.Header>
          <Card.Title>Vendas</Card.Title>
          <Card.Icon>
            <ShoppingCart className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value>1,234</Card.Value>
        </Card.Content>
        <Card.Footer>
          <Card.Trend value={23} />
          <Card.Description>este mês</Card.Description>
        </Card.Footer>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Taxa de Rejeição</Card.Title>
          <Card.Icon>
            <Eye className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value suffix="%">2.4</Card.Value>
        </Card.Content>
        <Card.Footer>
          <Card.Trend value={-8} />
          <Card.Description>melhoria</Card.Description>
        </Card.Footer>
      </Card.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Component \`Card.Trend\` determina automaticamente cor e ícone:
- **Verde + ↗**: valores positivos (crescimento)
- **Vermelho + ↘**: valores negativos (declínio)

\`\`\`tsx
<Card.Trend value={23} />  {/* Verde com seta para cima */}
<Card.Trend value={-8} />  {/* Vermelho com seta para baixo */}
\`\`\`

**Usado em:** Comparações período anterior, métricas de performance
        `,
      },
    },
  },
}

export const OrientacaoVertical: Story = {
  name: "Orientação Vertical",
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card.Root>
        <Card.Header orientation="vertical">
          <Card.Icon>
            <BarChart3 className="size-4" />
          </Card.Icon>
          <Card.Title>Relatórios</Card.Title>
        </Card.Header>
        <Card.Content>
          <Card.Value>247</Card.Value>
        </Card.Content>
        <Card.Footer>
          <Card.Description>gerados este mês</Card.Description>
        </Card.Footer>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Avaliação</Card.Title>
          <Card.Icon>
            <Star className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value suffix="/5">4.8</Card.Value>
        </Card.Content>
        <Card.Footer orientation="vertical">
          <Card.Description>satisfação média</Card.Description>
          <Card.Trend value={5} />
        </Card.Footer>
      </Card.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Header e Footer suportam orientação vertical para layouts diferentes.

\`\`\`tsx
{/* Header vertical: ícone acima do título */}
<Card.Header orientation="vertical">
  <Card.Icon><BarChart3 /></Card.Icon>
  <Card.Title>Relatórios</Card.Title>
</Card.Header>

{/* Footer vertical: descrição acima do trend */}
<Card.Footer orientation="vertical">
  <Card.Description>satisfação média</Card.Description>
  <Card.Trend value={5} />
</Card.Footer>
\`\`\`

**Usado em:** Cards compactos, layouts com pouco espaço horizontal
        `,
      },
    },
  },
}

export const VariacoesDados: Story = {
  name: "Variações de Dados",
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card.Root>
        <Card.Header>
          <Card.Title>Valor Monetário</Card.Title>
          <Card.Icon>
            <DollarSign className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value prefix="R$">45,678</Card.Value>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Porcentagem</Card.Title>
          <Card.Icon>
            <Target className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value suffix="%">87.5</Card.Value>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Quantidade</Card.Title>
          <Card.Icon>
            <Calendar className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value suffix=" dias">15</Card.Value>
        </Card.Content>
      </Card.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
\`Card.Value\` suporta prefixos e sufixos para diferentes tipos de dados.

\`\`\`tsx
{/* Valores monetários */}
<Card.Value prefix="R$">45,678</Card.Value>

{/* Porcentagens */}
<Card.Value suffix="%">87.5</Card.Value>

{/* Unidades customizadas */}
<Card.Value suffix=" dias">15</Card.Value>
\`\`\`

**Usado em:** Diferentes tipos de métricas, valores com unidades específicas
        `,
      },
    },
  },
}

export const CardCompleto: Story = {
  name: "Card Completo",
  render: () => (
    <Card.Root className="w-96">
      <Card.Header>
        <Card.Title>Receita Total</Card.Title>
        <Card.Icon>
          <DollarSign className="size-4" />
        </Card.Icon>
      </Card.Header>
      <Card.Content>
        <Card.Value prefix="R$">256,890</Card.Value>
        <Sparkline
          w="100%"
          h={50}
          data={revenueData}
          curveType="linear"
          color="green"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </Card.Content>
      <Card.Footer>
        <Card.Trend value={18} />
        <Card.Description>+R$38,790 vs mês anterior</Card.Description>
      </Card.Footer>
    </Card.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Exemplo completo combinando todos os elementos disponíveis.

\`\`\`tsx
<Card.Root className="w-96">
  <Card.Header>
    <Card.Title>Receita Total</Card.Title>
    <Card.Icon><DollarSign /></Card.Icon>
  </Card.Header>
  <Card.Content>
    <Card.Value prefix="R$">256,890</Card.Value>
    <Sparkline w="100%" h={50} data={data} />
  </Card.Content>
  <Card.Footer>
    <Card.Trend value={18} />
    <Card.Description>+R$38,790 vs mês anterior</Card.Description>
  </Card.Footer>
</Card.Root>
\`\`\`

**Usado em:** Dashboards principais, métricas importantes com contexto completo
        `,
      },
    },
  },
}

export const CardList: Story = {
  name: "Card.List - Layout Horizontal",
  render: () => (
    <Card.List>
      <Card.Root>
        <Card.Header>
          <Card.Title>Receita</Card.Title>
          <Card.Icon>
            <DollarSign className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value prefix="R$">45,678</Card.Value>
        </Card.Content>
        <Card.Footer>
          <Card.Trend value={12} />
          <Card.Description>este mês</Card.Description>
        </Card.Footer>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Usuários</Card.Title>
          <Card.Icon>
            <Users className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value>2,847</Card.Value>
        </Card.Content>
        <Card.Footer>
          <Card.Trend value={-3} />
          <Card.Description>ativos</Card.Description>
        </Card.Footer>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Conversões</Card.Title>
          <Card.Icon>
            <Target className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value suffix="%">4.2</Card.Value>
        </Card.Content>
        <Card.Footer>
          <Card.Trend value={8} />
          <Card.Description>taxa média</Card.Description>
        </Card.Footer>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Sessões</Card.Title>
          <Card.Icon>
            <Eye className="size-4" />
          </Card.Icon>
        </Card.Header>
        <Card.Content>
          <Card.Value suffix="K">18.5</Card.Value>
        </Card.Content>
        <Card.Footer>
          <Card.Trend value={15} />
          <Card.Description>este período</Card.Description>
        </Card.Footer>
      </Card.Root>
    </Card.List>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: `
Componente \`Card.List\` organiza cards horizontalmente com espaçamento consistente.

\`\`\`tsx
<Card.List>
  <Card.Root>
    <Card.Header>
      <Card.Title>Receita</Card.Title>
      <Card.Icon><DollarSign /></Card.Icon>
    </Card.Header>
    <Card.Content>
      <Card.Value prefix="R$">45,678</Card.Value>
    </Card.Content>
    <Card.Footer>
      <Card.Trend value={12} />
      <Card.Description>este mês</Card.Description>
    </Card.Footer>
  </Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title>Usuários</Card.Title>
      <Card.Icon><Users /></Card.Icon>
    </Card.Header>
    <Card.Content>
      <Card.Value>2,847</Card.Value>
    </Card.Content>
    <Card.Footer>
      <Card.Trend value={-3} />
      <Card.Description>ativos</Card.Description>
    </Card.Footer>
  </Card.Root>
</Card.List>
\`\`\`

**Funcionalidades:**
- **Full width**: Ocupa toda a largura disponível
- **Flex layout**: Cards distribuídos horizontalmente
- **Gap consistente**: Espaçamento de 1rem (gap-4) entre cards
- **Responsivo**: Cards se ajustam automaticamente

**Usado em:** Dashboards principais, métricas em linha, headers de seções
        `,
      },
    },
  },
}
