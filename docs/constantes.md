# Guia de Constantes no Projeto

### Motivos de uso de constantes

#### 1. Manutenibilidade
- **Ponto Único de Verdade**: Alterações em textos ou valores são feitas em um único lugar
- **Redução de Erros**: Elimina inconsistências causadas por duplicação
- **Rastreabilidade**: Facilita encontrar onde valores importantes são usados

#### 2. Experiência do Usuário
- **Consistência Visual**: Mesmas mensagens e labels em toda aplicação
- **Feedback Padronizado**: Mensagens de erro e sucesso uniformes
- **Internacionalização**: Base sólida para suporte multi-idioma

## Estrutura Atual

```
src/
└── constants/
    ├── messages.ts    # Mensagens de API e erros
    └── sort-labels.ts # Labels de ordenação
    └── pagination.ts  # Configurações de paginação
```

## Constantes Disponíveis

### 1. Mensagens de API

```typescript
export const API = {
  UNEXPECTED_FETCH_ERROR:
    'Ocorreu um erro inesperado ao se comunicar com o servidor',
} as const
```

### 2. Labels de Ordenação

```typescript
export const SORT_LABELS = {
  ALPHABETICAL: {
    ASC: 'A - Z',
    DESC: 'Z - A'
  },
  NUMERIC: {
    ASC: 'Menor valor',
    DESC: 'Maior valor'
  },
  QUANTITY: {
    ASC: 'Menos itens',
    DESC: 'Mais itens'
  },
  DATE: {
    ASC: 'Mais antiga',
    DESC: 'Mais recente'
  },
  RELEVANCE: {
    ASC: 'Menos relevante',
    DESC: 'Mais relevante'
  },
  PRIORITY: {
    ASC: 'Menor prioridade',
    DESC: 'Maior prioridade'
  },
  STATUS: {
    ASC: 'Pendente primeiro',
    DESC: 'Concluído primeiro'
  }
} as const

export type SortLabelsType = typeof SORT_LABELS
```

## Criando Novas Constantes
O projeto fornece uma estrutura base para constantes, mas você pode e deve criar novas constantes conforme as necessidades específicas do seu projeto. Alguns exemplos de casos comuns:

1. **Valores de Configuração**
   - Limites e thresholds
   - Configurações de paginação
   - Timeouts e intervalos

2. **Textos e Labels**
   - Títulos de seções
   - Mensagens para o usuário
   - Placeholders e tooltips

3. **Enums e Opções**
   - Status e tipos
   - Listas de seleção
   - Flags de configuração

## Exemplos de Uso

### Componente de Erro


```typescript
import { API } from '@/constants/messages'
import { Alert } from '@mantine/core'

interface FetchErrorProps {
  error?: string
  title?: string
}

export function FetchError({ error, title = 'Erro inesperado' }: FetchErrorProps) {
  return (
    <Alert
      title={title}
      variant="outline"
      color="red"
      className="max-w-xl"
    >
      {error || API.UNEXPECTED_FETCH_ERROR}
    </Alert>
  )
}
```


### Ordenação em Tabelas


```typescript
<SortableColumnHeader
  column="valor"
  title="Valor"
  sortKey={sort}
  onSort={setSort}
  ascendingLabel={SORT_LABELS.NUMERIC.ASC}
  descendingLabel={SORT_LABELS.NUMERIC.DESC}
/>
```
## Boas Práticas

### 1. Quando Usar Constantes

✅ **Use Para**:
- Mensagens de erro e feedback
- Labels de interface reutilizáveis
- Valores que podem mudar com requisitos
- Textos que precisam de internacionalização

❌ **Evite Para**:
- Textos únicos de interface
- Valores específicos de componente
- Configurações de ambiente (use `.env`)
- Valores que nunca mudam

### 2. Organização
- Um arquivo por domínio
- Nomes claros e descritivos
- Agrupamento lógico de constantes relacionadas

### 3. Tipagem
- Sempre use `as const`
- Exporte tipos quando necessário
- Mantenha tipagem estrita

### 4. Nomenclatura
- Use UPPERCASE para constantes
- Nomes descritivos e específicos
- Prefixos por domínio (API_, FORM_, etc)

## Considerações de Performance

- Bundlers modernos otimizam constantes eficientemente
- Tree-shaking remove constantes não utilizadas
- Impacto negligível no tamanho do bundle
- Benefícios superam qualquer overhead mínimo
