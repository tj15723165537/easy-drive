import http from '@/api'

export interface DictVO {
  id: number
  label: string
  value: number
  dictTypeId: number
}

// * 获取字典
export const getDictByCode = (code: string) => {
  return http.get<DictVO[]>('/system/dict/list', { code })
}
