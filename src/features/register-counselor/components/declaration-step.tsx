import { UseFormReturnType } from '@mantine/form'
import { Checkbox } from '@mantine/core'
import { FormValues } from './register-counselor-form'

export function DeclarationStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  return (
    <div className="col-span-2 space-y-6">
      <Checkbox
        label="Declaro que as informações acima são verdadeiras e autorizo a utilização dos dados fornecidos para fins administrativos do evento"
        {...form.getInputProps('aceite_veracidade', { type: 'checkbox' })}
      />
      <Checkbox
        label="Aceito os termos e condições do evento, conforme descrito no regulamento."
        {...form.getInputProps('aceite_termos', { type: 'checkbox' })}
      />
      <div className="space-y-4 text-sm">
        <h6 className="font-semibold">Observações Importantes</h6>
        <ul className="list-disc pl-6">
          <li>
            A não participação no evento implica na devolução do valor referente
            à diária.
          </li>
          <li>
            O preenchimento incorreto das informações acima implicará no
            indeferimento da inscrição.
          </li>
        </ul>
      </div>
    </div>
  )
}
