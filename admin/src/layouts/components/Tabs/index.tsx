import { Tabs, message } from 'antd'
import { HomeFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import useTabsStore from '@/store/tabs'
import useGlobalStore from '@/store'
import useMenuStore from '@/store/menu'
import { searchRoute } from '@/utils/util'
import MoreButton from './components/MoreButton'
import './index.less'

const LayoutTabs = () => {
  const tabsList = useTabsStore((s) => s.tabsList)
  const setTabsList = useTabsStore((s) => s.setTabsList)
  const themeConfig = useGlobalStore((s) => s.themeConfig)
  const menuList = useMenuStore((s) => s.menuList)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [activeValue, setActiveValue] = useState<string>(pathname)

  useEffect(() => {
    addTabs()
  }, [pathname])

  // Click tabs
  const clickTabs = (path: string) => {
    navigate(path)
  }

  // Add tabs
  const addTabs = () => {
    const route = searchRoute(pathname, menuList as any)
    let newTabsList = JSON.parse(JSON.stringify(tabsList))
    if (tabsList.every((item: any) => item.path !== route.path)) {
      newTabsList.push({ title: route.meta?.title || route.path, path: route.path })
    }
    setTabsList(newTabsList)
    setActiveValue(pathname)
  }

  // Delete tabs
  const delTabs = (tabPath?: string) => {
    if (tabPath === HOME_URL) return
    if (pathname === tabPath) {
      tabsList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== pathname) return
        const nextTab = tabsList[index + 1] || tabsList[index - 1]
        if (!nextTab) return
        navigate(nextTab.path)
      })
    }
    // message.success('你删除了Tabs标签 😆😆😆')
    setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath))
  }

  // Define tab items for the `items` prop
  const tabItems = tabsList.map((item: Menu.MenuOptions) => ({
    key: item.path,
    label: (
      <span>
        {item.path === HOME_URL ? <HomeFilled /> : ''}
        {item.title}
      </span>
    ),
    closable: item.path !== HOME_URL,
  }))

  return (
    <>
      {!themeConfig.tabs && (
        <div className="tabs">
          <Tabs
            animated
            activeKey={activeValue}
            onChange={clickTabs}
            hideAdd
            type="editable-card"
            onEdit={(path) => {
              delTabs(path as string)
            }}
            items={tabItems} // Use items prop instead of TabPane
          />
          <MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={setTabsList} />
        </div>
      )}
    </>
  )
}

export default LayoutTabs
