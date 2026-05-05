import { signIn } from "@/auth"
import { routingConfig } from "@/config/routing"
import { Button } from "@mantine/core"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Erro de Autenticação",
}

interface AuthErrorPageProps {
  searchParams: Promise<{
    error?: string
    redirectTo?: string
  }>
}

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const {
    error = "unknown",
    redirectTo = routingConfig.defaults.redirects.postAuthRedirectPath,
  } = await searchParams

  const getErrorMessage = (errorType: string) => {
    switch (errorType) {
      case "TokenExpiredError":
        return {
          title: "Token Expirado",
          description:
            "Seu token de acesso expirou. Por favor, faça login novamente.",
        }
      case "RefreshAccessTokenError":
        return {
          title: "Erro ao Renovar Token",
          description:
            "Não foi possível renovar sua sessão automaticamente. Faça login novamente.",
        }
      case "TokenInvalidError":
        return {
          title: "Token Inválido",
          description:
            "Sua sessão é inválida ou foi comprometida. Por favor, faça login novamente.",
        }
      case "AccessDenied":
        return {
          title: "Acesso Negado",
          description: "Você não possui permissão para acessar este recurso.",
        }
      case "Configuration":
        return {
          title: "Erro de Configuração",
          description:
            "Há um problema na configuração de autenticação. Entre em contato com o suporte.",
        }
      case "Verification":
        return {
          title: "Erro de Verificação",
          description:
            "Não foi possível verificar suas credenciais. Tente novamente.",
        }
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
      case "OAuthAccountNotLinked":
        return {
          title: "Erro no Provedor de Autenticação",
          description:
            "Ocorreu um erro durante o processo de autenticação. Tente fazer login novamente.",
        }
      case "EmailSignin":
        return {
          title: "Erro no Login por Email",
          description:
            "Não foi possível enviar o email de verificação. Verifique seu endereço de email.",
        }
      case "CredentialsSignin":
        return {
          title: "Credenciais Inválidas",
          description:
            "As credenciais fornecidas são inválidas. Verifique seu usuário e senha.",
        }
      case "SessionRequired":
        return {
          title: "Sessão Necessária",
          description:
            "Esta página requer que você esteja autenticado. Por favor, faça login.",
        }
      default:
        return {
          title: "Erro de Autenticação",
          description:
            "Ocorreu um erro inesperado durante a autenticação. Tente novamente.",
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="container mx-auto max-w-md space-y-6 px-4 text-center">
        <div className="flex justify-center">
          <div className="rounded-lg  bg-red-50 p-4">
            <AlertTriangle className="size-8 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-content-emphasis">
            {errorInfo.title}
          </h1>
          <p className="text-content-muted">{errorInfo.description}</p>
        </div>

        {error !== "unknown" && (
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-content-muted">
              Código do erro:{" "}
              <code className="rounded bg-gray-200 px-1">{error}</code>
            </p>
          </div>
        )}

        <div className="space-y-4">
          <form
            action={async () => {
              "use server"
              await signIn("keycloak", { redirectTo })
            }}
          >
            <Button
              size="md"
              type="submit"
              rightSection={<RefreshCw className="size-4" />}
            >
              Tentar Novamente
            </Button>
          </form>

          <Button
            component={Link}
            href="/"
            variant="subtle"
            rightSection={<Home className="size-4" />}
          >
            Voltar para Página Inicial
          </Button>
        </div>

        <div className="space-y-1 text-xs text-content-muted">
          <p>
            Se o problema persistir, entre em contato com o suporte técnico.
          </p>
        </div>
      </div>
    </div>
  )
}
