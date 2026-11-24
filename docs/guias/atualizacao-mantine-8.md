# Atualização: Mantine 7 → 8 e next-auth beta.32

O que foi feito no boilerplate e o que cada projeto precisa conferir ao repetir. Guia oficial: https://mantine.dev/guides/7x-to-8x

## Passo a passo

1. Atualizar juntos todos os pacotes `@mantine/*` para `^8.3` e o carrossel:

   ```bash
   pnpm add @mantine/core@^8.3.18 @mantine/hooks@^8.3.18 @mantine/dates@^8.3.18 \
     @mantine/charts@^8.3.18 @mantine/carousel@^8.3.18 @mantine/form@^8.3.18 \
     @mantine/notifications@^8.3.18 embla-carousel@^8.6.0 embla-carousel-react@^8.6.0
   ```

2. `@ui/mantine-config` **por tag**, a partir da `v1.3.0` (aceita Mantine 7, 8 e 9, sem mudança visual):

   ```bash
   pnpm add "@ui/mantine-config@github:SEPLANPI/ui-mantine-config#v1.3.0"
   ```

   Sem tag, o pacote segue a `main` da lib. A `v1.2.1` só aceita Mantine 7.

3. next-auth e `@auth/core` na mesma versão que o next-auth traz:

   ```bash
   pnpm add next-auth@5.0.0-beta.32 @auth/core@0.41.3
   ```

   A beta.32 aceita Next 14, 15 e 16.

4. Remover `tailwind-preset-mantine` se não estiver em nenhuma configuração (`git grep tailwind-preset-mantine`): a v1 só aceita Mantine 7 e as seguintes exigem Tailwind 4.

## O que conferir no projeto

| Mudança do Mantine 8 | Como achar | O que fazer |
|---|---|---|
| Datas viram **string** (`YYYY-MM-DD`) em `DatePicker`, `DateInput`, `DatePickerInput`… | `git grep -nE "<(DatePicker\|DateInput\|DatePickerInput\|DateTimePicker\|MonthPickerInput\|YearPickerInput)"` | ajustar `value`/`onChange` e o que é enviado à API |
| `DatesProvider` sem `timezone` | `git grep -n "timezone" -- src` | tratar fuso com dayjs |
| `DateTimePicker`: `timeInputProps` → `timePickerProps` | `git grep -n timeInputProps` | renomear |
| `DateInput` sem `preserveTime` | `git grep -n preserveTime` | trocar de componente |
| Estilos globais divididos | `git grep -n "styles/global.css"` | importar também `baseline.css` e `default-css-variables.css` — quem importa `styles.css`/`styles.layer.css` completo não precisa |
| `Menu.Item` sem `data-hovered` | `git grep -n data-hovered` | usar `&:hover, &:focus` |
| `Popover` com `hideDetached` padrão `true` | popovers dentro de áreas com rolagem/abas | `hideDetached={false}` onde o dropdown precisar ficar aberto |
| `Portal` com `reuseTargetNode` padrão `true` | problemas de camada (z-index) em menus/modais | `Portal.extend({ defaultProps: { reuseTargetNode: false } })` no tema |
| Carousel: embla 8, opções em `emblaOptions`, sem `speed`/`draggable`/`useAnimationOffsetEffect` | `git grep -n "<Carousel"` | mover `loop`, `align`, `slidesToScroll`… para `emblaOptions` |
| `Switch` com indicador no polegar | `git grep -n "<Switch"` | `withThumbIndicator={false}` se não quiser |

## Diferenças visuais encontradas no boilerplate

Comparadas pelas capturas de tela (`tests/e2e`):

- **`Code`**: fundo `gray-1` → `gray-0` e o texto deixa de ser forçado preto (herda a cor do texto). Única diferença nas 7 páginas.
- Do guia, sem uso no boilerplate: `Notification` com mais espaçamento, `SegmentedControl` com a altura dos inputs, `ScrollArea` sem `display: table`.

## Outras mudanças desta etapa
- `lang="pt-BR"` no `<html>` (era `en`), `export const viewport` em vez da meta manual, fonte com `display: "swap"`.
- Removido `storybook-addon-next-router` (Storybook 6, não usado; gerava avisos de peer com React 19).
