import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface MenuState {
  isCollapse: boolean
  menuList: Menu.MenuOptions[]
  updateCollapse: (isCollapse: boolean) => void
  setMenuList: (menuList: Menu.MenuOptions[]) => void
}

const useMenuStore = create(
  persist<MenuState>(
    (set) => ({
      isCollapse: false,
      menuList: [],
      updateCollapse: (isCollapse) => set({ isCollapse }),
      setMenuList: (menuList) => set({ menuList }),
    }),
    { name: 'menu-storage', storage: createJSONStorage(() => localStorage) }
  )
)

export default useMenuStore
