import { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { routingConfig } from '@/config/routing'

// Usuários mock para demonstração
export const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Administrador',
    roles: ['admin', 'user'],
    permissions: ['read', 'write', 'delete', 'manage_users']
  },
  {
    id: '2', 
    email: 'user@example.com',
    name: 'Usuário Padrão',
    roles: ['user'],
    permissions: ['read', 'write']
  },
  {
    id: '3',
    email: 'viewer@example.com', 
    name: 'Visualizador',
    roles: ['viewer'],
    permissions: ['read']
  }
]

// Simula verificação de credenciais
const verifyCredentials = async (email: string, password: string) => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const user = mockUsers.find(u => u.email === email)
  
  // Para demonstração, qualquer senha funciona
  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: new Date(),
      roles: user.roles,
      permissions: user.permissions
    }
  }
  
  return null
}

// Simula refresh token
export const mockRefreshToken = async (token: any) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const user = mockUsers.find(u => u.id === token.sub)
  if (!user) {
    throw new Error('Usuário não encontrado')
  }
  
  return {
    ...token,
    accessToken: `mock_access_token_${Date.now()}`,
    accessTokenExpires: Date.now() + 3600 * 1000, // 1 hora
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      permissions: user.permissions
    }
  }
}

// Simula verificação de sessão
export const mockVerifySession = async (token: string) => {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Simula token válido se contém "mock_access_token"
  return token.includes('mock_access_token')
}

export const mockAuthConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Mock Auth',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const user = await verifyCredentials(
          credentials.email as string, 
          credentials.password as string
        )
        return user
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true
      }
      return routingConfig.defaults.redirects.signInPagePath
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
        session.error = token.error
        session.accessToken = token.accessToken
      }
      return session
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        // Login inicial
        return {
          ...token,
          user,
          accessToken: `mock_access_token_${Date.now()}`,
          accessTokenExpires: Date.now() + 3600 * 1000, // 1 hora
        }
      }

      // Verifica se o token expirou
      if (Date.now() > (token.accessTokenExpires as number) || trigger === 'update') {
        return mockRefreshToken(token)
      }

      // Verifica se o token é válido
      if (token.accessToken) {
        const isValid = await mockVerifySession(token.accessToken as string)
        if (!isValid) {
          return { ...token, error: 'TokenInvalidError' }
        }
      }

      return token
    },
    async authorized({ auth }) {
      return !!auth && !auth.error
    }
  },
  pages: {
    signIn: '/api/auth/sign-in',
    error: '/erro-autenticacao'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 horas
  }
}
