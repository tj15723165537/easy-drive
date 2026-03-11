import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

const demoRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: '示例',
    },
    children: [
      {
        path: '/demo/crud-demo',
        element: lazyLoad(React.lazy(() => import('@/views/demo/crud-demo/index'))),
        meta: {
          requiresAuth: true,
          title: '基本示例',
          key: 'crud-demo',
        },
      },
    ],
  },
]

export default demoRouter
