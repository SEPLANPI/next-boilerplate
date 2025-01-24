import { Event } from './index'
export type EditEvent = Pick<
  Event,
  | 'id'
  | 'nome'
  | 'editado'
  | 'data'
  | 'local'
  | 'municipio_id'
  | 'descricao'
  | 'objetivo'
  | 'categoria'
  | 'contratos'
>
