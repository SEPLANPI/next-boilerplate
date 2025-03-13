'use client'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Stepper } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'
import { PersonalDataStep } from './personal-data-step'
import { AddressStep } from './address-step'
import { AddressType } from '../types/counselor'
import { BankDetailsStep } from './bank-detail-step'
import { CouncilInfoStep } from './council-info-step'
import { DocumentsStep } from './documents-step'
import { FormNavigation } from './form-navigation'
import { WorkshopStep } from './workshop-step'
import { counselorSchema } from '../data/counselor-schema'
import { FormCompletionView } from './form-completion.view'
import {
  createInitialFormValues,
  InitialFormValues
} from '@/lib/form-initial-values'

type FormValues = Omit<
  InitialFormValues<typeof counselorSchema>,
  'endereco'
> & {
  endereco:
    | {
        tipo_endereco: 'URBANA'
        rua: string
        numero: string
        complemento: string
        bairro: string
        cep: string
        municipio_id: string
      }
    | {
        tipo_endereco: 'RURAL'
        referencia: string
        cep: string
        municipio_id: string
      }
}

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h2 className="mx-auto my-4 block w-fit border-b-2 border-govBlue-600 text-center text-lg font-semibold">
      {children}
    </h2>
  )
}

export function RegisterCounselorForm() {
  const initialValues = useMemo(() => ({
    ...createInitialFormValues(counselorSchema),
    endereco: {
      tipo_endereco: AddressType.URBAN,
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      referencia: '',
      cep: '',
      municipio_id: ''
    }
  }), [])

  const form = useForm<FormValues>({
    initialValues,
    validate: zodResolver(counselorSchema)
  })

  useEffect(() => {
    console.log('dasdas')
  }, [form.values.nome])

  const steps = [
    {
      label: 'Dados Pessoais',
      component: <PersonalDataStep form={form} />,
      fields: [
        'nome',
        'cpf',
        'rg',
        'data_nascimento',
        'telefone',
        'email',
        'tipo_conselho',
        'tipo_membro'
      ]
    },
    {
      label: 'Endereço',
      component: <AddressStep form={form} />,
      fields: [
        'endereco.tipo_endereco',
        'endereco.rua',
        'endereco.logradouro',
        'endereco.numero',
        'endereco.complemento',
        'endereco.bairro',
        'endereco.referencia',
        'endereco.cep',
        'endereco.municipio_id'
      ]
    },
    {
      label: 'Conselho',
      component: <CouncilInfoStep form={form} />,
      fields: ['conselho', 'tipo_conselho', 'tipo_membro']
    },
    {
      label: 'Dados Bancários',
      component: <BankDetailsStep form={form} />,
      fields: ['banco_id', 'agencia', 'conta', 'tipo_conta']
    },
    {
      label: 'Oficina',
      component: <WorkshopStep form={form} />,
      fields: ['oficina']
    },
    {
      label: 'Documentos',
      component: <DocumentsStep form={form} />,
      fields: [
        'rg_frente',
        'rg_verso',
        'comprovante_residencia',
        'comprovante_conselh',
        'comprovante_bancario'
      ]
    }
  ]

  const [active, setActive] = useState(0)
  const isLastStep = active === steps.length - 1

  function validateCurrentStep() {
    return false
    return steps[active].fields.reduce((acc, field) => {
      const { hasError } = form.validateField(field)
      return acc || hasError
    }, false)
  }

  const handleStepChange = (nextStep: number) => {
    const hasErrors = validateCurrentStep()
    if (nextStep > active && hasErrors) return
    setActive(nextStep)
  }

  const handleSubmit = (values: FormValues) => {
    console.log('Form submitted:', values)
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-1 flex-col justify-between"
    >
      <Stepper
        active={active}
        onStepClick={handleStepChange}
        classNames={{
          steps: 'space-x-2',
          step: 'h-1 rounded bg-gray-500 data-[completed=true]:bg-govBlue-600 flex-1',
          stepWrapper: 'hidden',
          separator: 'hidden',
          stepBody: 'hidden'
        }}
      >
        {steps.map((step, index) => (
          <Stepper.Step key={step.label} label={step.label}>
            <SectionTitle>{step.label}</SectionTitle>
            <section className="grid grid-cols-2 gap-4">
              {index === active && step.component}
            </section>
          </Stepper.Step>
        ))}

        <Stepper.Completed>
          <FormCompletionView />
        </Stepper.Completed>
      </Stepper>

      <FormNavigation
        active={active}
        isLastStep={isLastStep}
        onBack={() => handleStepChange(active - 1)}
        onNext={() => handleStepChange(active + 1)}
      />
    </form>
  )
}
