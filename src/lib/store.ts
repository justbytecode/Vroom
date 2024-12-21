import { create } from 'zustand'

type Store = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))

