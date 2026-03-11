import Mock from 'mockjs'
import { DemoDataVO } from '@/api/modules/demo'

// 模拟数据库存储
let mockDatabase: DemoDataVO[] = []

// 初始化数据库
const initDatabase = () => {
  if (mockDatabase.length === 0) {
    // 生成50条初始数据
    const initialData = Mock.mock({
      'data|50': [
        {
          id: '@id',
          name: '@cname',
          sex: '@integer(1, 2)',
          age: '@integer(20, 60)',
          address: '@city(true)',
          createTime: '@datetime',
          updateTime: '@datetime',
        },
      ],
    }).data
    mockDatabase = initialData
  }
}

// 分页查询
const generateMockData = (
  current: number,
  pageSize: number,
  name: string,
  sex: number
): { list: DemoDataVO[]; total: number } => {
  initDatabase()
  const page = current - 1 // 转换为0基索引
  const data = mockDatabase.filter((item) => {
    return (!name || item.name.includes(name)) && (!sex || item.sex === sex)
  })
  const list = data.slice(page * pageSize, (page + 1) * pageSize)
  return { list, total: data.length }
}

// 新增数据
const createData = (data: Omit<DemoDataVO, 'id' | 'createTime' | 'updateTime'>): DemoDataVO => {
  const newItem: DemoDataVO = {
    id: Mock.mock('@id'),
    ...data,
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
  }
  mockDatabase.unshift(newItem) // 添加到最前面
  return newItem
}

// 更新数据
const updateData = (id: string, data: Partial<DemoDataVO>): boolean => {
  const index = mockDatabase.findIndex((item) => item.id === id)
  if (index === -1) return false
  mockDatabase[index] = {
    ...mockDatabase[index],
    ...data,
    updateTime: new Date().toISOString(),
  }
  return true
}

// 获取详情
const getDataDetail = (id: string): DemoDataVO | null => {
  return mockDatabase.find((item) => item.id === id) || null
}

// 删除数据
const deleteData = (id: string): boolean => {
  const initialLength = mockDatabase.length
  mockDatabase = mockDatabase.filter((item) => item.id !== id)
  return mockDatabase.length < initialLength
}

// 分页查询接口
Mock.mock('/api/demo/page', 'post', (req) => {
  const { current, pageSize, name, sex } = JSON.parse(req.body)
  return {
    code: 200,
    data: generateMockData(current, pageSize, name, sex),
    msg: '成功',
  }
})

// 新增接口
Mock.mock('/api/demo', 'post', (req) => {
  const data = JSON.parse(req.body)
  const newItem = createData(data)
  return {
    code: 200,
    data: newItem,
    msg: '新增成功',
  }
})

// 编辑接口 - ID放在body中，路径使用固定地址
Mock.mock('/api/demo/update', 'put', (req) => {
  const { id, ...data } = JSON.parse(req.body)
  // 验证ID是否存在
  if (!id) {
    return {
      code: 400,
      data: false,
      msg: 'ID不能为空',
    }
  }

  const success = updateData(id, data)

  return {
    code: success ? 200 : 404,
    data: success,
    msg: success ? '更新成功' : '数据不存在',
  }
})

// 详情接口
Mock.mock(/^\/api\/demo\/[^/]+$/, 'get', (req) => {
  const id = req.url.split('/')[3]
  const detail = getDataDetail(id)

  if (detail) {
    return {
      code: 200,
      data: detail,
      msg: '成功',
    }
  } else {
    return {
      code: 404,
      data: null,
      msg: '数据不存在',
    }
  }
})

// 删除接口
Mock.mock(/^\/api\/demo\/[^/]+$/, 'delete', (req) => {
  const id = req.url.split('/')[3]
  const success = deleteData(id)

  return {
    code: success ? 200 : 404,
    data: success,
    msg: success ? '删除成功' : '数据不存在',
  }
})
