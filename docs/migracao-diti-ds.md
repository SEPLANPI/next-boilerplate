# Migração para @seplan/diti-ds

## Status: ❌ **BLOQUEADO - Problemas Fundamentais**

### Problemas Identificados

#### 1. **Erro de Hook React** ❌
```
Error: Cannot read properties of null (reading 'useMemo')
```
- **Causa**: A biblioteca `@seplan/diti-ds` está tentando usar hooks do React em um contexto onde o React não está disponível
- **Ocorre**: Durante SSR (Server-Side Rendering) do Next.js
- **Testado**: Mesmo com componentes client-side (`'use client'`)

#### 2. **Incompatibilidade ESM/CommonJS** ❌
```
Error: This package is ESM only. See https://err.47ng.com/NUQS-101 for more details.
```
- **Causa**: A biblioteca é ESM-only mas está sendo processada como CommonJS
- **Configuração**: `transpilePackages: ['@seplan/diti-ds']` no `next.config.mjs` não resolve

#### 3. **Versões Alinhadas** ✅
- Todas as dependências Mantine estão na versão `7.17.8`
- React e React-DOM estão na versão `18.3.1`
- Dependências estão sendo deduplicadas corretamente

### Tentativas de Resolução

#### ✅ **Configuração Next.js**
```javascript
// next.config.mjs
transpilePackages: ['@seplan/diti-ds']
```

#### ✅ **Wrapper Client-Side**
```typescript
'use client'
import { Breadcrumbs } from '@seplan/diti-ds'
```

#### ✅ **Tipos Corretos**
```typescript
import { Breadcrumbs, type BreadcrumbItem } from '@seplan/diti-ds'
```

#### ❌ **Resultado**
Mesmo com todas as tentativas, o erro persiste.

### Componentes Testados

1. **Breadcrumbs** ❌ - Erro de hook
2. **Card** ❌ - Erro de hook
3. **Componentes Locais** ✅ - Funcionam perfeitamente

### Próximos Passos

#### **Imediato**
1. **Manter componentes locais** - O projeto funciona perfeitamente com os componentes locais
2. **Aguardar correção da biblioteca** - O problema parece ser fundamental na construção da biblioteca

#### **Para a Equipe DITI**
1. **Investigar problema de SSR** - A biblioteca não funciona com Next.js App Router
2. **Verificar compatibilidade ESM** - Problemas com transpilação
3. **Testar com Next.js 14** - Possível incompatibilidade de versão

### Arquivos Criados/Modificados

#### **Criados**
- `src/components/ui/breadcrumbs-wrapper.tsx` - Wrapper client-side (não resolveu)
- `src/components/test-diti-ds.tsx` - Componente de teste (removido)

#### **Modificados**
- `next.config.mjs` - Adicionado `transpilePackages`
- `package.json` - Versões alinhadas com a biblioteca
- `src/app/(dashboard)/page.tsx` - Testes de migração

### Conclusão

**A biblioteca `@seplan/diti-ds` não é compatível com este projeto Next.js no momento atual.**

**Recomendação**: Manter os componentes locais até que a equipe DITI resolva os problemas fundamentais de compatibilidade com Next.js App Router e SSR.

### Status dos TODOs

- [x] ~~Substituir componentes UI locais pelos da biblioteca~~ - **CANCELADO**
- [x] ~~Atualizar todos os imports para usar a biblioteca~~ - **CANCELADO**  
- [x] ~~Remover componentes locais duplicados~~ - **CANCELADO**
- [x] ~~Testar se a migração não quebrou nada~~ - **CANCELADO**
- [x] Documentar plano de migração para quando a biblioteca estiver funcionando - **CONCLUÍDO**
