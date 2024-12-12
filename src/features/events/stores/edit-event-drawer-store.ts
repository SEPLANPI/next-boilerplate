import { create } from 'zustand'
import { Event } from '../types'

interface EventEditDrawerState {
  isOpen: boolean
  eventToEdit: Event | null
  openEditDrawer: (event: Event) => void
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
