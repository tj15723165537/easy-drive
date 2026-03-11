import React, { useRef, useState } from 'react'
import type { TableColumnsType } from 'antd'
import { Button, Card, Col, message, Popconfirm, Row, Space, Table } from 'antd'
import FormModal from './components/FormModal'
import {
  deleteDict,
  deleteDictType,
  DictPageParams,
  DictTypeVO,
  DictVO,
  getDictPage,
  getDictTypePage,
} from '@/api/modules/system'
import DictFormModal from './components/DictFormModal'
import { usePagination } from 'ahooks'
import { BaseParams, ResPage } from '@/api/interface'
import './index.less'

const DictPage = () => {
  const formModalRef = useRef<any>(null)

  const showModal = (type: ActionType, id?: Key) => {
    formModalRef.current.showModal(type, id)
  }
  const handleDelete = async (record: DictTypeVO) => {
    await deleteDictType(record.id)
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumnsType<DictTypeVO> = [
    { title: '名称', dataIndex: 'name', align: 'center' },
    { title: '编码', dataIndex: 'code', align: 'center' },
    {
      title: '操作',
      align: 'center',
      width: 150,
      key: 'action',
      render: (_, record: DictTypeVO) => (
        <Space size="middle">
          <a onClick={() => showModal('edit', record.id)}>编辑</a>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const { data, loading, pagination, refresh } = usePagination<ResPage<DictTypeVO>, [BaseParams]>(async (params) => {
    const result = await getDictTypePage(params)
    return result.data!
  })

  const [currentTypeId, setCurrentTypeId] = useState<number>()

  const dictFormModalRef = useRef<any>(null)
  const showDictModal = (type: ActionType, id?: Key) => {
    dictFormModalRef.current.showModal(type, id)
  }
  const handleDictDelete = async (record: DictVO) => {
    await deleteDict(record.id)
    message.success('操作成功')
    dictRefresh()
  }

  const dictColumns: TableColumnsType<DictVO> = [
    { title: '名称', dataIndex: 'label', align: 'center' },
    { title: '字典值', dataIndex: 'value', align: 'center' },
    {
      title: '操作',
      align: 'center',
      width: 150,
      key: 'action',
      render: (_, record: DictVO) => (
        <Space size="middle">
          <a onClick={() => showDictModal('edit', record.id)}>编辑</a>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDictDelete(record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const {
    data: dictData,
    loading: dictLoading,
    pagination: dictPagination,
    run: getDict,
    refresh: dictRefresh,
  } = usePagination<ResPage<DictVO>, [DictPageParams]>(
    async (params) => {
      const result = await getDictPage(params)
      return result.data!
    },
    {
      manual: true,
    }
  )

  return (
    <>
      <Row gutter={12} className={'h-full'}>
        <Col span={8}>
          <Card
						className={'h-full'}
            title={
              <Space>
                <Button type="primary" onClick={() => showModal('add')}>
                  新增分类
                </Button>
              </Space>
            }>
            <Table
              loading={loading}
              columns={columns}
              rowKey="id"
              dataSource={data?.list}
              rowClassName={(record) => {
                return `table-dict-type-row ${currentTypeId === record.id ? 'active' : ''}`
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    setCurrentTypeId(record.id)
                    getDict({
                      current: 1,
                      pageSize: dictPagination.pageSize,
                      dictTypeId: record.id,
                    })
                  },
                }
              }}
              pagination={{
                ...pagination,
                total: data?.total,
                size: 'default',
                className: '!mt-6 !mb-0',
                pageSizeOptions: ['10', '20', '50', '100'],
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条`,
              }}
            />
            <FormModal myRef={formModalRef} onRefresh={refresh} />
          </Card>
        </Col>
        {currentTypeId && (
          <Col span={16}>
            <Card
							className={'h-full'}
              title={
                <Space>
                  <Button type="primary" onClick={() => showDictModal('add')}>
                    新增字典
                  </Button>
                </Space>
              }>
              <Table
                loading={dictLoading}
                columns={dictColumns}
                rowKey="id"
                dataSource={dictData?.list}
                pagination={{
                  ...dictPagination,
                  total: dictData?.total,
                  size: 'default',
                  className: '!mt-6 !mb-0',
                  pageSizeOptions: ['10', '20', '50', '100'],
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `共 ${total} 条`,
                }}
              />
              <DictFormModal myRef={dictFormModalRef} onRefresh={dictRefresh} dictTypeId={currentTypeId} />
            </Card>
          </Col>
        )}
      </Row>
    </>
  )
}

export default DictPage
