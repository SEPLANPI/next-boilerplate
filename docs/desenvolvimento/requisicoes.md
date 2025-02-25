# Guia de Requisições API

## Índice
- [Guia de Requisições API](#guia-de-requisições-api)
  - [Índice](#índice)
  - [Visão Geral](#visão-geral)
    - [Por que Duas Utilidades de API?](#por-que-duas-utilidades-de-api)
    - [Principais Bibliotecas Utilizadas:](#principais-bibliotecas-utilizadas)
  - [Estrutura de Arquivos](#estrutura-de-arquivos)
  - [Como Usar](#como-usar)
    - [Server-Side Fetching](#server-side-fetching)
    - [Client-Side Fetching](#client-side-fetching)
- [Tratamento de Erros em Requisições API](#tratamento-de-erros-em-requisições-api)
  - [Componente de Erro Padrão](#componente-de-erro-padrão)
  - [Componentes de Erro Personalizados](#componentes-de-erro-personalizados)
  - [Mensagens de Erro](#mensagens-de-erro)
  - [Tipos](#tipos)
    - [ServerResult](#serverresult)
  - [Boas Práticas](#boas-práticas)


## Visão Geral

O projeto utiliza duas abordagens principais para requisições API:

1. **Server-Side Fetching**: Usando a API utilitária `server-api.ts` para requisições no servidor
2. **Client-Side Fetching**: Usando a API utilitária `client-api.ts` para requisições no cliente

### Por que Duas Utilidades de API?

O projeto utiliza duas utilidades de API distintas (`server-api.ts` e `client-api.ts`) por alguns motivos técnicos importantes:

1. **URLs Diferentes**
   - **Server-Side**: Acessa a API diretamente pela rede Docker interna (ex: `http://web:8000`)
   - **Client-Side**: Acessa via proxy Nginx público (ex: `https://api.exemplo.com`)
   - Isso é necessário pois o servidor Next.js roda dentro da rede Docker e pode acessar outros serviços diretamente, enquanto o navegador precisa acessar através do proxy público

2. **Autenticação**
   - **Server-Side**: Usa o método `auth()` do NextAuth.js para obter a sessão no servidor
   - **Client-Side**: Usa o método `getSession()` do NextAuth.js para gerenciar tokens no navegador
   - Os métodos de obtenção do token de autenticação são diferentes em cada ambiente

3. **Contexto de Execução**
   - **Server-Side**: Executa em ambiente Node.js com acesso direto à rede interna
   - **Client-Side**: Executa no navegador com restrições de CORS e segurança

Esta separação permite:
- Melhor segurança ao isolar chamadas sensíveis no servidor
- Performance otimizada usando a rede interna quando possível
- Flexibilidade para usar diferentes estratégias de autenticação
- Tipagem específica para cada contexto de execução





### Principais Bibliotecas Utilizadas:
- `@tanstack/react-query`: Para gerenciamento de estado e cache no cliente

## Estrutura de Arquivos

```
src/
├── features/
│   └── [feature]/
│       └── api/
│           ├── types.ts              # Tipos da API
│           ├── get-[resource].ts     # Funções server-side
│           └── client/
│               └── get-[resource].ts # Funções client-side
├── lib/
│   ├── server-api.ts                 # Utilitário para server-side
│   └── client-api.ts                 # Utilitário para client-side
└── types/
    └── server-result.ts              # Tipos comuns
```
## Como Usar

### Server-Side Fetching

1. Crie um arquivo na pasta `api` da feature:

```typescript
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { API } from '@/constants/messages'

type ResourceType = {
  id: number
  name: string
}

export async function getResource(): Promise<ServerResult<ResourceType>> {
  try {
    const response = await api.get('/resource')
    
    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
```

2. Use em um Server Component com tratamento de loading:

```typescript
// page.tsx
import { Suspense } from 'react'
import { Loading } from '@/components/loading'

// Server Component que faz a requisição
async function ResourceServerComponent() {
  const { data, error } = await getResource()
  
  if (error) {
    return <FetchError error={error} title="Erro ao carregar dados" />
  }
  
  return <div>{data.name}</div>
}

// Página que usa o Server Component com tratamento de loading
export default function ResourcePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResourceServerComponent />
    </Suspense>
  )
}
```


### Client-Side Fetching

1. Crie um arquivo na pasta `api/client`:

```typescript
import { clientApi } from '@/lib/client-api'
import { API } from '@/constants/messages'

type ResourceType = {
  id: number
  name: string
}

export async function getResource(): Promise<ResourceType> {
  const response = await clientApi.get('/resource')
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return response.json()
}
```

2. Use com React Query:

```typescript
function ResourceComponent() {
  const { data, error, isFetching } = useQuery({
    queryKey: ['resource'],
    queryFn: getResource
  })

  if (error) return <FetchError error={error.message} title="Erro ao carregar dados" />
  if (isFetching) return <Loading />
  
  return <div>{data.name}</div>
}
```

# Tratamento de Erros em Requisições API

## Componente de Erro Padrão

O projeto fornece um componente padrão `FetchError` para exibir erros de requisições:


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

Este componente pode ser usado facilmente em qualquer lugar da aplicação:

```typescript
if (error) {
  return <FetchError error={error} title="Erro ao carregar dados" />
}
```

## Componentes de Erro Personalizados

Você pode criar seus próprios componentes de erro para casos específicos.

## Mensagens de Erro

As mensagens de erro podem ser definidas de duas formas:

1. **Usando constantes**:
   ```typescript
   return <FetchError error={API.UNEXPECTED_FETCH_ERROR} title="Erro ao carregar dados" />
   ```
   As constantes são centralizadas no arquivo de constantes. Para mais detalhes sobre a estrutura e boas práticas de constantes, consulte [docs/constantes.md](./constantes.md).

2. **Usando strings diretas**:
   ```typescript
   return <FetchError error="Erro ao carregar dados" title="Erro ao carregar dados" />
   ```

Recomenda-se usar constantes para mensagens que:
- São reutilizadas em vários lugares
- Podem precisar de internacionalização
- Podem mudar com requisitos futuros

Para mensagens únicas e específicas, strings diretas podem ser mais simples e práticas.

## Tipos

### ServerResult
```typescript
interface ServerResult<T> {
  data?: T
  error?: string
}
```

## Boas Práticas

1. **Organização**:
   - Mantenha funções de API separadas por feature
   - Separe claramente funções server-side e client-side
   - Centralize tipos comuns em arquivos `.ts` específicos

2. **Nomenclatura**:
   - Funções server-side: `getResource`
   - Funções client-side: `clientGetResource` se `getResource` já existir
   - Tipos: `ResourceResponse`, `ResourceType`

3. **React Query**:
   - Use para dados que precisam de cache/revalidação
   - Configure `staleTime` apropriadamente
   - Implemente loading states
   - Use `placeholderData` quando apropriado

4. **Tratamento de Erros**:
   - Centralize mensagens de erro em `messages.ts`
   - Trate tanto erros de rede quanto erros da API

5. **Autenticação**:
   - os utilitários `server-api` e `client-api` já incluem o token automaticamente
   - Não é necessário adicionar headers de autenticação manualmente

