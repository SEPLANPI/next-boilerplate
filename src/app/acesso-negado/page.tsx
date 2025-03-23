import { AccessDeniedLayout } from '@/components/layouts/access-denied-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acesso Negado'
}

export default function AccessDenied() {
  return (
    <AccessDeniedLayout
      title="Acesso Negado"
      description="Você não possui as permissões necessárias para acessar este sistema."
      suggestions={[
        'Verifique se você está logado com a conta correta',
        'Entre em contato com o administrador do sistema para solicitar acesso',
        'Se você possui múltiplos perfis, tente acessar com outro perfil'
      ]}
    />
  )
}
