'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { mockUsers } from '@/lib/auth/mock-auth'
import { Card, Text, TextInput, PasswordInput, Button, Stack, Alert, Group, Badge } from '@mantine/core'
import { AlertCircle, User, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Credenciais inválidas')
      } else {
        router.push(redirectTo)
      }
    } catch (error) {
      setError('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = async (userEmail: string) => {
    setEmail(userEmail)
    setPassword('any-password')
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: userEmail,
        password: 'any-password',
        redirect: false
      })

      if (result?.error) {
        setError('Erro ao fazer login')
      } else {
        router.push(redirectTo)
      }
    } catch (error) {
      setError('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="lg">
            <div className="text-center">
              <Text size="xl" fw={700} c="dimmed">
                🔐 Login Mock
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Sistema de autenticação para demonstração
              </Text>
            </div>

            {error && (
              <Alert icon={<AlertCircle size={16} />} title="Erro" color="red">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftSection={<User size={16} />}
                  required
                />
                
                <PasswordInput
                  label="Senha"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftSection={<Lock size={16} />}
                  required
                />

                <Button 
                  type="submit" 
                  loading={isLoading}
                  fullWidth
                >
                  Entrar
                </Button>
              </Stack>
            </form>

            <div className="border-t pt-4">
              <Text size="sm" fw={500} mb="md">
                👥 Usuários para demonstração:
              </Text>
              
              <Stack gap="xs">
                {mockUsers.map((user) => (
                  <div key={user.id} className="border rounded p-3">
                    <Group justify="space-between" mb="xs">
                      <div>
                        <Text size="sm" fw={500}>
                          {user.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {user.email}
                        </Text>
                      </div>
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() => handleQuickLogin(user.email)}
                        loading={isLoading}
                      >
                        Usar
                      </Button>
                    </Group>
                    
                    <Group gap="xs">
                      {user.roles.map((role) => (
                        <Badge key={role} size="xs" variant="outline">
                          {role}
                        </Badge>
                      ))}
                    </Group>
                    
                    <Text size="xs" c="dimmed" mt="xs">
                      Permissões: {user.permissions.join(', ')}
                    </Text>
                  </div>
                ))}
              </Stack>
            </div>

            <Alert icon={<AlertCircle size={16} />} color="blue">
              <Text size="xs">
                <strong>Nota:</strong> Para demonstração, qualquer senha funciona. 
                Em produção, use as credenciais reais do Keycloak.
              </Text>
            </Alert>
          </Stack>
        </Card>
      </div>
    </div>
  )
}
