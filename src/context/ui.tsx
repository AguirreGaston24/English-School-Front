import { create } from 'zustand'

interface UiContextState {
  openMenu: boolean;
  setOpenMenu: (state: boolean) => void;
}

export const useUiContext = create<UiContextState>((set) => ({
  openMenu: false,
  setOpenMenu: (state: boolean) => set({ openMenu: state }),
}))