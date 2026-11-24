import { describe, expect, it, vi } from "vitest"

// Configuração de rotas de teste: o boilerplate vem com tudo público, então
// a proteção é exercitada com rotas como as que cada projeto define.
vi.mock("@/config/routing", () => ({
  routingConfig: {
    defaults: {
      isPublic: false,
      authorizedRoles: [],
      redirects: {
        postAuthRedirectPath: "/",
        signInPagePath: "/api/auth/sign-in",
        defaultAccessDeniedPath: "/acesso-negado",
        accessDeniedPageByAllowedRole: { admin: "/acesso-negado-admin" },
      },
    },
    routes: [
      { path: "/acesso-negado", isPublic: true },
      { path: "/publico/*", isPublic: true },
      {
        path: "/admin/*",
        authorizedRoles: ["admin"],
        overrides: [{ path: "/admin/ajuda", isPublic: true }],
      },
    ],
  },
}))

const { matchRoute, checkPermissions, determineRouteAccess } = await import(
  "./matcher"
)

describe("matchRoute", () => {
  it("casa o caminho exato", () => {
    expect(matchRoute("/about", ["/about"])).toBe(true)
    expect(matchRoute("/about/x", ["/about"])).toBe(false)
  })

  it("ignora a barra no fim", () => {
    expect(matchRoute("/about/", ["/about"])).toBe(true)
    expect(matchRoute("/about", ["/about/"])).toBe(true)
  })

  it("/* casa a própria rota e as subrotas", () => {
    expect(matchRoute("/admin", ["/admin/*"])).toBe(true)
    expect(matchRoute("/admin/usuarios/1", ["/admin/*"])).toBe(true)
    expect(matchRoute("/administrador", ["/admin/*"])).toBe(false)
  })

  it(":param casa um segmento", () => {
    expect(matchRoute("/processo/123", ["/processo/:id"])).toBe(true)
    expect(matchRoute("/processo/123/sei", ["/processo/:id"])).toBe(false)
  })

  it("trata caracteres especiais da rota como texto", () => {
    expect(matchRoute("/a.b", ["/a.b"])).toBe(true)
    expect(matchRoute("/axb", ["/a.b"])).toBe(false)
  })

  it("a raiz só casa a raiz", () => {
    expect(matchRoute("/", ["/"])).toBe(true)
    expect(matchRoute("/x", ["/"])).toBe(false)
  })
})

describe("checkPermissions", () => {
  it("sem roles exigidas, libera", () => {
    expect(checkPermissions([], [])).toBe(true)
    expect(checkPermissions([], undefined, [])).toBe(true)
  })

  it("exige ao menos uma das roles", () => {
    expect(checkPermissions(["admin"], ["admin"])).toBe(true)
    expect(checkPermissions([], ["admin"])).toBe(false)
  })

  it("usa as roles padrão quando a rota não define", () => {
    expect(checkPermissions([], undefined, ["admin"])).toBe(false)
  })
})

describe("determineRouteAccess", () => {
  it("rota pública dispensa sessão", () => {
    expect(determineRouteAccess("/acesso-negado").isPublic).toBe(true)
    expect(determineRouteAccess("/publico/qualquer/coisa").isPublic).toBe(true)
  })

  it("rota não configurada herda o padrão (privada, sem role)", () => {
    expect(determineRouteAccess("/painel")).toEqual({
      isPublic: false,
      hasPermission: true,
      accessDeniedPath: "/acesso-negado",
    })
  })

  it("sem a role, nega e aponta a página da role", () => {
    expect(determineRouteAccess("/admin/usuarios", [])).toEqual({
      isPublic: false,
      hasPermission: false,
      accessDeniedPath: "/acesso-negado-admin",
    })
  })

  it("com a role, libera", () => {
    expect(
      determineRouteAccess("/admin/usuarios", ["admin"]).hasPermission,
    ).toBe(true)
  })

  it("override vale sobre o curinga do pai", () => {
    const acesso = determineRouteAccess("/admin/ajuda", [])
    expect(acesso.isPublic).toBe(true)
    expect(acesso.hasPermission).toBe(true)
  })
})
