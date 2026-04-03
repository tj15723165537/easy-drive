import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

const carRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '车辆管理',
    },
    children: [
      {
        path: '/car/list',
        element: lazyLoad(React.lazy(() => import('@/views/car/index'))),
        meta: {
          requiresAuth: true,
          title: '车辆列表',
          key: 'car',
        },
      },
      {
        path: '/car/model',
        element: lazyLoad(React.lazy(() => import('@/views/car/model'))),
        meta: {
          requiresAuth: true,
          title: '品牌车型管理',
          key: 'carModel',
        },
      },
    ],
  },
]

export default carRouter
