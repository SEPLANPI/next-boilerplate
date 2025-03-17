import { Button } from '@mantine/core'

interface FormNavigationProps {
  active: number
  isLastStep: boolean
  onBack: () => void
  onNext: () => void
}

export function FormNavigation({
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
        <Button type="submit">Enviar Cadastro</Button>
      )}
    </div>
  )
}
