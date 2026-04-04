import React, { useMemo } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login/index'
import Profile from '@/views/profile'
import { LayoutIndex } from '@/routers/constant'
import useMenuStore from '@/store/menu'
import { generateDynamicRoutes } from '@/routers/routeModules'
import { HOME_URL } from '@/config/config'
import lazyLoad from '@/routers/utils/lazyLoad'

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
    element: <LayoutIndex />,
    children: [
      {
        path: '/home',
        element: lazyLoad(React.lazy(() => import('@/views/home/index'))),
        meta: {
          requiresAuth: true,
          title: '首页',
          key: 'home',
        },
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
]

const Router = () => {
  const menuList = useMenuStore((s) => s.menuList)
  const dynamicRoutes = useMemo(() => {
    return menuList.length > 0 ? generateDynamicRoutes(menuList) : []
  }, [menuList])

  const routes = useRoutes([...staticRoutes, ...dynamicRoutes] as any)
  return routes
}

export default Router
