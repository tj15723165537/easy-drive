import { Login } from '@/api/interface/index'
import http from '@/api'

// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>('/auth/login', params)
}

// * 获取用户信息
export const getUserInfoApi = () => {
  return http.get<{
    id: number
    username: string
    nickname: string
    phone: string
    avatar: string
    status: number
    createTime: string
  }>('/auth/userInfo')
}

// * 获取菜单列表
export const getMenuList = () => {
  return http.get<Menu.MenuOptions[]>('/auth/menu')
}

// * 修改密码
export const updatePasswordApi = (params: Login.ReqUpdatePasswordForm) => {
  return http.post('/auth/updatePassword', params)
}

// * 更新个人信息
export const updateProfileApi = (params: { nickname: string; phone: string; avatar?: string }) => {
  return http.put('/auth/profile', params)
}
