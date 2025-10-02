# 🔐 Sistema de Autenticação Mock

Este boilerplate inclui um sistema de autenticação mock que simula o comportamento do Keycloak para demonstração e desenvolvimento.

## 🚀 Como Funciona

O sistema detecta automaticamente se as variáveis de ambiente do Keycloak estão configuradas:

- **Se configurado**: Usa o Keycloak real
- **Se não configurado**: Usa o sistema mock automaticamente

## 👥 Usuários Mock Disponíveis

### 1. Administrador
- **Email**: `admin@example.com`
- **Nome**: Administrador
- **Funções**: `admin`, `user`
- **Permissões**: `read`, `write`, `delete`, `manage_users`

### 2. Usuário Padrão
- **Email**: `user@example.com`
- **Nome**: Usuário Padrão
- **Funções**: `user`
- **Permissões**: `read`, `write`

### 3. Visualizador
- **Email**: `viewer@example.com`
- **Nome**: Visualizador
- **Funções**: `viewer`
- **Permissões**: `read`

## 🔧 Configuração

### Para usar o Mock (padrão)
```bash
# Copie o arquivo de exemplo
cp env.example .env.local

# Ou configure manualmente as variáveis mínimas:
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_API_URL=http://localhost:3000/api
AUTH_SECRET=mock-secret-key-for-development

# Execute a aplicação
npm run dev
```

### Para usar Keycloak real
```bash
# Configure as variáveis de ambiente no .env.local
AUTH_KEYCLOAK_ISSUER=https://your-keycloak.com/auth/realms/your-realm
AUTH_KEYCLOAK_ID=your-client-id
AUTH_KEYCLOAK_SECRET=your-client-secret
AUTH_SECRET=your-auth-secret
```

## 📱 Como Usar

1. **Acesse a aplicação**: `http://localhost:3000`
2. **Será redirecionado para**: `/login`
3. **Escolha um usuário**: Clique em "Usar" para login rápido
4. **Ou digite manualmente**: Qualquer senha funciona

## 🎯 Funcionalidades Simuladas

- ✅ **Login/Logout**
- ✅ **Sessões persistentes**
- ✅ **Refresh de tokens**
- ✅ **Verificação de permissões**
- ✅ **Proteção de rotas**
- ✅ **Redirecionamento automático**

## 🔒 Segurança

**⚠️ IMPORTANTE**: Este sistema é apenas para demonstração!

- Qualquer senha funciona
- Tokens são simulados
- Não há criptografia real
- **Nunca use em produção**

## 🛠️ Arquivos Principais

- `src/lib/auth/mock-auth.ts` - Configuração do sistema mock
- `src/config/mock-env.ts` - Variáveis de ambiente mock
- `src/app/login/page.tsx` - Página de login customizada
- `src/components/auth/user-info.tsx` - Componente de informações do usuário

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

## 🔄 Migração para Keycloak Real

Quando estiver pronto para usar Keycloak real:

1. Configure as variáveis de ambiente
2. O sistema detectará automaticamente
3. Remova os arquivos mock se desejar
4. Teste a integração

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
