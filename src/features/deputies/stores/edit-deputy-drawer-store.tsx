import { create } from 'zustand'
import { Deputy } from '../types'

interface EditDeputyDrawerState {
  isOpen: boolean
  deputyToEdit: Deputy | null
  openEditDrawer: (deputy: Deputy) => void
  closeEditDrawer: () => void
}

export const useEditDeputyDrawer = create<EditDeputyDrawerState>((set) => ({
  isOpen: false,
  deputyToEdit: null,
  openEditDrawer: (deputy) => set({ isOpen: true, deputyToEdit: deputy }),
  closeEditDrawer: () => set({ isOpen: false, deputyToEdit: null })
}))
