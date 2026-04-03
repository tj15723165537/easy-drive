import { Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login/index'
import useMenuStore from '@/store/menu'
import { generateDynamicRoutes } from '@/routers/routeModules'
import { HOME_URL } from '@/config/config'

const Router = () => {
  const menuList = useMenuStore((s) => s.menuList)
  const dynamicRoutes = menuList.length > 0 ? generateDynamicRoutes(menuList) : []

  const staticRoutes = [
    {
      path: '/',
      element: <Navigate to={HOME_URL} />,
    },
    {
      path: '/login',
      element: <Login />,
      meta: {
        requiresAuth: false,
        title: '登录页',
        key: 'login',
      },
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]

  const routes = useRoutes([...staticRoutes, ...dynamicRoutes] as any)
  return routes
}

export default Router
