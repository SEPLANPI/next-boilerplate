# 🔐 Sistema de Autenticação Mock

Este boilerplate inclui um sistema de autenticação mock completo que simula o comportamento do Keycloak para demonstração e desenvolvimento.

## 🚀 Quick Start

1. **Configure as variáveis de ambiente:**
   ```bash
   cp env.example .env.local
   ```

2. **Execute a aplicação:**
   ```bash
   npm run dev
   ```

3. **Acesse e faça login:**
   - URL: `http://localhost:3000`
   - Será redirecionado para `/login`
   - Use qualquer um dos usuários mock disponíveis

## 👥 Usuários Disponíveis

| Email | Nome | Funções | Permissões |
|-------|------|---------|------------|
| `admin@example.com` | Administrador | `admin`, `user` | `read`, `write`, `delete`, `manage_users` |
| `user@example.com` | Usuário Padrão | `user` | `read`, `write` |
| `viewer@example.com` | Visualizador | `viewer` | `read` |

## 🎯 Funcionalidades

- ✅ **Login/Logout automático**
- ✅ **Sessões persistentes**
- ✅ **Refresh de tokens**
- ✅ **Proteção de rotas**
- ✅ **Verificação de permissões**
- ✅ **Redirecionamento inteligente**
- ✅ **Interface amigável para demonstração**

## 🔧 Como Funciona

O sistema detecta automaticamente se o Keycloak está configurado:

```typescript
// Se as variáveis do Keycloak existem → usa Keycloak real
// Se não existem → usa sistema mock automaticamente
```

## 📱 Interface de Login

A página `/login` oferece:

- **Formulário de login tradicional**
- **Botões de login rápido** para cada usuário
- **Visualização de permissões** de cada usuário
- **Indicadores visuais** de funções e permissões

## 🛠️ Arquivos Principais

```
src/
├── lib/auth/
│   └── mock-auth.ts          # Configuração do sistema mock
├── config/
│   └── mock-env.ts           # Variáveis de ambiente mock
├── app/
│   └── login/
│       └── page.tsx          # Página de login customizada
└── components/auth/
    └── user-info.tsx         # Componente de informações do usuário
```

## 🔄 Migração para Keycloak Real

Quando estiver pronto para usar Keycloak real:

1. **Configure as variáveis:**
   ```bash
   AUTH_KEYCLOAK_ISSUER=https://your-keycloak.com/auth/realms/your-realm
   AUTH_KEYCLOAK_ID=your-client-id
   AUTH_KEYCLOAK_SECRET=your-client-secret
   ```

2. **O sistema detectará automaticamente** e usará o Keycloak real

3. **Remova os arquivos mock** se desejar (opcional)

## 🎨 Personalização

### Adicionar novos usuários
Edite `src/lib/auth/mock-auth.ts`:

```typescript
export const mockUsers = [
  // ... usuários existentes
  {
    id: '4',
    email: 'novo@example.com',
    name: 'Novo Usuário',
    roles: ['user'],
    permissions: ['read', 'write']
  }
]
```

### Modificar permissões
```typescript
permissions: ['read', 'write', 'custom_permission']
```

### Adicionar novas funções
```typescript
roles: ['user', 'moderator', 'custom_role']
```

## 🔒 Segurança

**⚠️ IMPORTANTE**: Este sistema é apenas para demonstração!

- Qualquer senha funciona
- Tokens são simulados
- Não há criptografia real
- **Nunca use em produção**

## 📝 Logs

O sistema mostra no console quando está usando mock:
```
🔐 Usando autenticação mock - Keycloak não configurado
```

## 🎯 Casos de Uso

- **Demonstração**: Apresentar funcionalidades sem Keycloak
- **Desenvolvimento**: Trabalhar offline
- **Testes**: Validar fluxos de autenticação
- **Prototipagem**: Criar mockups funcionais
- **Treinamento**: Ensinar conceitos de autenticação

## 🚀 Próximos Passos

1. Configure as variáveis de ambiente
2. Execute `npm run dev`
3. Acesse `http://localhost:3000`
4. Faça login com qualquer usuário mock
5. Explore as funcionalidades de autenticação

---

**🎉 Agora você tem um sistema de autenticação completo para demonstração!**
