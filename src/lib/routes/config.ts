import { RouteConfig, UnauthorizedRoutingConfig } from './types'

// Notas de Configuração de Rotas:
// - Todas as rotas são protegidas por padrão
// - Use 'type: "public"' para tornar explicitamente uma rota pública
// - Use 'exceptions' para definir controle de acesso granular
// - Use '/*' no final da rota para aplicar configuração nas subrotas

export const routeConfig: RouteConfig[] = [
  // Rota pública: /perfil, rota inteira e subrotas acessíveis
  // {
  //   path: '/perfil/*',
  //   type: 'public'
  // },
  // Rota pública: /dashboard, mas com algumas subrotas protegidas
  // {
  //   path: '/dashboard/*',
  //   type: 'public',
  //   exceptions: {
  //     // Essas subrotas específicas permanecem protegidas
  //     protected: ['/dados-sensiveis', '/painel-admin']
  //   }
  // },
  // Rota pública: /ajuda, não torna subrotas acessíveis
  // {
  //   path: '/ajuda',
  //   type: 'public',
  // }
]

// Configuração de roteamento não autorizado:
// - Define o caminho padrão para redirecionamento quando o acesso não é autorizado
// - Permite caminhos de redirecionamento específicos para rotas protegidas
// - Atenção, lembre-se de tornar as rotas para redirecionamento públicas
export const unauthorizedConfig: UnauthorizedRoutingConfig = {
  // Caminho padrão para login quando o usuário não está autenticado
  defaultUnauthorizedPath: '/api/auth/sign-in',

  // Caminhos de redirecionamento específicos para rotas protegidas
  // Útil para diferentes níveis de autenticação ou fluxos de login
  routeSpecificPaths: {
    // Exemplo: redirecionar para login de admin em rotas administrativas
    // '/admin/*': '/api/auth/login-admin',
    // Exemplo: redirecionar para login com credenciais elevadas
    // '/dashboard/dados-sensiveis': '/api/auth/login-acesso-elevado'
  }
}
