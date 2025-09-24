export const SORT_LABELS = {
  ALPHABETICAL: {
    ASC: "A - Z",
    DESC: "Z - A",
  },
  NUMERIC: {
    ASC: "Menor valor",
    DESC: "Maior valor",
  },
  QUANTITY: {
    ASC: "Menos itens",
    DESC: "Mais itens",
  },
  DATE: {
    ASC: "Mais antiga",
    DESC: "Mais recente",
  },
  RELEVANCE: {
    ASC: "Menos relevante",
    DESC: "Mais relevante",
  },
  PRIORITY: {
    ASC: "Menor prioridade",
    DESC: "Maior prioridade",
  },
  STATUS: {
    ASC: "Pendente primeiro",
    DESC: "Concluído primeiro",
  },
} as const

export type SortLabelsType = typeof SORT_LABELS
