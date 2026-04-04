import { useLocation, Navigate } from 'react-router-dom'
import { AxiosCanceler } from '@/api/helper/axiosCancel'
import useGlobalStore from '@/store'
import useAuthStore from '@/store/auth'
import { HOME_URL } from '@/config/config'

const axiosCanceler = new AxiosCanceler()

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()
  // * 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending()

  // * 判断是否有Token
  const token = useGlobalStore.getState().token
  // * 无需登录的白名单路由
  const whiteList = ['/login', '/404', '/403', '/500']
  if (!token && !whiteList.includes(pathname)) return <Navigate to="/login" replace />

  // * 如果是白名单路由直接放行
  if (whiteList.includes(pathname)) return props.children

  // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  const dynamicRouter = useAuthStore.getState().authRouter
  // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)
  const staticRouter = ['/home', '/403', '/profile', '/login']
  const routerList = [...dynamicRouter, ...staticRouter]

  // * 首页和根路径总是允许访问（首页是白名单，根路径重定向到首页）
  if (pathname === '/' || pathname === HOME_URL) {
    return props.children
  }

  // * 如果访问的地址没有在路由表中重定向到403页面
  if (!routerList.includes(pathname)) {
    return <Navigate to="/403" replace />
  }

  // * 当前账号有权限返回 Router，正常访问页面
  return props.children
}

export default AuthRouter
