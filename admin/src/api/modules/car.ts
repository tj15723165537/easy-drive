import http from '@/api'
import { BaseParams, ResPage } from '@/api/interface'
import { Dayjs } from 'dayjs'

export interface CarVO {
  id: number
  brandName: string
  modelName: string
  brandId: number
  modelId: number
  price: number
  mileage: number
  year: number
  fuelType: string
  transmission: string
  description: string
  imageList: string[]
  pickupLocation: string
  status: number
  userId: number
  username: string
  createTime: string
  updateTime: string
}

export interface CarDTO {
  id?: number
  brandId?: number
  modelId?: number
  price?: number
  mileage?: number
  year?: number | Dayjs
  fuelType?: string
  transmission?: string
  description?: string
  images?: string
  pickupLocation?: string
  status?: number
}

export interface CarPageParams extends BaseParams {
  brandId?: number
  modelId?: number
  year?: number
  status?: number
}

export const searchCars = (params: CarPageParams) => {
  return http.get<ResPage<CarVO>>('/cars/search', params)
}

export const createCar = (data: CarDTO) => {
  return http.post('/cars', data)
}

export const updateCar = (data: CarDTO) => {
  return http.put(`/cars/${data.id}`, data)
}

export const getCarDetail = (id: number) => {
  return http.get<CarVO>(`/cars/${id}`)
}

export const deleteCar = (id: number) => {
  return http.delete(`/cars/${id}`)
}

export const getMyCars = (params: BaseParams) => {
  return http.get<ResPage<CarVO>>('/cars/my', params)
}
