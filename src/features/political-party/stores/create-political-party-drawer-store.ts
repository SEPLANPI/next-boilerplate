import { create } from 'zustand'

interface CreatePoliticalPartyDrawerState {
  isOpen: boolean
  openCreateDrawer: () => void
  closeCreateDrawer: () => void
}

export const useCreatePoliticalPartyDrawer = create<CreatePoliticalPartyDrawerState>((set) => ({
  isOpen: false,
  openCreateDrawer: () => set({ isOpen: true }),
  closeCreateDrawer: () => set({ isOpen: false })
}))
