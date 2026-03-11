import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface BreadcrumbState {
  breadcrumbList: { [key: string]: Menu.MenuOptions[] }
  setBreadcrumbList: (list: { [key: string]: Menu.MenuOptions[] }) => void
}

const useBreadcrumbStore = create(
  persist<BreadcrumbState>(
    (set) => ({
      breadcrumbList: {},
      setBreadcrumbList: (breadcrumbList) => set({ breadcrumbList }),
    }),
    { name: 'breadcrumb-storage', storage: createJSONStorage(() => localStorage) }
  )
)

export default useBreadcrumbStore
