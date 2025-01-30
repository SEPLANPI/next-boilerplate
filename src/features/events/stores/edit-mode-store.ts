import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectedEvent {
  id: number
  name: string
}

interface EditModeState {
  isEditMode: boolean
  selectedEvents: SelectedEvent[]
  toggleEditMode: () => void
  toggleEventSelection: (event: SelectedEvent) => void
  isSelected: (id: number) => boolean
  deselectAll: () => void
}

export const useEditModeStore = create<EditModeState>()(
  persist(
    (set, get) => ({
      isEditMode: false,
      selectedEvents: [],
      toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
      toggleEventSelection: (event) =>
        set((state) => ({
          selectedEvents: state.selectedEvents.find((e) => e.id === event.id)
            ? state.selectedEvents.filter((e) => e.id !== event.id)
            : [...state.selectedEvents, event]
        })),
      isSelected: (id) => get().selectedEvents.some((e) => e.id === id),
      deselectAll: () => set({ selectedEvents: [] })
    }),
    {
      name: 'edit-mode-storage'
    }
  )
)
