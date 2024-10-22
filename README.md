# Next.js Boilerplate

Este é um boilerplate para iniciar rapidamente o desenvolvimento de aplicações utilizando Next.js e outras tecnologias para evitar a escrita de código boilerplate e padronizar as aplicações da SEPLAN.

## Tabela de Conteúdos
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Autenticação](#autenticação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Iniciando o Projeto](#iniciando-o-projeto)
  - [Executando com Docker](#executando-com-docker)
  - [Executando Localmente](#executando-localmente)
- [Desenvolvimento](#desenvolvimento)
- [Estrutura de Pastas](#estrutura-de-pastas)

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**
- **[Mantine](https://mantine.dev/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[ESLint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)** 

- **[TypeScript](https://www.typescriptlang.org/)** 
- **[Lucide](https://lucide.dev/)** Biblioteca de ícones 

- **[NextAuth.js](https://next-auth.js.org/)** 
- **[Keycloak](https://www.keycloak.org/)** 
- **[pnpm](https://pnpm.io/)** 
- **Docker** 

## Autenticação

Este projeto utiliza **Keycloak** integrado com **NextAuth.js** para gerenciar autenticação e autorização. Para configurar o ambiente de desenvolvimento, você deve usar o servidor Keycloak disponível na SEPLAN:

- **Servidor Keycloak**: [http://192.168.128.74:8080](http://192.168.128.74:8080)
- **Realm**: `seplan`

Você tem duas opções para configurar o client no Keycloak:

1. **Criar um Novo Client**:
   - Acesse o servidor Keycloak e entre no realm `seplan`.
   - Siga as instruções da documentação oficial do Keycloak para criar um novo client OIDC: [Guia para Configurar Clients OIDC](https://www.keycloak.org/docs/latest/server_admin/#_oidc_clients).

2. **Usar Credenciais de um Client Existente**:
   - Caso já exista um client configurado para o projeto, você pode solicitar as credenciais e utilizá-las diretamente no seu ambiente de desenvolvimento.

Certifique-se de configurar as variáveis de ambiente corretamente no arquivo `.env.local` para que a autenticação funcione adequadamente.

## Variáveis de ambiente

   ```env'
   NEXT_PUBLIC_APP_URL=""
   NEXT_PUBLIC_API_URL=""

   // pnpx auth secret
   AUTH_SECRET=""

   AUTH_KEYCLOAK_ID=""
   AUTH_KEYCLOAK_SECRET=""
   AUTH_KEYCLOAK_ISSUER=http://192.168.128.74:8080/realms/seplan
   ```
## Iniciando o Projeto

### Executando com Docker

Para rodar o projeto utilizando Docker, siga os passos abaixo:

1. Certifique-se de ter o Docker instalado em sua máquina.
2. Clone o repositório do boilerplate.
3. Execute o seguinte comando para iniciar o contêiner:

   ```bash
   docker-compose up --build
   ```
4. o projeto estará disponível em http://localhost:3000


### Executando Localmente

Para rodar o projeto localmente, siga  os passos abaixo:

1. Certifique-se de ter o **pnpm** instalado:

   ```bash
   npm install -g pnpm
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

## Desenvolvimento

## Desenvolvimento

Para um ambiente de desenvolvimento otimizado, recomendamos duas abordagens:

1. **Usar a Extensão Dev Containers no VSCode**:
   - Certifique-se de ter o **Docker** e **VSCode** instalados.
   - Instale a extensão **[Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)** no VSCode.
   - Abra o projeto no VSCode e escolha "Reabrir no Container" para iniciar o desenvolvimento em um ambiente configurado de forma consistente, sem a necessidade de instalar dependências localmente.

2. **Instalar Dependências Localmente**:
   - Se preferir desenvolver diretamente na sua máquina, certifique-se de instalar as dependências do projeto localmente utilizando **pnpm**:
     ```bash
     pnpm install
     ```
Isso permitirá que o **ESLint** funcione corretamente e que o editor reconheça todas as dependências, garantindo uma experiência de desenvolvimento integrada.

## Estrutura de Pastas

Baseado em **[BulletProof React](https://github.com/alan2207/bulletproof-react/tree/master/apps/nextjs-app)**
