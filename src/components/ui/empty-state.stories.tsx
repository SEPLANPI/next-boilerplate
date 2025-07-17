import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import { EmptyState } from './empty-state'
import { Button } from '@mantine/core'

const meta: Meta<typeof EmptyState> = {
  title: 'Componentes/Empty State',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Empty State

Componente para exibir estados vazios com consistência visual e boa experiência do usuário.

**Princípios:** Estados vazios devem ser limpos e minimalistas, representando claramente a ausência de conteúdo

\`\`\`tsx
<EmptyState>
  <EmptyState.Header>Nenhum documento encontrado</EmptyState.Header>
  <EmptyState.Description>
    Ainda não há documentos nesta pasta. Faça upload de arquivos para começar.
  </EmptyState.Description>
  <EmptyState.Actions>
    <Button>Fazer Upload</Button>
    <Button variant="ghost">Importar</Button>
  </EmptyState.Actions>
</EmptyState>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    size: {
      description: 'Tamanho do container do empty state',
      control: 'select',
      options: ['narrow', 'wide'],
      table: {
        category: 'Layout',
        defaultValue: { summary: 'narrow' }
      }
    },
    className: {
      description: 'Classes CSS adicionais para o container',
      control: 'text',
      table: {
        category: 'Layout'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof EmptyState>

export const UsoBasico: Story = {
  name: 'Uso Básico',
  render: () => (
    <EmptyState>
      <EmptyState.Header>Nenhum item encontrado</EmptyState.Header>
      <EmptyState.Description>
        Ainda não há itens para exibir aqui.
      </EmptyState.Description>
    </EmptyState>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Estrutura básica limpa com apenas header e descrição.

\`\`\`tsx
<EmptyState>
  <EmptyState.Header>Nenhum item encontrado</EmptyState.Header>
  <EmptyState.Description>
    Ainda não há itens para exibir aqui.
  </EmptyState.Description>
</EmptyState>
\`\`\`

**Usado em:** Estados vazios simples, listas sem dados
        `
      }
    }
  }
}

export const ComAcoes: Story = {
  name: 'Com Ações',
  render: () => (
    <EmptyState>
      <EmptyState.Header>Nenhum membro na equipe</EmptyState.Header>
      <EmptyState.Description>
        Convide pessoas para colaborar neste projeto.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button>Convidar Membros</Button>
        <Button variant="ghost">Importar Lista</Button>
      </EmptyState.Actions>
    </EmptyState>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Empty state com ações para orientar o usuário sobre próximos passos.

\`\`\`tsx
<EmptyState>
  <EmptyState.Header>Nenhum membro na equipe</EmptyState.Header>
  <EmptyState.Description>
    Convide pessoas para colaborar neste projeto.
  </EmptyState.Description>
  <EmptyState.Actions>
    <Button>Convidar Membros</Button>
    <Button variant="ghost">Importar Lista</Button>
  </EmptyState.Actions>
</EmptyState>
\`\`\`

**Padrão:** Ação primária (filled) + ação secundária (ghost)
        `
      }
    }
  }
}

export const ListViewExamples: Story = {
  name: 'Exemplos de List Views',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Votações</h3>
        <EmptyState>
          <EmptyState.Header>Nenhuma votação encontrada</EmptyState.Header>
          <EmptyState.Description>
            Ainda não há propostas com votação neste evento. As propostas em
            votação aparecerão aqui quando receberem votos.
          </EmptyState.Description>
        </EmptyState>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Cadastros</h3>
        <EmptyState>
          <EmptyState.Header>Nenhum cadastro encontrado</EmptyState.Header>
          <EmptyState.Description>
            Ainda não há cadastros para este evento. Os participantes
            cadastrados aparecerão aqui quando se inscreverem.
          </EmptyState.Description>
        </EmptyState>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Propostas</h3>
        <EmptyState>
          <EmptyState.Header>Nenhuma proposta encontrada</EmptyState.Header>
          <EmptyState.Description>
            Ainda não há propostas cadastradas para este evento. As propostas
            submetidas pelos participantes aparecerão aqui.
          </EmptyState.Description>
        </EmptyState>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Convites</h3>
        <EmptyState>
          <EmptyState.Header>Nenhum convite encontrado</EmptyState.Header>
          <EmptyState.Description>
            Ainda não há convites enviados para este evento. Os convites
            enviados aos participantes aparecerão aqui.
          </EmptyState.Description>
        </EmptyState>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
Exemplos reais dos empty states implementados nas list views do sistema.

Cada exemplo segue o padrão minimalista:
- **Header:** Título claro sobre o que não foi encontrado  
- **Description:** Explicação do que aparecerá quando houver dados
- **Sem ícones:** Design limpo que representa a ausência de conteúdo

**Padrão implementado:** Estados vazios limpos e focados no texto.
        `
      }
    }
  }
}

export const ComImagem: Story = {
  name: 'Com Imagem',
  render: () => (
    <EmptyState size="wide">
      <EmptyState.Image
        src="/api/placeholder/200/150"
        alt="Ilustração de pasta vazia"
        width={200}
        height={150}
      />
      <EmptyState.Header>Pasta completamente vazia</EmptyState.Header>
      <EmptyState.Description>
        Esta pasta não contém nenhum arquivo. Arraste arquivos aqui ou use o
        botão abaixo para fazer upload.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button>Fazer Upload</Button>
        <Button variant="ghost">Explorar Templates</Button>
      </EmptyState.Actions>
    </EmptyState>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Empty state com imagem ilustrativa para contextos especiais (onboarding, landing pages).

\`\`\`tsx
<EmptyState size="wide">
  <EmptyState.Image
    src="/illustration.svg"
    alt="Ilustração"
    width={200}
    height={150}
  />
  <EmptyState.Header>Pasta completamente vazia</EmptyState.Header>
  <EmptyState.Description>
    Esta pasta não contém nenhum arquivo.
  </EmptyState.Description>
  <EmptyState.Actions>
    <Button>Fazer Upload</Button>
    <Button variant="ghost">Explorar Templates</Button>
  </EmptyState.Actions>
</EmptyState>
\`\`\`

**Usado em:** Landing pages, onboarding, primeiro uso
        `
      }
    }
  }
}

export const VariacoesTamanho: Story = {
  name: 'Variações de Tamanho',
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Tamanho Narrow (padrão)</h3>
        <EmptyState size="narrow">
          <EmptyState.Header>Nenhuma mensagem</EmptyState.Header>
          <EmptyState.Description>
            Comece uma conversa enviando sua primeira mensagem.
          </EmptyState.Description>
        </EmptyState>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Tamanho Wide</h3>
        <EmptyState size="wide">
          <EmptyState.Header>Agenda completamente livre</EmptyState.Header>
          <EmptyState.Description>
            Você não tem nenhum compromisso agendado para hoje. Que tal
            aproveitar este tempo livre para se organizar ou agendar reuniões
            importantes? Use o calendário para visualizar toda a semana.
          </EmptyState.Description>
          <EmptyState.Actions>
            <Button>Agendar Reunião</Button>
            <Button variant="ghost">Ver Calendário</Button>
          </EmptyState.Actions>
        </EmptyState>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
Demonstração dos dois tamanhos disponíveis.

\`\`\`tsx
{/* Tamanho padrão - mais compacto */}
<EmptyState size="narrow">
  <EmptyState.Header>Título</EmptyState.Header>
  <EmptyState.Description>Descrição breve.</EmptyState.Description>
</EmptyState>

{/* Tamanho amplo - para mais conteúdo */}
<EmptyState size="wide">
  <EmptyState.Header>Título</EmptyState.Header>
  <EmptyState.Description>
    Descrição mais longa com mais detalhes e contexto.
  </EmptyState.Description>
</EmptyState>
\`\`\`

**Narrow:** max-width: 32rem (512px) - para listas e componentes compactos  
**Wide:** max-width: 48rem (768px) - para páginas principais e onboarding
        `
      }
    }
  }
}

export const ContextosEspecificos: Story = {
  name: 'Contextos Específicos',
  render: () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h4 className="mb-4 font-semibold">E-mail</h4>
        <EmptyState>
          <EmptyState.Header>Caixa de entrada vazia</EmptyState.Header>
          <EmptyState.Description>
            Parabéns! Você leu todas as mensagens.
          </EmptyState.Description>
        </EmptyState>
      </div>

      <div>
        <h4 className="mb-4 font-semibold">Pesquisa</h4>
        <EmptyState>
          <EmptyState.Header>Nenhum resultado encontrado</EmptyState.Header>
          <EmptyState.Description>
            Tente ajustar os filtros ou usar termos diferentes.
          </EmptyState.Description>
          <EmptyState.Actions>
            <Button variant="ghost">Limpar Filtros</Button>
          </EmptyState.Actions>
        </EmptyState>
      </div>

      <div>
        <h4 className="mb-4 font-semibold">Erro de Conexão</h4>
        <EmptyState>
          <EmptyState.Header>Falha ao carregar dados</EmptyState.Header>
          <EmptyState.Description>
            Verifique sua conexão e tente novamente.
          </EmptyState.Description>
          <EmptyState.Actions>
            <Button>Tentar Novamente</Button>
          </EmptyState.Actions>
        </EmptyState>
      </div>

      <div>
        <h4 className="mb-4 font-semibold">Permissão</h4>
        <EmptyState>
          <EmptyState.Header>Acesso restrito</EmptyState.Header>
          <EmptyState.Description>
            Você não tem permissão para ver este conteúdo.
          </EmptyState.Description>
        </EmptyState>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `
Diferentes contextos com design minimalista.

**E-mail:** Estado positivo (inbox zero)  
**Pesquisa:** Orientação para refinamento com ação ghost  
**Erro:** Ação primária de retry  
**Permissão:** Informação clara sem ações desnecessárias

**Princípio:** Ações secundárias usam variant="ghost" para hierarquia visual clara.
        `
      }
    }
  }
}
