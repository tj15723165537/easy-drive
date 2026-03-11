import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { HOME_URL } from '@/config/config'

interface TabsState {
  tabsActive: string
  tabsList: Menu.MenuOptions[]
  setTabsList: (tabs: Menu.MenuOptions[]) => void
  setTabsActive: (path: string) => void
}

const useTabsStore = create(
  persist<TabsState>(
    (set) => ({
      tabsActive: HOME_URL,
      tabsList: [{ title: '首页', path: HOME_URL }],
      setTabsList: (tabsList) => set({ tabsList }),
      setTabsActive: (tabsActive) => set({ tabsActive }),
    }),
    { name: 'tabs-storage', storage: createJSONStorage(() => localStorage) }
  )
)

export default useTabsStore
