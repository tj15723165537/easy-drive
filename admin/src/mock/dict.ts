import Mock from 'mockjs'
import { DictVO } from '@/api/modules/common'

const dicts: Record<string, DictVO[]> = {
  sex: [
    {
      id: '1',
      label: '男',
      value: 1,
    },
    {
      id: '2',
      label: '女',
      value: 2,
    },
  ],
}

Mock.mock('/api/dict/get', 'post', (req) => {
  const { code } = JSON.parse(req.body)
  return {
    code: 200,
    data: dicts?.[code] ?? [],
    msg: '成功',
  }
})
