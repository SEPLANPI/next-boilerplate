import {
  Badge,
  Button,
  Checkbox,
  NavLink,
  Notification,
  SegmentedControl,
  Select,
  Switch,
  Table,
  Tabs,
  TextInput,
} from "@mantine/core"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

/**
 * Confere no navegador que o tema mantém o visual do Mantine 8 no Mantine 9
 * (variante `light` com transparência, pesos de fonte e cursor). Os valores esperados
 * foram medidos nesta mesma story com o Mantine 8.3.18.
 * Ver docs/guias/atualizacao-mantine-9.md.
 */
const meta: Meta = {
  title: "Design System/Compatibilidade Mantine 8",
  parameters: { layout: "padded" },
}

export default meta

const ESPERADO = {
  botao: "600",
  rotuloCampo: "500",
  tituloNotificacao: "500",
  rotuloSegmentado: "500",
  cabecalhoTabelaVertical: "600",
  fundoBadgeLight: "rgba(3, 82, 170, 0.1)",
  cursorBotao: "pointer",
  cursorSelect: "pointer",
  cursorAba: "pointer",
  cursorNavLink: "pointer",
  cursorCheckbox: "default",
  cursorSwitch: "default",
}

export const Medicao: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Button>Botão</Button>
      <TextInput label="Rótulo do campo" />
      <Notification title="Título da notificação" withCloseButton={false}>
        Texto
      </Notification>
      <SegmentedControl data={["Opção A", "Opção B"]} />
      <Badge variant="light">Badge light</Badge>
      <Table variant="vertical">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>Cabeçalho vertical</Table.Th>
            <Table.Td>Valor</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Select placeholder="Select" data={["A", "B"]} />
      <Tabs defaultValue="a">
        <Tabs.List>
          <Tabs.Tab value="a">Aba A</Tabs.Tab>
          <Tabs.Tab value="b">Aba B</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <NavLink href="#" label="Link de navegação" />
      <Checkbox label="Checkbox" />
      <Switch label="Switch" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const estilo = (el: Element) => getComputedStyle(el)
    const peso = (el: Element) => estilo(el).fontWeight
    const cursor = (el: Element) => estilo(el).cursor

    const medido = {
      botao: peso(canvas.getByRole("button", { name: "Botão" })),
      rotuloCampo: peso(canvas.getByText("Rótulo do campo")),
      tituloNotificacao: peso(canvas.getByText("Título da notificação")),
      rotuloSegmentado: peso(canvas.getByText("Opção A")),
      cabecalhoTabelaVertical: peso(canvas.getByText("Cabeçalho vertical")),
      fundoBadgeLight: estilo(
        canvas.getByText("Badge light").closest(".mantine-Badge-root")!,
      ).backgroundColor,
      cursorBotao: cursor(canvas.getByRole("button", { name: "Botão" })),
      cursorSelect: cursor(canvas.getByPlaceholderText("Select")),
      cursorAba: cursor(canvas.getByRole("tab", { name: "Aba B" })),
      cursorNavLink: cursor(
        canvas.getByText("Link de navegação").closest("a")!,
      ),
      cursorCheckbox: cursor(
        canvas.getByRole("checkbox", { name: "Checkbox" }),
      ),
      cursorSwitch: cursor(
        canvasElement.querySelector(".mantine-Switch-track")!,
      ),
    }

    await expect(medido).toEqual(ESPERADO)
  },
}
