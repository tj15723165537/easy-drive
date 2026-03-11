import { create } from 'zustand'
import { DictVO, getDictByCode } from '@/api/modules/common'

interface DictState {
  dicts: Record<string, DictVO[]>
  getDictItem: (code: string) => Promise<DictVO[]>
  setDictItem: (code: string, data: DictVO[]) => void
  getLableByValue: (code: string, value: string | number) => string
}

const useDictStore = create<DictState>(() => ({
  dicts: {},
  setDictItem(code, data) {
    this.dicts[code] = data
  },
  async getDictItem(code) {
    if (this.dicts[code]) {
      return this.dicts[code]
    }
    const res = await getDictByCode(code)
    this.setDictItem(code, res?.data ?? [])
    return res?.data ?? []
  },
  getLableByValue(code, value) {
    const dicts = this.dicts[code]
    if (!dicts) {
      return '-'
    }
    if (!Array.isArray(dicts)) {
      console.error('字典数据必须是数组')
      return '-'
    }
    const dict = dicts.find((item) => item.value === value)
    return dict?.label ?? '-'
  },
}))

export default useDictStore
