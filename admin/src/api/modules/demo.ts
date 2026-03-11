import http from '@/api'
import { ResPage, ResultData } from '@/api/interface'

export interface DemoDataVO {
  id: string
  name: string
  sex: number
  age: number
  address: string
  createTime: string
  updateTime: string
}

export interface DemoPageParams {
  name?: string
  sex?: string
}

export interface DemoDTO {
  id: Key
  name?: string
  sex?: string
  age?: number
  address?: string
}

// * 获取示例列表
export const getDemoPage = (data: DemoPageParams) => {
  return http.get<ResPage<DemoDataVO>>('/demo/page', data)
}

// * 新增示例数据
export const createDemo = (data: DemoDTO) => {
  return http.post<ResultData<DemoDataVO>>('/demo', data)
}

// * 编辑示例数据
export const updateDemo = (data: DemoDTO) => {
  return http.put<ResultData<boolean>>('/demo/update', data)
}

// * 获取示例数据详情
export const getDemoDetail = (id: Key) => {
  return http.get<ResultData<DemoDataVO>>(`/demo/${id}`)
}

// * 删除示例数据
export const deleteDemo = (id: string) => {
  return http.delete<ResultData<boolean>>(`/demo/${id}`)
}
