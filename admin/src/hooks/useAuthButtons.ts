import { searchRoute } from '@/utils/util'
import { useLocation } from 'react-router-dom'
import useMenuStore from '@/store/menu'
import useAuthStore from '@/store/auth'

/**
 * @description 页面按钮权限 hooks
 * */
const useAuthButtons = () => {
  const { pathname } = useLocation()
  const menuList = useMenuStore((s) => s.menuList)
  const route = searchRoute(pathname, menuList as any)

  return {
    BUTTONS: useAuthStore.getState().authButtons[route.meta?.key || ''] || {},
  }
}

export default useAuthButtons
