import { create } from 'zustand'
import { Event } from '../types'

interface EventEditDrawerState {
  isOpen: boolean
  eventToEdit: Pick<Event, 'id' | 'nome' | 'editado' | 'data' | 'local' | 'municipio_id'| 'descricao' | 'objetivo'> | null
  openEditDrawer: (event: Pick<Event, 'id' | 'nome' | 'editado' | 'data' | 'local' | 'municipio_id'| 'descricao' | 'objetivo'>) => void
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
