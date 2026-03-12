import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'
import Profile from '@/views/profile/index'

// 个人中心模块
const profileRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
        meta: {
          requiresAuth: true,
          title: '个人中心',
          key: 'profile',
        },
      },
    ],
  },
]

export default profileRouter
