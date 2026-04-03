import React from 'react'
import { RouteObject } from '@/routers/interface'
import { LayoutIndex } from '@/routers/constant'
import lazyLoad from '@/routers/utils/lazyLoad'

// * 动态路由映射表 - key 必须与后端菜单 path 一致
export const routeModules: Record<string, () => Promise<any>> = {
  '/home': () => import('@/views/home/index'),
  '/car/list': () => import('@/views/car/index'),
  '/car/model': () => import('@/views/car/model'),
  '/system/user': () => import('@/views/system/user'),
  '/system/role': () => import('@/views/system/role'),
  '/system/menu': () => import('@/views/system/menu'),
  '/system/dict': () => import('@/views/system/dict'),
  '/profile': () => import('@/views/profile'),
}

// * 生成动态路由配置
// * 遵循原有路由结构：父级路由不带 path（作为 Layout），子路由带完整 path
export const generateDynamicRoutes = (menuList: Menu.MenuOptions[]): RouteObject[] => {
  const result: RouteObject[] = []

  const processMenu = (menus: Menu.MenuOptions[]) => {
    for (const menu of menus) {
      if (!menu.path) continue

      // 跳过外链
      if (menu.isLink) continue

      if (menu.children && menu.children.length > 0) {
        // 父级菜单处理 - 作为 Layout 路由，不带 path
        const childrenRoutes: RouteObject[] = []

        for (const child of menu.children) {
          if (!child.path) continue
          if (child.isLink) continue

          // 子路由 path 使用完整路径（如 /car/list）
          const loadFn = routeModules[child.path]

          if (loadFn) {
            childrenRoutes.push({
              path: child.path,
              element: lazyLoad(React.lazy(loadFn)),
              meta: {
                requiresAuth: true,
                title: child.title,
                key: child.path,
              },
            })
          }
        }

        if (childrenRoutes.length > 0) {
          result.push({
            // 父路由不带 path，作为 Layout 包裹子路由
            element: <LayoutIndex />,
            meta: {
              title: menu.title,
              icon: menu.icon,
              key: menu.path,
            },
            children: childrenRoutes,
          })
        }
      } else {
        // 叶子节点路由 - 独立页面
        const loadFn = routeModules[menu.path]
        if (loadFn) {
          result.push({
            // 叶子路由也需要 Layout 包裹
            element: <LayoutIndex />,
            meta: {
              title: menu.title,
              icon: menu.icon,
              key: menu.path,
            },
            children: [
              {
                path: menu.path,
                element: lazyLoad(React.lazy(loadFn)),
                meta: {
                  requiresAuth: true,
                  title: menu.title,
                  key: menu.path,
                },
              },
            ],
          })
        }
      }
    }
  }

  processMenu(menuList)
  return result
}
