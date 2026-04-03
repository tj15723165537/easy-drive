import React, { useState, useRef, useMemo } from 'react'
import { Table, Button, Space, message, Popconfirm, Input } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { useRequest } from 'ahooks'
import FormModal from './components/FormModal'
import {
  getBrandList,
  deleteBrand,
  CarBrandVO,
  getModelList,
  deleteModel,
  CarModelVO,
} from '@/api/modules/carModel'

const CarModelPage: React.FC = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])
  const [searchText, setSearchText] = useState('')
  const formModalRef = useRef<any>(null)

  const { data: brandData, loading, refresh } = useRequest(getBrandList)
  const { run: fetchModels } = useRequest(
    (brandId: number) => getModelList(brandId),
    { manual: true }
  )

  // 品牌列表
  const brandList = useMemo(() => brandData?.data || [], [brandData])

  // 根据品牌ID获取车型列表（从展开的行中获取）
  const [modelData, setModelData] = useState<Record<number, CarModelVO[]>>({})

  // 过滤品牌
  const filteredBrandList = useMemo(() => {
    if (!searchText) return brandList
    return brandList.filter((brand) =>
      brand.name.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [brandList, searchText])

  // 展开品牌行
  const handleExpand = async (expanded: boolean, record: CarBrandVO) => {
    const keys = expanded
      ? [...expandedRowKeys, String(record.id)]
      : expandedRowKeys.filter((k) => k !== String(record.id))
    setExpandedRowKeys(keys)

    if (expanded && !modelData[record.id]) {
      const result = await fetchModels(record.id)
      setModelData((prev) => ({ ...prev, [record.id]: result?.data || [] }))
    }
  }

  // 品牌列
  const brandColumns: ColumnsType<CarBrandVO> = [
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '首字母',
      dataIndex: 'initial',
      key: 'initial',
      width: 100,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => formModalRef.current?.showModelModal('add', record.id)}
          >
            新增车型
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => formModalRef.current?.showBrandModal('edit', record.id)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该品牌？"
            description="删除品牌将同时删除其下属所有车型"
            onConfirm={async () => {
              try {
                await deleteBrand(record.id)
                message.success('删除成功')
                refresh()
              } catch {
                message.error('删除失败')
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // 车型列
  const modelColumns: ColumnsType<CarModelVO> = [
    {
      title: '车型名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => formModalRef.current?.showModelModal('edit', record.brandId, record.id)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该车型？"
            onConfirm={async () => {
              try {
                await deleteModel(record.id)
                message.success('删除成功')
                // 刷新车型列表
                const result = await fetchModels(record.brandId)
                setModelData((prev) => ({ ...prev, [record.brandId]: result?.data || [] }))
              } catch {
                message.error('删除失败')
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // 车型表格行
  const expandedRowRender = (record: CarBrandVO) => {
    const models = modelData[record.id] || []

    return (
      <div style={{ padding: '8px 0' }}>
        <Table
          rowKey="id"
          size="small"
          pagination={false}
          columns={modelColumns}
          dataSource={models}
          locale={{ emptyText: '暂无车型，请点击新增车型添加' }}
        />
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="搜索品牌"
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => formModalRef.current?.showBrandModal('add')}>
          新增品牌
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        columns={brandColumns}
        dataSource={filteredBrandList}
        expandable={{
          expandedRowKeys,
          expandedRowRender,
          onExpand: handleExpand,
          expandRowByClick: true,
        }}
        pagination={false}
      />

      <FormModal
        ref={formModalRef}
        onRefresh={refresh}
        onModelRefresh={(brandId) => {
          fetchModels(brandId).then((res) => {
            setModelData((prev) => ({ ...prev, [brandId]: res?.data || [] }))
          })
        }}
      />
    </div>
  )
}

export default CarModelPage
