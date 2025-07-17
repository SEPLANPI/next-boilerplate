# Guia do Novo API Client (`@/lib/api`)

## Índice

- [Visão Geral](#visão-geral)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Como Usar](#como-usar)
  - [Instância Padrão](#instância-padrão)
  - [Criando um Novo Cliente](#criando-um-novo-cliente)
  - [Realizando Requisições](#realizando-requisições)
    - [GET](#get)
    - [POST](#post)
    - [PUT, PATCH, DELETE](#put-patch-delete)
    - [Enviando Parâmetros (Query Params)](#enviando-parâmetros-query-params)
    - [Enviando Arquivos (Form Data)](#enviando-arquivos-form-data)
    - [Obtendo a Resposta Bruta (`raw`)](#obtendo-a-resposta-bruta-raw)
- [Integração com React Query](#integração-com-react-query)
  - [O Helper `asQuery`](#o-helper-asquery)
- [Tratamento de Erros](#tratamento-de-erros)
  - [A Classe `ApiError`](#a-classe-apierror)
  - [Exibindo Erros na UI](#exibindo-erros-na-ui)
- [Autenticação](#autenticação)
- [Interceptors](#interceptors)
  - [Interceptors Padrão](#interceptors-padrão)
  - [Criando um Interceptor Customizado](#criando-um-interceptor-customizado)

---

## Visão Geral

O novo API client, localizado em `src/lib/api`, é uma solução moderna e unificada para realizar requisições HTTP tanto no lado do servidor (Server Components, Route Handlers) quanto no lado do cliente (Client Components).

Ele substitui a abordagem anterior que utilizava `server-api.ts` e `client-api.ts`, eliminando a necessidade de manter duas lógicas separadas para acesso à API.

## Principais Funcionalidades

- **Unificação Server/Client**: Um único cliente que funciona em ambos os ambientes.
- **Autenticação Automática**: O token de autenticação (NextAuth.js) é injetado automaticamente nas requisições, seja no cliente ou no servidor.
- **Tipagem Segura**: As respostas são encapsuladas no tipo `ApiResponse<T>`, garantindo segurança no tratamento de sucesso e erro.
- **Baseado em `fetch`**: Utiliza a API `fetch` nativa, moderna e disponível em todos os ambientes.
- **Interceptors**: Permite a extensão e modificação de requisições e respostas de forma centralizada.
- **Tratamento de Erros Padronizado**: Erros de API são encapsulados na classe `ApiError`, facilitando a depuração e exibição de mensagens.

## Estrutura de Arquivos

```
src/lib/api/
├── client.ts         # Core do cliente (criação, métodos GET/POST, etc.)
├── errors.ts         # Classe ApiError para tratamento de erros
├── index.ts          # Ponto de entrada, exporta o cliente padrão e utilitários
├── interceptors.ts   # Interceptors de autenticação e logging
├── params.ts         # Utilitário para construir query params
└── query.ts          # Helper `asQuery` para integração com React Query
```

## Como Usar

### Instância Padrão

O projeto já exporta uma instância padrão e pré-configurada do cliente, que você pode usar na maioria dos casos.

```typescript
import { api } from '@/lib/api'

// Exemplo de uso
const { data, error } = await api.get('/meu-endpoint')
```

### Criando um Novo Cliente

Se precisar de uma configuração diferente (outra `baseUrl` ou interceptors específicos), você pode criar uma nova instância com `createApiClient`.

```typescript
import { createApiClient } from '@/lib/api'

const meuClienteCustomizado = createApiClient({
  baseUrl: 'https://api.externa.com/v1',
  interceptors: {
    request: [
      // ... seus interceptors
    ]
  }
})
```

### Realizando Requisições

Todas as requisições retornam uma `Promise<ApiResponse<T>>`, que é um objeto com a seguinte estrutura:

```typescript
type ApiResponse<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: ApiError }
```

Você sempre deve verificar a presença da propriedade `error` para tratar falhas.

#### GET

```typescript
import { api } from '@/lib/api'

interface User {
  id: number
  name: string
}

export async function getUser(id: number) {
  const { data, error } = await api.get<User>(`/users/${id}`)

  if (error) {
    // Tratar o erro
    console.error(error.message)
    return
  }

  // Usar os dados
  console.log(data.name)
}
```

#### POST

Para enviar dados, use a opção `body`. O `Content-Type` é automaticamente definido como `application/json`.

```typescript
import { api } from '@/lib/api'

interface CreateUserInput {
  name: string
  email: string
}

interface User {
  id: number
  name: string
  email: string
}

export async function createUser(input: CreateUserInput) {
  const { data, error } = await api.post<User>('/users', {
    body: input
  })

  if (error) {
    // Tratar o erro, talvez inspecionando o corpo do erro
    if (error.status === 400) {
      console.error('Dados inválidos:', error.body)
    }
    return
  }

  return data
}
```

#### PUT, PATCH, DELETE

A sintaxe é idêntica à do `post`.

```typescript
// PUT
await api.put(`/users/${id}`, { body: updatedData })

// PATCH
await api.patch(`/users/${id}`, { body: partialData })

// DELETE (geralmente sem body)
await api.delete(`/users/${id}`)
```

#### Enviando Parâmetros (Query Params)

Use a opção `params` para enviar parâmetros de busca na URL. O cliente cuida da serialização.

```typescript
import { api } from '@/lib/api'

// Fará a requisição para /users?status=active&page=1
const { data, error } = await api.get('/users', {
  params: {
    status: 'active',
    page: 1,
    tags: ['dev', 'frontend'], // ?tags=dev&tags=frontend
    registered: true,
    search: undefined // será ignorado
  }
})
```

#### Enviando Arquivos (Form Data)

Para enviar arquivos ou dados de formulário, use `FormData` no `body` e defina o `contentType` como `'form-data'`.

```typescript
import { api } from '@/lib/api'

async function uploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('avatar', file)

  const { data, error } = await api.post('/users/avatar', {
    body: formData,
    contentType: 'form-data' // Essencial para uploads
  })

  if (error) {
    // Tratar erro de upload
  }
}
```

#### Obtendo a Resposta Bruta (`raw`)

Em casos raros, você pode precisar do objeto `Response` completo (para ler headers, por exemplo). Use a opção `raw: true`.

```typescript
import { api } from '@/lib/api'

// A resposta será o objeto Response nativo
const response = await api.get('/some-endpoint', { raw: true })

if (response.ok) {
  const data = await response.json()
  console.log('Header X-Custom:', response.headers.get('X-Custom'))
}
```

**Atenção:** Ao usar `raw: true`, o tratamento de erro (verificar `response.ok`) e a extração do corpo (`response.json()`, `response.text()`) ficam sob sua responsabilidade.

## Integração com React Query

O cliente foi desenhado para se integrar perfeitamente com `@tanstack/react-query`.

### O Helper `asQuery`

Para simplificar a integração, o `lib/api` exporta um helper `asQuery`. Ele envolve uma chamada de API e a adapta para o formato que o `queryFn` do React Query espera:

- Em caso de sucesso, retorna os `dados`.
- Em caso de erro (`ApiError`), ele **lança o erro**, o que permite que o React Query o capture e o coloque no estado `error`.

```typescript
// features/users/api/client/get-users.ts
import { api, asQuery } from '@/lib/api'
import type { User } from '../types'

export const getUsers = () => api.get<User[]>('/users')

// use-get-users.ts (Hook do React Query)
import { useQuery } from '@tanstack/react-query'
import { getUsers } from './get-users'

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: asQuery(getUsers), // Envolve a chamada com asQuery
  })
}

// Componente
import { useGetUsers } from '@/features/users/api/client/use-get-users'
import { FetchError } from '@/components/fetch-error' // Reutilize o componente de erro

function UserList() {
  const { data: users, error, isLoading } = useGetUsers()

  if (isLoading) return <Loading />
  if (error) return <FetchError error={error} title="Erro ao buscar usuários" />

  return (
    <ul>
      {users?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

## Tratamento de Erros

### A Classe `ApiError`

Quando uma requisição falha (status `4xx` ou `5xx`), a propriedade `error` da resposta contém uma instância de `ApiError`.

```typescript
class ApiError extends Error {
  response: Response // O objeto Response original
  status: number // Código de status HTTP (ex: 404)
  statusText: string // Texto do status (ex: "Not Found")
  body: unknown // O corpo do erro, já parseado (geralmente um objeto)

  constructor(response: Response, data: unknown) {
    /* ... */
  }

  getErrorMessage(): string {
    /* ... */
  } // Retorna a melhor mensagem de erro
}
```

### Exibindo Erros na UI

Você pode inspecionar o `ApiError` para exibir mensagens de erro detalhadas.

```typescript
import { api, ApiError } from '@/lib/api'

async function fetchResource() {
  const { error } = await api.get('/resource')

  if (error) {
    console.log('Status do erro:', error.status)

    // O ideal é usar o componente FetchError
    if (error instanceof ApiError) {
      return <FetchError error={error} title={`Erro ${error.status}`} />
    } else {
      // Erro de rede ou outro erro inesperado
      return <FetchError error="Não foi possível conectar ao servidor." />
    }
  }
}
```

## Autenticação

**A autenticação é automática.**

O interceptor `nextAuthInterceptor` é incluído por padrão na instância `api`. Ele detecta se está no servidor ou no cliente e usa o método apropriado (`auth()` ou `getSession()`) para obter o token do NextAuth.js e adicioná-lo ao header `Authorization` de todas as requisições.

Você **não precisa** fazer nada manualmente para autenticar suas chamadas.

## Interceptors

Interceptors permitem executar uma lógica antes de uma requisição ser enviada (`RequestInterceptor`) ou depois de uma resposta ser recebida (`ResponseInterceptor`).

### Interceptors Padrão

- `nextAuthInterceptor`: Adiciona o token de autenticação.
- `requestLoggingInterceptor`: Loga a requisição no console (em desenvolvimento).
- `responseLoggingInterceptor`: Loga a resposta no console se for um erro (em desenvolvimento).

### Criando um Interceptor Customizado

Você pode criar seus próprios interceptors para adicionar headers, tratar erros de forma global, etc.

```typescript
// Exemplo: Adiciona um header 'X-Tenant-Id' em todas as requisições

import type { RequestInterceptor } from '@/lib/api/interceptors'

export const tenantInterceptor: RequestInterceptor = async (url, options) => {
  const tenantId = await getTenantFromLocalStorage() // Sua lógica para obter o ID

  if (tenantId) {
    const headers = new Headers(options.headers)
    headers.set('X-Tenant-Id', tenantId)

    return {
      ...options,
      headers
    }
  }

  return options
}

// Ao criar o cliente:
const apiClient = createApiClient({
  baseUrl: '...',
  interceptors: {
    request: [
      nextAuthInterceptor, // A ordem importa!
      tenantInterceptor
      // ... outros
    ]
  }
})
```
