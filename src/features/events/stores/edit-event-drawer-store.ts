import { create } from 'zustand'
import { EditEvent } from '../types/edit-event'

interface EventEditDrawerState {
  isOpen: boolean
  eventToEdit: EditEvent | null

  openEditDrawer: (event: EditEvent) => void
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
