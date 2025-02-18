# Renderização Condicional por Permissões

Este guia explica como renderizar conteúdo condicionalmente baseado em funções do usuário usando Portões de Permissão (Permission Gates).

## Componentes Disponíveis

O sistema fornece dois componentes de Portão de Permissão:

- `ServerPermissionGate`: Para componentes do servidor
- `ClientPermissionGate`: Para componentes do cliente

## Exemplos de Uso

### Componentes do Servidor

```tsx
import { ServerPermissionGate } from '@/components/permission-gates/server-permission-gate'

export default async function PaginaAdmin() {
  return (
    <div>
      <h1>Painel</h1>
      
      {/* Apenas usuários admin verão este conteúdo */}
      <ServerPermissionGate allowedRoles={['admin']}>
        <ControlesAdmin />
      </ServerPermissionGate>

      {/* Conteúdo visível para admin e gerente */}
      <ServerPermissionGate allowedRoles={['admin', 'manager']}>
        <PainelAnalitico />
      </ServerPermissionGate>
    </div>
  )
}
```

### Componentes do Cliente

```tsx
'use client'
import { ClientPermissionGate } from '@/components/permission-gates/client-permission-gate'

export function AcoesUsuario() {
  return (
    <div>
      {/* Apenas editores podem ver este botão */}
      <ClientPermissionGate allowedRoles={['editor']}>
        <button>Editar Conteúdo</button>
      </ClientPermissionGate>

      {/* Verificação de múltiplas funções */}
      <ClientPermissionGate allowedRoles={['admin', 'manager']}>
        <button>Gerenciar Usuários</button>
      </ClientPermissionGate>
    </div>
  )
}
```

## Boas Práticas

1. **Escolha o Componente Adequado**
   - Use `ServerPermissionGate` para componentes do servidor
   - Use `ClientPermissionGate` para componentes do cliente/elementos interativos

2. **Combinações de Funções**
   - Você pode passar múltiplas funções para `allowedRoles`
   - O usuário precisa ter pelo menos uma das funções especificadas

3. **Considerações de Segurança**
   - Portões do servidor fornecem maior segurança pois impedem que o conteúdo seja enviado ao cliente
   - Portões do cliente são úteis para elementos de UI mas não devem ser a única camada de proteção

4. **Tratamento de Erros**
   - Os portões ocultam silenciosamente o conteúdo quando o usuário não tem permissão
   - Considere fornecer feedback para melhor experiência do usuário quando necessário

## Props dos Componentes

Ambos os componentes aceitam as mesmas props:

```typescript
interface PermissionGateProps {
  children: ReactNode
  allowedRoles: Role[]
}
```

## Trabalhando com Layouts

Você pode usar Portões de Permissão em layouts para controlar acesso a seções inteiras:

```tsx
export default function LayoutPainel({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ServerPermissionGate allowedRoles={['admin', 'manager']}>
      <div className="layout-painel">
        <MenuLateral />
        {children}
      </div>
    </ServerPermissionGate>
  )
}
```
