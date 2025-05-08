import { Logo } from '@/components/ui/logo/logo'
import { IdentityVerificationLayout } from '@/features/voting/components/layouts/identity-verification-layout'
import { VerifyCPFForm } from '@/features/voting/components/layouts/verify-cpf-form'

export const metadata = {
  title: 'Identifique-se para votar'
}

export default function ValidadeCPFPage() {
  return (
    <IdentityVerificationLayout>
      <div className="mx-auto">
        <Logo />
      </div>
      <div className="w-full">
        <h1 className="mx-auto mb-2 text-lg font-bold">
          Identifique-se para votar
        </h1>
        <div className="space-y-2 text-sm">
          <p>Para votar, informe seu CPF utilizado na inscrição do evento.</p>
          <p>Apenas participantes inscritos poderão acessar a votação.</p>
        </div>
      </div>
      <VerifyCPFForm />
    </IdentityVerificationLayout>
  )
}
