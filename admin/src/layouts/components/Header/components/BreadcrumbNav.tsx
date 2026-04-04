import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import useGlobalStore from '@/store'
import useBreadcrumbStore from '@/store/breadcrumb'

const BreadcrumbNav = () => {
  const { pathname } = useLocation()
  const themeConfig = useGlobalStore((s) => s.themeConfig)
  const breadcrumbList = useBreadcrumbStore((s) => s.breadcrumbList[pathname] || [])

  // Define breadcrumb items
  const items = [
    {
      title: <a href={`#${HOME_URL}`}>首页</a>,
      key: HOME_URL,
    },
    ...(breadcrumbList || []).map((item: any) => ({
      title: item !== '首页' ? item : null,
      key: item,
    })),
  ].filter((item) => item.title)

  if (!themeConfig?.breadcrumb) return null

  return <Breadcrumb items={items} />
}

export default BreadcrumbNav
