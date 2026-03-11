import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import useMenuStore from '@/store/menu'
import LayoutMenu from './components/Menu'
import LayoutHeader from './components/Header'
import LayoutTabs from './components/Tabs'
import './index.less'

const LayoutIndex = () => {
  const { Sider, Content } = Layout
  const isCollapse = useMenuStore((s) => s.isCollapse)
  const updateCollapse = useMenuStore((s) => s.updateCollapse)

  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth
        if (!isCollapse && screenWidth < 1200) updateCollapse(true)
        if (!isCollapse && screenWidth > 1200) updateCollapse(false)
      })()
    }
  }

  useEffect(() => {
    listeningWindow()
  }, [])

  return (
    // 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
    <section className="main-container">
      <Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
        <LayoutMenu></LayoutMenu>
      </Sider>
      <Layout>
        <LayoutHeader></LayoutHeader>
        <LayoutTabs></LayoutTabs>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </section>
  )
}

export default LayoutIndex
