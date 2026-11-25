import { readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"

// Com a configuração padrão todas as rotas são públicas, então o
// redirecionamento do proxy não aparece em nenhuma página. Este teste garante
// ao menos que o build registrou o proxy (src/proxy.ts) em Node, com o matcher
// do arquivo — se o arquivo for renomeado ou o export não for reconhecido, o
// Next simplesmente não roda a proteção de rotas, sem erro.
// Lê um manifesto interno do Next (.next/server): pode mudar de formato numa
// atualização do Next; nesse caso, ajustar a leitura, não apagar o teste.
test("o build registra o proxy em Node com o matcher de src/proxy.ts", () => {
  const manifesto = JSON.parse(
    readFileSync(".next/server/functions-config-manifest.json", "utf8"),
  )
  const proxy = manifesto.functions?.["/_middleware"]

  expect(proxy, "proxy ausente do build").toBeDefined()
  expect(proxy.runtime).toBe("nodejs")
  // O matcher do build tem que ser o declarado em src/proxy.ts (o arquivo
  // não é importado aqui porque puxa o next-auth para fora do Next).
  const fonte = readFileSync("src/proxy.ts", "utf8")
  expect(proxy.matchers.length).toBeGreaterThan(0)
  for (const { originalSource } of proxy.matchers) {
    expect(fonte).toContain(JSON.stringify(originalSource).slice(1, -1))
  }
})
