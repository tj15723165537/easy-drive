import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { SizeType } from 'antd/es/config-provider/SizeContext'

// 定义用户信息类型
export interface UserInfo {
  id: number
  username: string
  nickname: string
  phone: string
  avatar: string
  status: number
  createTime: string
}

// 定义全局状态类型
interface GlobalState {
  token: string
  userInfo: UserInfo | null
  assemblySize: SizeType
  language: string
  themeConfig: {
    primary: string
    isDark: boolean
    weakOrGray: string
    breadcrumb: boolean
    tabs: boolean
  },
  setToken: (token: string) => void,
  setUserInfo: (userInfo: UserInfo | null) => void,
  setAssemblySize: (assemblySize: SizeType) => void,
  setLanguage: (language: string) => void,
  setThemeConfig: (themeConfig: GlobalState['themeConfig']) => void,
}

// 创建 Zustand store
const useGlobalStore = create(
  persist<GlobalState>(
    (set) => ({
      token: '',
      userInfo: null,
      assemblySize: 'middle',
      language: '',
      themeConfig: {
        primary: '#1890ff',
        isDark: false,
        weakOrGray: '',
        breadcrumb: true,
        tabs: true,
      },
      setToken: (token: string) => set({ token }),
      setUserInfo: (userInfo: UserInfo | null) => set({ userInfo }),
      setAssemblySize: (assemblySize: SizeType) => set({ assemblySize }),
      setLanguage: (language: string) => set({ language }),
      setThemeConfig: (themeConfig: GlobalState['themeConfig']) => set({ themeConfig }),
    }),
    {
      name: 'global-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useGlobalStore
