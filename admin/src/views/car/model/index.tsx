import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Table, Button, Space, message, Popconfirm, Input, Card, Row, Col, Empty, Spin } from 'antd'
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

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const CarModelPage: React.FC = () => {
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null)
  const [searchText, setSearchText] = useState('')
  const [selectedInitial, setSelectedInitial] = useState<string | null>(null)
  const formModalRef = useRef<any>(null)

  const { data: brandData, loading: brandLoading, refresh } = useRequest(getBrandList)

  const { data: modelData, loading: modelLoading, run: fetchModels } = useRequest(
    (brandId: number) => getModelList(brandId),
    { manual: true }
  )

  // 品牌列表
  const brandList = useMemo(() => brandData?.data || [], [brandData])

  // 车型列表
  const modelList = useMemo(() => modelData?.data || [], [modelData])

  // 过滤品牌（按搜索和首字母）
  const filteredBrandList = useMemo(() => {
    let list = brandList
    if (selectedInitial) {
      list = list.filter((brand) => brand.initial === selectedInitial)
    }
    if (searchText) {
      list = list.filter((brand) =>
        brand.name.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    return list
  }, [brandList, searchText, selectedInitial])

  // 选中的品牌
  const selectedBrand = useMemo(
    () => brandList.find((b) => b.id === selectedBrandId),
    [brandList, selectedBrandId]
  )

  // 监听选中品牌变化，获取车型列表
  useEffect(() => {
    if (selectedBrandId) {
      fetchModels(selectedBrandId)
    }
  }, [selectedBrandId])

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
      width: 80,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 60,
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
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              formModalRef.current?.showBrandModal('edit', record.id)
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该品牌？"
            description="删除品牌将同时删除其下属所有车型"
            onConfirm={async (e) => {
              e?.stopPropagation()
              try {
                await deleteBrand(record.id)
                message.success('删除成功')
                if (selectedBrandId === record.id) {
                  setSelectedBrandId(null)
                }
                refresh()
              } catch {
                message.error('删除失败')
              }
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
            >
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
                fetchModels(record.brandId)
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

  return (
    <Row gutter={16}>
      {/* 左侧品牌列表 */}
      <Col span={10}>
        <Card
          title="品牌列表"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => formModalRef.current?.showBrandModal('add')}>
              新增品牌
            </Button>
          }
          className="h-full"
          styles={{ body: { height: 'calc(100vh - 180px)', overflow: 'auto' } }}
        >
          <div style={{ marginBottom: 12 }}>
            <Input
              placeholder="搜索品牌"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
          {/* 字母筛选 */}
          <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Button
              type={selectedInitial === null ? 'primary' : 'default'}
              size="small"
              onClick={() => setSelectedInitial(null)}
            >
              全部
            </Button>
            {ALPHABETS.map((letter) => (
              <Button
                key={letter}
                type={selectedInitial === letter ? 'primary' : 'default'}
                size="small"
                onClick={() => setSelectedInitial(letter)}
                style={{ width: 28, padding: '0 4px' }}
              >
                {letter}
              </Button>
            ))}
          </div>
          <Table
            rowKey="id"
            loading={brandLoading}
            columns={brandColumns}
            dataSource={filteredBrandList}
            pagination={false}
            size="small"
            rowClassName={(record) => (selectedBrandId === record.id ? 'ant-table-row-selected' : '')}
            onRow={(record) => ({
              onClick: () => setSelectedBrandId(record.id),
              style: { cursor: 'pointer' },
            })}
            locale={{ emptyText: '暂无品牌，请点击右上角新增' }}
          />
        </Card>
      </Col>

      {/* 右侧车型列表 */}
      <Col span={14}>
        <Card
          title={selectedBrand ? `${selectedBrand.name} - 车型列表` : '车型列表'}
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              disabled={!selectedBrandId}
              onClick={() => formModalRef.current?.showModelModal('add', selectedBrandId!)}
            >
              新增车型
            </Button>
          }
          className="h-full"
          styles={{ body: { height: 'calc(100vh - 180px)', overflow: 'auto' } }}
        >
          {!selectedBrandId ? (
            <Empty description="请先选择左侧品牌" style={{ marginTop: 100 }} />
          ) : modelLoading ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>加载中...</div>
            </div>
          ) : (
            <Table
              rowKey="id"
              loading={modelLoading}
              columns={modelColumns}
              dataSource={modelList}
              pagination={false}
              size="small"
              locale={{ emptyText: '暂无车型，请点击右上角新增' }}
            />
          )}
        </Card>
      </Col>

      <FormModal
        ref={formModalRef}
        onRefresh={refresh}
        onModelRefresh={(brandId) => {
          fetchModels(brandId)
        }}
      />
    </Row>
  )
}

export default CarModelPage
