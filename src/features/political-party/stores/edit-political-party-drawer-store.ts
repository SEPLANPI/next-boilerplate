import { create } from 'zustand'
import { PoliticalParty } from '../types'

interface EditPoliticalPartyDrawerState {
  isOpen: boolean
  partyToEdit: PoliticalParty | null
  openEditDrawer: (party: PoliticalParty) => void
  closeEditDrawer: () => void
}

export const useEditPoliticalPartyDrawer =
  create<EditPoliticalPartyDrawerState>((set) => ({
    isOpen: false,
    partyToEdit: null,
    openEditDrawer: (party) => set({ isOpen: true, partyToEdit: party }),
    closeEditDrawer: () => set({ isOpen: false, partyToEdit: null })
  }))
