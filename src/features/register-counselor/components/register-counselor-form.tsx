'use client'
import { useMemo, useState } from 'react'
import { Accordion } from '@mantine/core'
import { CircleCheck, CircleDot, CircleDotDashed } from 'lucide-react'
import { useForm, zodResolver } from '@mantine/form'
import { PersonalDataStep } from './personal-data-step'
import { AddressStep } from './address-step'
import { AddressType } from '../types/counselor'
import { BankDetailsStep } from './bank-detail-step'
import { CouncilInfoStep } from './council-info-step'
import { DocumentsStep } from './documents-step'
import { FormNavigation } from './form-navigation'
import { WorkshopStep } from './workshop-step'
import { counselorSchema } from '../data/counselor-schema'
import {
  createInitialFormValues,
  InitialFormValues
} from '@/lib/form-initial-values'

export type FormValues = Omit<
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

type StepStatus = 'pending' | 'error' | 'completed' | 'current'

function StepStatus({ status }: { status: StepStatus }) {
  if (status === 'completed') {
    return <CircleCheck className="size-5 text-green-900" />
  }
  if (status === 'current') {
    return <CircleDot className="size-5 text-blue-900" />
  }
  if (status === 'error') {
    return <CircleDotDashed className="size-5 text-red-600" />
  }
  return <CircleDotDashed className="size-5 text-gray-600" />
}

export function RegisterCounselorForm() {
  const initialValues = useMemo(
    () => ({
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
    }),
    []
  )

  const form = useForm<FormValues>({
    initialValues,
    validate: zodResolver(counselorSchema),
    transformValues: (values) => ({
      ...values,
      telefone: values.telefone.replace(/\D/g, ''),
      endereco: {
        ...values.endereco,
        cep: values.endereco.cep.replace(/\D/g, '')
      }
    })
  })

  const steps = [
    {
      label: 'Dados Pessoais',
      component: <PersonalDataStep form={form} />,
      fields: ['rg', 'telefone']
    },
    {
      label: 'Endereço',
      component: <AddressStep form={form} />,
      fields: [
        'endereco.tipo_endereco',
        'endereco.rua',
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
      label: 'Documentos',
      component: <DocumentsStep form={form} />,
      fields: [
        'rg_frente',
        'rg_verso',
        'comprovante_residencia',
        'comprovante_conselho',
        'comprovante_bancario'
      ]
    },
    {
      label: 'Oficina',
      component: <WorkshopStep form={form} />,
      fields: ['eixo_id']
    }
  ]

  const [active, setActive] = useState(0)
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    Array(steps.length).fill('pending')
  )
  const isLastStep = active === steps.length - 1

  function validateStep(stepIndex: number) {
    return true
    const hasErrors = steps[stepIndex].fields.reduce((acc, field) => {
      const { hasError } = form.validateField(field)
      return acc || hasError
    }, false)
    return !hasErrors
  }

  const handleStepChange = (nextStep: number) => {
    if (nextStep > active) {
      const isValid = validateStep(active)
      if (!isValid) {
        setStepStatuses((prev) =>
          prev.map((status, i) => (i === active ? 'error' : status))
        )
        return
      }
    }

    setStepStatuses((prev) =>
      prev.map((status, i) =>
        i === active
          ? validateStep(active)
            ? 'completed'
            : 'error'
          : i === nextStep
            ? 'current'
            : status
      )
    )
    setActive(nextStep)
  }

  const handleAccordionChange = (value: string | null) => {
    if (!value) return
    const nextStep = steps.findIndex((step) => step.label === value)
    handleStepChange(nextStep)
  }

  const handleSubmit = (values: FormValues) => {
    console.log('Form submitted:', values)
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-1 flex-col justify-between"
    >
      <Accordion
        value={steps[active].label}
        onChange={handleAccordionChange}
        classNames={{
          root: 'space-y-4',
          item: 'bg-white rounded-md shadow-md',
          control: 'rounded-md p-6 ',
          label: 'font-semibold text-md p-0',
          content: 'p-6 pt-0'
        }}
      >
        {steps.map((step, index) => (
          <Accordion.Item key={step.label} value={step.label}>
            <Accordion.Control
              icon={<StepStatus status={stepStatuses[index]} />}
            >
              {step.label}
            </Accordion.Control>
            <Accordion.Panel>
              <section className="grid grid-cols-2 gap-6">
                {step.component}
              </section>
              {index === active && (
                <FormNavigation
                  active={active}
                  isLastStep={isLastStep}
                  onBack={() => handleStepChange(active - 1)}
                  onNext={() => handleStepChange(active + 1)}
                />
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </form>
  )
}
