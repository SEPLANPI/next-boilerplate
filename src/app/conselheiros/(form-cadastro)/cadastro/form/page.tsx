import { RegisterCounselorForm } from '@/features/register-counselor/components/register-counselor-form'
import { registerCounselorSearchParams } from '@/features/register-counselor/lib/search-params'
import Image from 'next/image'
import { SearchParams } from 'nuqs/server'

interface CadastroConselheiroFormProps {
  searchParams: Promise<SearchParams>
}

export default async function CadastroConselheiroForm({
  searchParams
}: CadastroConselheiroFormProps) {
  await registerCounselorSearchParams.parse(searchParams)

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center py-5 sm:justify-end sm:pr-20">
      <Image
        src="/background-conselheiro-form.png"
        width={5760}
        height={3240}
        quality={100}
        alt="Senhor com fundo verde"
        className="fixed left-0 top-0 z-0 h-[100dvh] w-full object-cover"
      />
      <div className="relative z-10 flex min-h-[90dvh] w-[90%] flex-col rounded-md bg-white p-6 shadow sm:min-h-[680px] sm:w-[600px]">
        <RegisterCounselorForm />
      </div>
    </div>
  )
}
