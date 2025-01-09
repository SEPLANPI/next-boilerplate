import { create } from 'zustand'
import { Event } from '../types'

interface EventEditDrawerState {
  isOpen: boolean
  eventToEdit: Pick<
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
    | 'subcategoria'
    | 'natureza_gasto'
  > | null
  openEditDrawer: (
    event: Pick<
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
      | 'subcategoria'
      | 'natureza_gasto'
    >
  ) => void
  closeEditDrawer: () => void
}

export const useEventEditDrawer = create<EventEditDrawerState>((set) => ({
  isOpen: false,
  eventToEdit: null,
  openEditDrawer: (event) =>
    set({
      isOpen: true,
      eventToEdit: event
    }),
  closeEditDrawer: () =>
    set({
      isOpen: false,
      eventToEdit: null
    })
}))
