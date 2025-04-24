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
import { personSchema, RegistrationType } from '../data/person-schema'
import { PersonalDataStep } from './personal-data-step'
import { RegistrationStep } from './registration-step'
import { FormNavigation } from '@/features/register-counselor/components/form-navigation'
import {
  createInitialFormValues,
  InitialFormValues
} from '@/lib/form-initial-values'
import { registerPerson } from '../actions/register-person'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { buildErrorMessage } from '@/utils/format-django-errors'

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

export type FormValues = InitialFormValues<typeof personSchema>

export function RegisterPersonForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    initialValues: {
      ...createInitialFormValues(personSchema),
      email: ''
    },
    validate: zodResolver(personSchema),
  })

  const steps = useMemo(
    () => [
      {
        label: 'Dados Pessoais',
        component: <PersonalDataStep form={form} />,
        fields: [
          'nome',
          'cpf',
          'data_nascimento',
          'telefone',
          'email',
          'municipio_id'
        ]
      },
      {
        label: 'Inscrição',
        component: <RegistrationStep form={form} />,
        fields: ['tipo_inscricao', 'eixo_id']
      }
    ],
    [form]
  )

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

  const handleAccordionChange = (value: string | null) => {
    if (!value) return
    const nextStep = steps.findIndex((step) => step.label === value)
    handleStepChange(nextStep)
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

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    const registrationMap = {
      OFICINA: 'votante',
      PLENARIA: 'ouvinte'
    } as const

    const registrationType =  registrationMap[values.tipo_inscricao as RegistrationType] 

    const payload = {
      nome: values.nome,
      cpf: values.cpf,
      telefone: values.telefone,
      email: values.email || null,
      municipio_id: values.municipio_id,
      tipo_inscricao: registrationType,
      data_nascimento: values.data_nascimento instanceof Date 
        ? values.data_nascimento.toISOString().split('T')[0]
        : null,
      ...(values.tipo_inscricao === 'OFICINA' ? { eixo_id: values.eixo_id } : {}),
    }

    const result = await registerPerson(payload)

    if (result?.error) {
      setIsSubmitting(false)
      notifications.show({
        title: 'Não foi possível realizar o cadastro',
        message: buildErrorMessage(result.error),
        color: 'red'
      })
      return
    }

    router.push('/inscrever-se/sucesso')
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
