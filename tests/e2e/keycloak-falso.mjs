// Keycloak falso, SÓ PARA OS TESTES DE PONTA A PONTA. Sobe junto com o
// Playwright (webServer) e responde o mínimo que o app usa com uma sessão já
// aberta: o introspect. Também conta as chamadas recebidas, para os testes
// medirem quantas vezes o app vai ao Keycloak por página.
//
//   GET  /__chamadas          → { introspect: n, ... }
//   POST /__zerar             → zera os contadores
//   POST /__sessao?ativa=0|1  → simula sessão encerrada/ativa no Keycloak

import { createServer } from "node:http"
import { PORTA_KEYCLOAK } from "./ambiente.mjs"

const REALM = "/realms/teste"
let chamadas = {}
let sessaoAtiva = true

function contar(nome) {
  chamadas[nome] = (chamadas[nome] ?? 0) + 1
}

function json(resposta, status, corpo) {
  resposta.writeHead(status, { "Content-Type": "application/json" })
  resposta.end(JSON.stringify(corpo))
}

createServer((requisicao, resposta) => {
  const url = new URL(requisicao.url, "http://localhost")

  if (url.pathname === "/__chamadas") return json(resposta, 200, chamadas)
  if (url.pathname === "/__zerar") {
    chamadas = {}
    sessaoAtiva = true
    return json(resposta, 200, {})
  }
  if (url.pathname === "/__sessao") {
    sessaoAtiva = url.searchParams.get("ativa") !== "0"
    return json(resposta, 200, { sessaoAtiva })
  }

  if (url.pathname === `${REALM}/protocol/openid-connect/token/introspect`) {
    contar("introspect")
    return json(resposta, 200, { active: sessaoAtiva })
  }

  if (url.pathname === `${REALM}/.well-known/openid-configuration`) {
    contar("discovery")
    const base = `http://127.0.0.1:${PORTA_KEYCLOAK}${REALM}/protocol/openid-connect`
    return json(resposta, 200, {
      issuer: `http://127.0.0.1:${PORTA_KEYCLOAK}${REALM}`,
      authorization_endpoint: `${base}/auth`,
      token_endpoint: `${base}/token`,
      userinfo_endpoint: `${base}/userinfo`,
      end_session_endpoint: `${base}/logout`,
      jwks_uri: `${base}/certs`,
    })
  }

  contar(`outro ${url.pathname}`)
  json(resposta, 404, { error: "não simulado" })
}).listen(PORTA_KEYCLOAK, "127.0.0.1", () => {
  console.log(`Keycloak falso (testes) em http://127.0.0.1:${PORTA_KEYCLOAK}`)
})
