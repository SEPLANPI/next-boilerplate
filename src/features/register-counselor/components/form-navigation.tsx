import { Button } from '@mantine/core'

interface FormNavigationProps {
  active: number
  isLastStep: boolean
  onBack: () => void
  onNext: () => void
  isSubmitting: boolean
}

export function FormNavigation({
  isSubmitting = false,
  active,
  isLastStep,
  onBack,
  onNext
}: FormNavigationProps) {
  return (
    <div className="mt-6 flex items-center justify-end space-x-4">
      <Button variant="light" onClick={onBack} disabled={active === 0}>
        Voltar
      </Button>

      {!isLastStep ? (
        <Button onClick={onNext}>Avançar</Button>
      ) : (
        <Button type="submit" loading={isSubmitting}>
          Finalizar inscrição
        </Button>
      )}
    </div>
  )
}
