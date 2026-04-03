import http from '@/api'
import { ResPage } from '@/api/interface'

export interface CarBrandVO {
  id: number
  name: string
  initial: string
  sort: number
  createTime: string
  updateTime: string
}

export interface CarModelVO {
  id: number
  brandId: number
  brandName: string
  name: string
  sort: number
  createTime: string
  updateTime: string
}

export interface CarModelTreeVO {
  value: string
  label: string
  children: {
    value: string
    label: string
  }[]
}

export interface CarBrandDTO {
  id?: number
  name: string
  initial?: string
  sort?: number
}

export interface CarModelDTO {
  id?: number
  brandId: number
  name: string
  sort?: number
}

// 品牌 API
export const getBrandList = () => {
  return http.get<CarBrandVO[]>('/car/brand/list')
}

export const getBrandDetail = (id: number) => {
  return http.get<CarBrandVO>(`/car/brand/${id}`)
}

export const createBrand = (data: CarBrandDTO) => {
  return http.post('/car/brand', data)
}

export const updateBrand = (id: number, data: CarBrandDTO) => {
  return http.put(`/car/brand/${id}`, data)
}

export const deleteBrand = (id: number) => {
  return http.delete(`/car/brand/${id}`)
}

// 车型 API
export const getModelList = (brandId?: number) => {
  return http.get<CarModelVO[]>('/car/model/list', { brandId })
}

export const getModelTree = () => {
  return http.get<CarModelTreeVO[]>('/car/model/tree')
}

export const getModelDetail = (id: number) => {
  return http.get<CarModelVO>(`/car/model/${id}`)
}

export const createModel = (data: CarModelDTO) => {
  return http.post('/car/model', data)
}

export const updateModel = (id: number, data: CarModelDTO) => {
  return http.put(`/car/model/${id}`, data)
}

export const deleteModel = (id: number) => {
  return http.delete(`/car/model/${id}`)
}
