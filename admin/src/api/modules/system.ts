import http from '@/api'
import { BaseParams, ResPage } from '@/api/interface'

export interface MenuVO {
  id: number
  parent_id: number
  title: string
  icon: string
  path: string
  sort: number
  create_at: string
  update_at: string
  children: MenuVO[]
}

export interface MenuDTO {
  id?: number
  parent_id?: number
  title?: string
  icon?: string
  path?: string
  sort?: number
}

export const getMenuList = () => {
  return http.get<MenuVO[]>('/system/menu/list')
}

export const createMenu = (data: MenuDTO) => {
  return http.post('/system/menu', data)
}

export const updateMenu = (data: MenuDTO) => {
  return http.put('/system/menu', data)
}

export const getMenuDetail = (id: number) => {
  return http.get<MenuVO>(`/system/menu/${id}`)
}

export const deleteMenu = (id: number) => {
  return http.delete(`/system/menu/${id}`)
}

export interface UserVO {
  id: number
  username: string
  nick_name: string
  phone: string
  status: number
  roleId?: number
  created_at: string
  updated_at: string
}
export interface UserDTO {
  id?: number
  username?: string
  nick_name?: string
  phone?: string
  roleId?: number
  status?: number
}
export interface UserPageParams extends BaseParams {
  username?: string
}

export const getUserPage = (params: UserPageParams) => {
  return http.get<ResPage<UserVO>>('/system/user/page', params)
}

export const createUser = (data: UserDTO) => {
  return http.post('/system/user', data)
}

export const updateUser = (data: UserDTO) => {
  return http.put('/system/user', data)
}

export const getUserDetail = (id: number) => {
  return http.get<UserVO>(`/system/user/${id}`)
}

export const deleteUser = (id: number) => {
  return http.delete(`/system/user/${id}`)
}

export interface DictTypeVO {
  id: number
  name: string
  code: string
  created_at: string
  updated_at: string
}
export interface DictTypeDTO {
  id?: number
  name?: string
  code?: string
}
export interface DictTypePageParams extends BaseParams {
  name?: string
  code?: string
}

export const getDictTypePage = (params: DictTypePageParams) => {
  return http.get<ResPage<DictTypeVO>>('/system/dict-type/page', params)
}

export const createDictType = (data: DictTypeDTO) => {
  return http.post('/system/dict-type', data)
}

export const updateDictType = (data: DictTypeDTO) => {
  return http.put('/system/dict-type', data)
}

export const getDictTypeDetail = (id: number) => {
  return http.get<DictTypeVO>(`/system/dict-type/${id}`)
}

export const deleteDictType = (id: number) => {
  return http.delete(`/system/dict-type/${id}`)
}

export interface DictVO {
  id: number
  label: string
  value: number
  created_at: string
  updated_at: string
}
export interface DictDTO {
  id?: number
  dictTypeId?: number
  label?: string
  value?: number
}
export interface DictPageParams extends BaseParams {
  dictTypeId?: number
}

export const getDictPage = (params: DictPageParams) => {
  return http.get<ResPage<DictVO>>('/system/dict/page', params)
}

export const createDict = (data: DictDTO) => {
  return http.post('/system/dict', data)
}

export const updateDict = (data: DictDTO) => {
  return http.put('/system/dict', data)
}

export const getDictDetail = (id: number) => {
  return http.get<DictVO>(`/system/dict/${id}`)
}

export const deleteDict = (id: number) => {
  return http.delete(`/system/dict/${id}`)
}

export interface RoleVO {
  id: number
  name: string
  description: string
  menuIds?: number[]
  created_at: string
  updated_at: string
}
export interface RoleDTO {
  id?: number
  name?: string
  description?: string
  menuIds?: number[]
}
export interface RolePageParams extends BaseParams {
  name?: string
}

export const getRolePage = (params: RolePageParams) => {
  return http.get<ResPage<RoleVO>>('/system/role/page', params)
}

export const getRoleList = () => {
  return http.get<RoleVO[]>('/system/role/list')
}

export const createRole = (data: RoleDTO) => {
  return http.post('/system/role', data)
}

export const updateRole = (data: RoleDTO) => {
  return http.put('/system/role', data)
}

export const getRoleDetail = (id: number) => {
  return http.get<RoleVO>(`/system/role/${id}`)
}

export const deleteRole = (id: number) => {
  return http.delete(`/system/role/${id}`)
}
