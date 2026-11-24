import { cache } from "react"
import { auth } from "@/auth"

/**
 * `auth()` uma vez por renderização no servidor: o layout raiz e cada
 * chamada à API feita durante a mesma requisição reaproveitam a mesma
 * sessão (o callback `jwt` roda uma vez, não uma por chamada).
 *
 * Sem `import "server-only"` de propósito: o `nextAuthInterceptor` é
 * compartilhado com o navegador e importa este módulo dinamicamente só no
 * ramo do servidor.
 */
export const sessaoDoServidor = cache(() => auth())
