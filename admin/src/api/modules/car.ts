import http from '@/api'
import { BaseParams, ResPage } from '@/api/interface'

export interface CarVO {
  id: number
  brand: string
  model: string
  price: number
  mileage: number
  year: number
  color: string
  fuelType: string
  transmission: string
  description: string
  imageList: string[]
  location: string
  status: number
  userId: number
  username: string
  createTime: string
  updateTime: string
}

export interface CarDTO {
  id?: number
  brand?: string
  model?: string
  price?: number
  mileage?: number
  year?: number
  color?: string
  fuelType?: string
  transmission?: string
  description?: string
  images?: string
  location?: string
  status?: number
}

export interface CarPageParams extends BaseParams {
  brand?: string
  model?: string
  minPrice?: number
  maxPrice?: number
  year?: number
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
