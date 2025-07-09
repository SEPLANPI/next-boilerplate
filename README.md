# Next.js Boilerplate

Este é um boilerplate para iniciar rapidamente o desenvolvimento de aplicações utilizando Next.js e outras tecnologias para evitar a escrita de código boilerplate e padronizar as aplicações da SEPLAN.

> 📚 [Clique aqui para acessar a documentação completa do projeto](docs/README.md)

## Tabela de Conteúdos

- [Next.js Boilerplate](#nextjs-boilerplate)
  - [Tabela de Conteúdos](#tabela-de-conteúdos)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Autenticação](#autenticação)
  - [Variáveis de ambiente](#variáveis-de-ambiente)
  - [Iniciando o Projeto](#iniciando-o-projeto)
    - [Executando com Docker](#executando-com-docker)
    - [Executando Localmente](#executando-localmente)
  - [Desenvolvimento](#desenvolvimento)
    - [Opções de Ambiente de Desenvolvimento](#opções-de-ambiente-de-desenvolvimento)
  - [Estrutura de Pastas](#estrutura-de-pastas)

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**
- **[Mantine](https://mantine.dev/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[ESLint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Lucide](https://lucide.dev/)** - Biblioteca de ícones
- **[NextAuth.js](https://next-auth.js.org/)**
- **[Keycloak](https://www.keycloak.org/)**
- **[pnpm](https://pnpm.io/)**
- **Docker**

## Autenticação

Este projeto utiliza **Keycloak** integrado com **NextAuth.js**. Para mais detalhes sobre a configuração de autenticação, consulte [docs/auth.md](docs/auth.md).

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL base para a aplicação Next.js (ex.: http://localhost:3000)
NEXT_PUBLIC_APP_URL=""

# URL base para a API Server-Side (Network interna do docker) (ex.: http://web:8000)
SERVER_API_URL=""

# URL base para a API Client-Side (Acesso externo via Nginx) (ex.: http://localhost:1337/api/v1)
NEXT_PUBLIC_CLIENT_API_URL=""

# Chave secreta usada pelo NextAuth para assinar JWTs.
# Pode ser gerada usando o comando: pnpx auth secret
AUTH_SECRET=""

# URL redirect do next-auth (geralmente igual a NEXT_PUBLIC_APP_URL)
AUTH_URL=""

# Configurações Keycloak
AUTH_KEYCLOAK_ID=""
AUTH_KEYCLOAK_SECRET=""
AUTH_KEYCLOAK_ISSUER=http://192.168.128.74:8080/realms/seplan

# Configurações do Host de Imagens (valores de exemplo)
IMAGE_HOST_PROTOCOL=http
IMAGE_HOST_HOSTNAME=localhost
IMAGE_HOST_PORT=8000
```

## Iniciando o Projeto

### Executando com Docker

1. Certifique-se de ter o Docker instalado
2. Clone o repositório
3. Execute:

```bash
docker-compose up --build
```

4. Acesse http://localhost:3000

### Executando Localmente

1. Instale o pnpm:

```bash
npm install -g pnpm
```

2. Instale as dependências:

```bash
pnpm install
```

3. Inicie o servidor:

```bash
pnpm dev
```

## Desenvolvimento

### Opções de Ambiente de Desenvolvimento

1. **Dev Containers no VSCode**:

   - Requer Docker e VSCode
   - Instale a extensão [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - Abra o projeto e selecione "Reabrir no Container"

2. **Desenvolvimento Local**:
   - Execute `pnpm install` para instalar dependências

## Estrutura de Pastas

Baseado em [BulletProof React](https://github.com/alan2207/bulletproof-react/tree/master/apps/nextjs-app)

Para mais detalhes, consulte nossa [documentação completa](docs/README.md).
