# Boilerplate de Autenticação e Autorização

Esta documentação cobre o **boilerplate de autenticação** utilizado em múltiplos sistemas da empresa, organizada de forma incremental para facilitar implementação e customização em novos projetos.

## Visão Geral do Boilerplate

Este boilerplate fornece uma solução completa de autenticação integrada com **Keycloak GovPI Cidadão** (gerenciado pela ETIPI) usando **NextAuth.js** para gerenciamento de sessões e **middleware** para proteção automática de rotas.

### 🎯 Para que serve este boilerplate?

- ✅ **Autenticação padronizada** em todos os sistemas da empresa
- ✅ **Integração automática** com Keycloak GovPI Cidadão
- ✅ **Proteção de rotas** configurável e flexível
- ✅ **Controle de acesso** granular por componentes
- ✅ **Gestão de sessão** com renovação automática
- ✅ **Tipos TypeScript** predefinidos e extensíveis

## Fluxo de Implementação

### 🚀 1. [Configuração Inicial](./01-configuracao-inicial.md)

Configure o boilerplate em um novo projeto

- Setup de variáveis de ambiente
- Integração com Keycloak GovPI da empresa
- Configuração do NextAuth para seu sistema

### 🔑 2. [Fluxo de Autenticação](./02-fluxo-autenticacao.md)

Entenda como o sistema de login funciona

- Processo de autenticação
- Gestão de tokens e refresh
- Customização do fluxo para seu caso de uso

### 👤 3. [Gestão de Usuários](./03-gestao-usuarios.md)

Trabalhe com dados de usuário em seu sistema

- Estrutura padrão do usuário
- Roles disponíveis no sistema
- Como estender campos para seu domínio
- Busca e validação de informações

### 🛣️ 4. [Configuração de Rotas](./05-configuracao-rotas.md)

**Configure proteção** de rotas para seu sistema

- Arquivo de configuração adaptável
- Padrões de URL flexíveis
- Como proteger suas funcionalidades específicas

### 🛡️ 5. [Proteção de Rotas](./06-protecao-rotas.md)

**Entenda o funcionamento** interno do middleware

- Como o middleware funciona
- Fluxo de verificação automática
- Debug e troubleshooting

### 🧩 6. [Proteção de Componentes](./07-protecao-componentes.md)

Implemente controle de acesso na UI

- Permission Gates reutilizáveis
- Hooks personalizáveis
- Padrões de implementação

## Tecnologias do Boilerplate

- **[Keycloak GovPI Cidadão](https://www.gov.br/governodigital/pt-br)** - Provedor de identidade padrão da empresa
- **[NextAuth.js](https://next-auth.js.org/)** - Gerenciamento de autenticação
- **[Next.js Proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)** (antigo middleware) - Proteção automática de rotas
- **JWT** - Tokens de acesso padrão
- **TypeScript** - Tipagem completa e extensível

## Estrutura do Boilerplate

```
src/
├── auth.ts                         # ⚙️ Configuração principal (adapte para seu sistema)
├── proxy.ts                        # 🛡️ Proxy (antigo middleware) universal
├── config/
│   └── routing.ts                  # 🛣️ Configure suas rotas específicas
├── components/
│   └── permision-gates/           # 🚪 Gates reutilizáveis
│       ├── client-permission-gate.tsx
│       └── server-permission-gate.tsx
├── lib/
│   ├── auth/                      # 🔐 Utilitários padrão (reutilizáveis)
│   │   ├── types.ts               # Tipos base do Keycloak
│   │   ├── get-user-info.ts       # Busca dados do usuário
│   │   ├── handle-initial-signin.ts # Login inicial
│   │   ├── token-handlers.ts      # Manipulação de tokens
│   │   ├── refresh-access-token.ts # Renovação automática
│   │   └── verify-session.ts      # Verificação de sessão
│   └── routes/
│       └── matcher.ts             # 🎯 Lógica de rotas (reutilizável)
├── types/
│   ├── auth.ts                    # 👤 Interface base (estenda para seu domínio)
│   ├── roles.ts                   # 🏷️ Roles base (customize para seu sistema)
│   ├── routing.ts                 # 🗺️ Tipos de roteamento
│   └── next-auth.d.ts             # Extensões NextAuth
└── app/api/auth/                  # 🌐 Rotas padrão (reutilizáveis)
    ├── [...nextauth]/route.ts     # Rotas NextAuth
    ├── sign-in/route.ts           # Login customizado
    └── sign-out/route.ts          # Logout customizado
```

## Como Usar Este Boilerplate

### 🆕 Para um Novo Sistema

1. **Copie a estrutura** de arquivos para seu projeto
2. **Configure variáveis** seguindo [Configuração Inicial](./01-configuracao-inicial.md)
3. **Defina suas rotas** em [Configuração de Rotas](./05-configuracao-rotas.md)
4. **Customize roles** seguindo [Sistema de Roles](./04-sistema-roles.md)
5. **Estenda tipos** conforme [Gestão de Usuários](./03-gestao-usuarios.md)

### 🔄 Para Atualizar Sistema Existente

1. **Compare estruturas** com seu código atual
2. **Migre configurações** gradualmente
3. **Teste funcionalidades** uma por vez
4. **Documente customizações** específicas do seu sistema

### 🎨 Customizações Comuns por Tipo de Sistema

#### Sistema Administrativo

```typescript
// Roles sugeridos
type Role = 'admin' | 'manager' | 'operator' | 'viewer'

// Rotas típicas
routes: [
  { path: '/admin/*', requiredRoles: ['admin'] },
  { path: '/dashboard/*', requiredRoles: ['admin', 'manager'] },
  { path: '/reports/*', requiredRoles: ['admin', 'manager', 'operator'] }
]
```

#### Sistema de Atendimento

```typescript
// Roles sugeridos
type Role = 'supervisor' | 'agent' | 'specialist'

// Campos extras do usuário
interface User extends BaseUser {
  department?: string
  skillLevel?: 'junior' | 'senior' | 'expert'
  availableHours?: string
}
```

#### Sistema de Relatórios

```typescript
// Roles sugeridos
type Role = 'analyst' | 'manager' | 'viewer'

// Rotas com hierarquia
routes: [
  { path: '/analytics/*', requiredRoles: ['analyst', 'manager'] },
  { path: '/public-reports/*', requiredRoles: [] } // Autenticado apenas
]
```

## Integração com ETIPI

Esta é uma **solução padronizada da empresa**. Para qualquer configuração no Keycloak:

### 📞 Contate a ETIPI para:

- Criação de novos clientes para seu sistema
- Configuração de roles específicos
- Adição de atributos personalizados
- Configuração de mappers customizados
- Criação de usuários de teste

### 📋 Tenha em mãos:

- Nome do sistema
- Roles necessários
- Campos extras do usuário
- URLs de callback do ambiente

## Versionamento e Atualizações

### 🏷️ Versão Atual: `v2024.1`

- ✅ NextAuth.js v5
- ✅ Suporte a middleware universal
- ✅ Permission Gates server/client
- ✅ TypeScript completo
- ✅ Refresh automático de tokens

### 🔄 Como Atualizar

1. **Verifique changelog** de mudanças breaking
2. **Teste em ambiente** de desenvolvimento
3. **Migre configurações** gradualmente
4. **Documente adaptações** específicas

## Suporte e Contribuição

### 🆘 Precisa de Ajuda?

1. **Consulte esta documentação** primeiro
2. **Verifique issues conhecidos** no repositório
3. **Contate a equipe** responsável pelo boilerplate
4. **Para problemas no Keycloak**: contate ETIPI

### 🤝 Como Contribuir

1. **Documente melhorias** que implementou
2. **Compartilhe customizações** úteis
3. **Reporte bugs** ou limitações encontradas
4. **Sugira funcionalidades** para próximas versões

---

**💡 Dica**: Este boilerplate é uma **base sólida**, mas deve ser **adaptado** para as necessidades específicas do seu sistema. A documentação fornece os padrões, mas sinta-se livre para customizar conforme necessário.
