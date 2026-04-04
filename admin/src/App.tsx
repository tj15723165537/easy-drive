import { useState, useEffect } from 'react'
import { getBrowserLang } from '@/utils/util'
import { ConfigProvider } from 'antd'
import { HashRouter } from 'react-router-dom'
import AuthRouter from '@/routers/utils/authRouter'
import Router from '@/routers/index'
import useTheme from '@/hooks/useTheme'
import useGlobalStore from '@/store'
import useMenuStore from '@/store/menu'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import i18n from 'i18next'
import 'moment/dist/locale/zh-cn'
import {
  defaultTheme, // 默认主题
  darkTheme, // 暗色主题
} from '@ant-design/compatible'
import { getMenuList } from '@/api/modules/login'
import { handleRouter } from '@/utils/util'
import useAuthStore from '@/store/auth'

const AppContent = () => {
  const { language, assemblySize, themeConfig, setLanguage, token } = useGlobalStore()
  const setMenuListAction = useMenuStore((s) => s.setMenuList)
  const setAuthRouter = useAuthStore((s) => s.setAuthRouter)
  const [i18nLocale, setI18nLocale] = useState(zhCN)
  const [menuLoaded, setMenuLoaded] = useState(false)

  // 全局使用主题
  useTheme(themeConfig)

  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 Zustand 中有默认语言就设置成 Zustand 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == 'zh') return setI18nLocale(zhCN)
    if (language && language == 'en') return setI18nLocale(enUS)
    if (getBrowserLang() == 'zh') return setI18nLocale(zhCN)
    if (getBrowserLang() == 'en') return setI18nLocale(enUS)
  }

  useEffect(() => {
    // 全局使用国际化
    const nextLang = language || getBrowserLang()
    i18n.changeLanguage(nextLang)
    // 避免重复 set 导致渲染循环
    if (language !== nextLang) {
      setLanguage(nextLang)
    }
    setAntdLanguage()
  }, [language])

  // 初始化加载菜单
  useEffect(() => {
    const loadMenu = async () => {
      // 无 token 不需要加载菜单，直接放行
      if (!token) {
        setMenuLoaded(true)
        return
      }
      try {
        const { data } = await getMenuList()
        if (data && Array.isArray(data)) {
          const hasHome = data.some((menu: any) => menu.path === '/home')
          const finalMenus = hasHome
            ? data
            : [{ path: '/home', title: '首页', icon: 'HomeOutlined', children: [] }, ...data]
          setMenuListAction(finalMenus)
          setAuthRouter(handleRouter(finalMenus))
        }
      } catch (error) {
        console.error('加载菜单失败:', error)
      } finally {
        setMenuLoaded(true)
      }
    }
    loadMenu()
  }, [token])

  if (!menuLoaded) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}>
        加载中...
      </div>
    )
  }

  return (
    <ConfigProvider
      locale={i18nLocale}
      componentSize={assemblySize}
      theme={themeConfig.isDark ? darkTheme : defaultTheme}>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </ConfigProvider>
  )
}

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App
