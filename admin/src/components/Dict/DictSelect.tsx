import * as React from 'react'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import useDictStore from '@/store/dict'
import { DictVO } from '@/api/modules/common'
import { SelectProps } from 'antd'

interface Props extends SelectProps {
  code: string
  value?: string | null
  onChange?: (value: string) => void
}
const DictSelect = ({ code, value, onChange, ...rest }: Props) => {
  const handleChange = (value: string) => {
    onChange && onChange(value)
  }
  const dictStore = useDictStore()
  const [options, setOptions] = useState<DictVO[]>()
  async function getDict() {
    const res = await dictStore.getDictItem(code)
    setOptions(res)
  }
  useEffect(() => {
    getDict()
  }, [])
  return <Select value={value} onChange={handleChange} options={options} {...rest} />
}

export default DictSelect
