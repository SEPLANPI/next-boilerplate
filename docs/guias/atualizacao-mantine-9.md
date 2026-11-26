# Atualização: Mantine 8 → 9 e Recharts 3

Este guia mostra o que foi feito no boilerplate e o que cada projeto precisa conferir ao repetir a atualização. Ele supõe o projeto já no Mantine 8 ([guia](./atualizacao-mantine-8.md)) e no React 19.2 ou mais novo ([guia do Next 16](./atualizacao-next-16.md)).

Guias oficiais:
- Mantine: https://mantine.dev/guides/8x-to-9x
- Recharts: https://github.com/recharts/recharts/wiki/3.0-migration-guide

## Passo a passo

1. **Atualizar juntos todos os `@mantine/*` e pôr o Recharts 3 no `package.json`.** O `@mantine/charts` 9 exige `recharts >= 3.2.1` como peer. Projetos que só tinham o Recharts como dependência transitiva (caso do boilerplate, que estava na 2.15) precisam declará-lo.

   ```bash
   pnpm add @mantine/core@^9.8.2 @mantine/hooks@^9.8.2 @mantine/dates@^9.8.2 \
     @mantine/charts@^9.8.2 @mantine/carousel@^9.8.2 @mantine/form@^9.8.2 \
     @mantine/notifications@^9.8.2 recharts@^3.11.1
   ```

   - Requisito: React 19.2 ou mais novo.
   - Não precisam de nova versão: `embla-carousel` 8 (o carrossel 9 aceita `>=8`), `dayjs` e `postcss-preset-mantine`.
   - O `@ui/mantine-config` `v1.3.0` já aceita o Mantine 9.

2. **Manter o visual do Mantine 8.** O Mantine 9 muda a aparência em três pontos:
   - a variante `light` (Badge, Button, ActionIcon, Alert…) passa a usar cor sólida, em vez de cor com transparência;
   - os pesos de fonte. No 8, os rótulos usavam peso 500 e os botões 600. No 9, todos usam `var(--mantine-font-weight-medium)`, que vale 600. Os rótulos ficam mais grossos;
   - o cursor. No 8, botões, selects, abas e links tinham `cursor: pointer` fixo, e o `theme.cursorType` só valia para Checkbox, Radio e Switch. No 9, cerca de 35 componentes usam o `theme.cursorType`. Com `cursorType: "default"` no tema, como estava no boilerplate, todos eles mostram a seta.

   O boilerplate mantém o visual do 8 até a revisão do tema.

   **Cores:** em `src/lib/mantine/index.ts`, `export const cssVariablesResolver = v8CssVariablesResolver`, passado em **todo** `MantineProvider`, inclusive o do `.storybook/preview.tsx` e os das páginas de erro:

   ```tsx
   <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver}>
   ```

   Para achar todos: `git grep -n "<MantineProvider" -- src .storybook`.

   **Pesos:** **não** troque `fontWeights.medium` para 500 no tema. Isso afina também os botões, que no 8 eram 600, e muda as capturas de tela. Em vez disso, o `globals.css` devolve o 500 só aos elementos que eram 500 no 8:

   ```css
   @layer mantine {
     .mantine-InputWrapper-label,
     .mantine-Menu-label,
     .mantine-Notification-title,
     .mantine-Stepper-stepLabel,
     .mantine-SegmentedControl-label,
     .mantine-Timeline-itemTitle,
     .mantine-Combobox-groupLabel,
     .mantine-Table-th {
       --mantine-font-weight-medium: 500;
     }
   }
   ```

   - Como a regra troca a variável, e não o `font-weight`, classes do projeto como `font-semibold` continuam valendo.
   - A lista vem da comparação do `styles.css` do `@mantine/core` 8.3.18 com o do 9.8.2. No 8, `Button`, `ActionIcon` e o trilho do `Switch` eram 600; esses ficam com o padrão do 9.
   **Cursor:** em `src/lib/mantine/index.ts`, `cursorType: "pointer"`. O `globals.css` devolve o `default` a quem já o usava no 8:

   ```css
   @layer mantine {
     .mantine-Checkbox-root,
     .mantine-CheckboxIndicator-indicator,
     .mantine-Radio-root,
     .mantine-RadioIndicator-indicator,
     .mantine-Switch-root {
       --mantine-cursor-type: default;
     }
   }
   ```

   Se o projeto tem `cursorType` no tema, procure com `git grep -n cursorType -- src`.

   - A story `Design System/Compatibilidade Mantine 8` mede no navegador o peso de botão, rótulo de campo, título de notificação, rótulo do `SegmentedControl` e cabeçalho de tabela, a cor do Badge `light` e o cursor de botão, `Select`, aba, `NavLink`, `Checkbox` e `Switch`. Os valores esperados foram medidos com o Mantine 8. Se um dia o tema adotar o visual do 9, tire o resolver e os blocos do CSS e atualize a story.

3. **`<Collapse in>` → `<Collapse expanded>`.** O `typecheck` aponta cada caso.

   ```bash
   git grep -n "<Collapse" -- src
   ```

4. **`<Grid gutter>` → `<Grid gap>`.** O Grid agora usa `gap` do CSS, e não margens negativas, então remova os `overflow="hidden"` que só existiam para compensar isso. Também há os novos `rowGap` e `columnGap`.

5. **Rodar `pnpm typecheck` e corrigir o que aparecer.** Ver a tabela abaixo.

## O que conferir no projeto

### Mantine

| Mudança do Mantine 9 | Como achar | O que fazer |
|---|---|---|
| `Text`/`Anchor` sem a prop `color` | `git grep -nE "<(Text\|Anchor)[^>]* color=" -- src` | `c=` |
| `Collapse in` | `git grep -n "<Collapse" -- src` | `expanded` |
| `Grid gutter` | `git grep -n "gutter" -- src` | `gap` |
| `Spoiler initialState` | `git grep -n initialState -- src` | `defaultExpanded` |
| `TypographyStylesProvider` | `git grep -n TypographyStylesProvider -- src` | `Typography` |
| `positionDependencies` (Popover/Tooltip) | `git grep -n positionDependencies -- src` | remover |
| `useFullscreen` | `git grep -n useFullscreen -- src` | `useFullscreenDocument` ou `useFullscreenElement` |
| `useMouse` | `git grep -n useMouse -- src` | segue o `ref`; para o documento, `useMousePosition` |
| `useMutationObserver` com 3º argumento | `git grep -n useMutationObserver -- src` | `useMutationObserverTarget(callback, opções, elemento)` |
| `useHeadroom` retorna objeto | `git grep -n useHeadroom -- src` | `const { pinned } = useHeadroom(…)` |
| `useLocalStorage`/`useSessionStorage` sem `defaultValue` | `git grep -nE "use(Local\|Session)Storage" -- src` | passar `defaultValue` ou tratar `undefined` |
| Tipos renomeados em `@mantine/hooks` | `git grep -nE "UseScrollSpyReturnType\|StateHistory\|\bOS\b" -- src` | `UseScrollSpyReturnValue`, `UseStateHistoryValue`, `UseOSReturnValue` |
| `zodResolver` saiu de `@mantine/form` | `git grep -n zodResolver -- src` | `schemaResolver(schema, { sync: true })` com Zod 4 |
| Segundo genérico de `useForm` | `git grep -n "useForm<" -- src` | é o tipo dos valores transformados, não o da função |
| `createPolymorphicComponent` | `git grep -n createPolymorphicComponent -- src` | `polymorphic` |
| Raio padrão `sm` → `md` | `git grep -n defaultRadius -- src` | sem `defaultRadius` no tema, o raio muda: fixe `"sm"` para manter o visual do 8 |
| `Dialog` com borda por padrão | `git grep -n "<Dialog" -- src` | `withBorder={false}` para manter |
| `mod` com chave camelCase vira `data-` em kebab-case | `git grep -n "mod={" -- src` | conferir seletores CSS que usam esses atributos |
| `keepMounted` usa `<Activity>` do React | `git grep -n keepMounted -- src` | o estado escondido é preservado; conferir efeitos que dependiam de desmontar |
| Notificações: o hover pausa todas | `git grep -n "<Notifications" -- src` | `pauseResetOnHover="notification"` para o comportamento do 8 (o boilerplate ficou com o novo) |

### Recharts 3

No boilerplate, o único gráfico é o `Sparkline`, nas stories do Card. Os projetos com painéis, como o SAPO, precisam conferir mais:

| Mudança do Recharts 3 | Como achar | O que fazer |
|---|---|---|
| Conteúdo de `Tooltip` próprio | `git grep -n "TooltipProps" -- src` | tipar com `TooltipContentProps`; `label` pode ser `string \| number \| undefined` |
| `activeIndex` removido (Bar, Pie, Scatter…) | `git grep -n activeIndex -- src` | ver https://recharts.github.io/en-US/guide/activeIndex |
| `<Customized>` sem o estado interno; `CategoricalChartState` removido | `git grep -nE "Customized\|CategoricalChartState" -- src` | componente direto como filho do gráfico, com os hooks do Recharts |
| `Pie blendStroke` removido | `git grep -n blendStroke -- src` | `stroke="none"` |
| `alwaysShow`, `isFront`, `animateNewValues`, `points` (Area/Scatter), `payload` da `Legend` | `git grep -nE "alwaysShow\|isFront\|animateNewValues" -- src` | remover |
| `recharts-scale` e `react-smooth` saíram | `git grep -nE "recharts-scale\|react-smooth" -- src` | `getNiceTickValues` vem de `recharts` |
| `accessibilityLayer` ligado por padrão | gráficos com `onMouseMove` | `accessibilityLayer={false}` se atrapalhar |
| `CartesianGrid` com `xAxisId`/`yAxisId` | gráficos com `yAxisId` diferente do padrão | o id da grade precisa bater com o do eixo, senão as linhas somem |
| Vários eixos Y em ordem alfabética do `yAxisId` | `git grep -n yAxisId -- src` | conferir a ordem na tela |
| Ordem da legenda pode mudar | `<Legend` | `itemSorter` para fixar |
| Sobreposição pela ordem de render (antes da 3.4) | rótulos e linhas de referência | conferir na tela; na 3.4+ existe `zIndex` |
| `Area connectNulls` trata `null` como 0 | `git grep -n connectNulls -- src` | conferir |

O `@mantine/charts` (`BarChart`, `LineChart`, `DonutChart`…) esconde a maior parte disso. Os pontos de atenção são os acessos diretos ao Recharts: `tooltipProps`, `barProps`, `lineProps`, `referenceLines` e componentes de `recharts` importados direto.

## Resultado no boilerplate

- **Capturas de tela: nenhuma diferença** nas 7 páginas.
- **Cores e pesos iguais aos do Mantine 8**, medidos no navegador pela story de compatibilidade, com os mesmos valores do Mantine 8.3.18 (B3).
  - As variáveis CSS geradas pelo tema batem com as do 8 em claro e escuro, e também as cores de 9 variantes × 6 cores. A única diferença são as variáveis que não existiam no 8 (`--mantine-font-weight-*` e `--mantine-color-success`).
  - Checagem de mutação: sem o `v8CssVariablesResolver`, o Badge `light` passa de `rgba(3, 82, 170, 0.1)` para `rgb(208, 231, 255)`. Sem o bloco do CSS, o rótulo do `SegmentedControl` e o título da notificação vão para 600. Nos dois casos, a story falha.
- **Cursor:** achado no teste manual do SAPO. Com o Mantine 9 e `cursorType: "default"`, botões, selects, abas e links perdiam o pointer. As capturas de tela não pegam isso, porque não mostram o cursor. A story pega: no 8.3.18 ela passa, na B4 sem a correção falha nos 4 cursores, e sem o bloco do CSS falha no `Checkbox` e no `Switch`, que viram pointer.
- **Primeira tentativa, descartada:** `fontWeights.medium: "500"` no tema. As 4 páginas de erro mudaram nas capturas, porque os botões, que no 8 eram 600, ficaram com 500. Sem nenhum ajuste de peso, as capturas não mudam, já que elas não têm rótulos. Ou seja, as capturas sozinhas não pegam a mudança dos rótulos; quem pega é a story.
- **Quebras encontradas:**
  - `Collapse in` em 4 componentes, pego pelo `typecheck`;
  - `Grid gutter` em exemplos da documentação do Storybook. Os mesmos exemplos ainda usavam `Group spacing` e `Stack spacing`, inválidos desde o Mantine 7 (o certo é `gap`); corrigidos junto.
- As 30 stories, entre elas as do `Sparkline`, passaram com o Recharts 3.
