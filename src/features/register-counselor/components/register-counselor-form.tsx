'use client'

import { useMemo, useState, useEffect } from 'react'
import { Accordion } from '@mantine/core'
import {
  CircleAlert,
  CircleCheck,
  CircleDot,
  CircleDotDashed
} from 'lucide-react'
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
import { DeclarationStep } from './declaration-step'
import {
  createInitialFormValues,
  InitialFormValues
} from '@/lib/form-initial-values'
import { useParams } from 'next/navigation'
import { registerCounselor } from '../actions/register-counselor'
import { notifications } from '@mantine/notifications'
import { error } from 'console'
import { API } from '@/constants/messages'

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
    return <CircleAlert className="size-5 text-red-600" />
  }
  return <CircleDotDashed className="size-5 text-secondary-foreground" />
}

export function RegisterCounselorForm() {
  const { token } = useParams<{ token: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  console.log(initialValues)

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

  const isSociedadeCivil = form.values.tipo_conselho === 'SOCIEDADE_CIVIL'

  const steps = useMemo(() => {
    const baseSteps = [
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
        fields: ['conselho_id', 'tipo_conselho', 'tipo_membro']
      }
    ]

    if (isSociedadeCivil) {
      baseSteps.push({
        label: 'Dados Bancários',
        component: <BankDetailsStep form={form} />,
        fields: ['banco_id', 'agencia', 'conta', 'tipo_conta', 'nome_titular']
      })
    }

    baseSteps.push({
      label: 'Documentos',
      component: <DocumentsStep form={form} />,
      fields: [
        'rg_frente',
        'rg_verso',
        'comprovante_residencia',
        'comprovante_conselho',
        ...(isSociedadeCivil ? ['comprovante_bancario'] : [])
      ]
    })

    baseSteps.push({
      label: 'Oficina',
      component: <WorkshopStep form={form} />,
      fields: ['eixo_id']
    })

    baseSteps.push({
      label: 'Declarações',
      component: <DeclarationStep form={form} />,
      fields: ['aceite_termos', 'aceite_veracidade']
    })

    return baseSteps
  }, [form, isSociedadeCivil])

  const [active, setActive] = useState(0)
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    Array(steps.length).fill('pending')
  )

  useEffect(() => {
    setStepStatuses((prev) => {
      if (active >= steps.length) {
        setActive(steps.length - 1)
      }
      return Array(steps.length)
        .fill('pending')
        .map((_, i) => {
          if (i < active) return 'completed'
          if (i === active) return 'current'
          return 'pending'
        })
    })
  }, [steps.length])

  const isLastStep = active === steps.length - 1

  function validateStep(stepIndex: number) {
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

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    const formData = new FormData()

    formData.append('rg', values.rg)
    formData.append('telefone', values.telefone)

    formData.append('eixo_id', values.eixo_id)
    formData.append('token_convite', token)

    if (values.rg_frente instanceof File)
      formData.append('documento_rg_frente', values.rg_frente)
    if (values.rg_verso instanceof File)
      formData.append('documento_rg_verso', values.rg_verso)
    if (values.comprovante_residencia instanceof File)
      formData.append('comprovante_residencia', values.comprovante_residencia)
    if (values.comprovante_conselho instanceof File)
      formData.append('comprovante_conselho', values.comprovante_conselho)

    // Only add bank document if sociedade civil
    if (
      values.tipo_conselho === 'SOCIEDADE_CIVIL' &&
      values.comprovante_bancario instanceof File
    )
      formData.append('comprovante_bancario', values.comprovante_bancario)

    formData.append('endereco_tipo_zona', values.endereco.tipo_endereco)
    formData.append('endereco_cep', values.endereco.cep)
    formData.append('endereco_municipio', values.endereco.municipio_id)

    if (values.endereco.tipo_endereco === AddressType.URBAN) {
      formData.append('endereco_logradouro', values.endereco.rua)
      formData.append('endereco_numero', values.endereco.numero)
      formData.append('endereco_complemento', values.endereco.complemento)
      formData.append('endereco_bairro', values.endereco.bairro)
    }

    if (values.endereco.tipo_endereco === AddressType.RURAL) {
      formData.append('endereco_referencia', values.endereco.referencia)
    }

    formData.append('tipo_membro', values.tipo_membro)
    formData.append('conselho_id', values.conselho_id)
    formData.append(
      'poder_publico',
      values.tipo_conselho === 'PODER_PUBLICO' ? 'true' : 'false'
    )

    if (values.tipo_conselho === 'SOCIEDADE_CIVIL') {
      formData.append('banco_id', values.banco_id || '')
      formData.append('banco_agencia', values.agencia || '')
      formData.append('banco_conta', values.conta || '')
      formData.append('banco_nome_titular', values.nome_titular || '')
    }

    formData.append('aceitou_termos', values.aceite_termos)

    const data = await registerCounselor(formData)

    if (data?.error) {
      setIsSubmitting(false)
      notifications.show({
        title: 'Não foi possível realizar o cadastro',
        message: data.error,
        color: 'red'
      })
      return
    }
    setIsSubmitting(false)
  }

  return (
    <>
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
                    isSubmitting={isSubmitting}
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
    </>
  )
}
