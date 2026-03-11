import React, { useRef } from 'react'
import type { TableColumnsType } from 'antd'
import { Button, Card, Col, Form, Input, message, Popconfirm, Row, Space, Table } from 'antd'
import FormModal from './components/FormModal'
import { SearchColSpan } from '@/config/layout'
import { deleteDemo, DemoDataVO, DemoPageParams, getDemoPage } from '@/api/modules/demo'
import DictSelect from '@/components/Dict/DictSelect'
import useDictStore from '@/store/dict'
import { usePagination } from 'ahooks'
import { BaseParams, ResPage } from '@/api/interface'

const DemoPage = () => {
  const formModalRef = useRef<any>(null)
  const [form] = Form.useForm()
  const showModal = (type: ActionType, id?: Key) => {
    formModalRef.current.showModal(type, id)
  }
  const handleDelete = async (record: DemoDataVO) => {
    await deleteDemo(record.id)
    message.success('操作成功')
    refresh()
  }

  const dictStore = useDictStore()
  const columns: TableColumnsType<DemoDataVO> = [
    { title: '姓名', dataIndex: 'name', align: 'center' },
    { title: '性别', dataIndex: 'sex', align: 'center', render: (value) => dictStore.getLableByValue('sex', value) },
    { title: '年龄', dataIndex: 'age', align: 'center' },
    { title: '地址', dataIndex: 'address', align: 'center' },
    {
      title: '操作',
      align: 'center',
      width: 150,
      key: 'action',
      render: (_, record: DemoDataVO) => (
        <Space size="middle">
          <a onClick={() => showModal('view', record.id)}>详情</a>
          <a onClick={() => showModal('edit', record.id)}>编辑</a>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const { data, loading, pagination, run, refresh } = usePagination<ResPage<DemoDataVO>, [BaseParams]>(
    async (params) => {
      const searchParams: DemoPageParams = form.getFieldsValue()
      const result = await getDemoPage({ ...params, ...searchParams })
      return result.data!
    }
  )

  const handleReset = () => {
    form.resetFields()
    setTimeout(() => {
      run({ current: 1, pageSize: pagination.pageSize })
    })
  }
  const handleSearch = () => {
    run({ current: 1, pageSize: pagination.pageSize })
  }

  return (
    <>
      <Card className="mb-3">
        <Form form={form} onFinish={handleSearch} layout="inline">
          <Row gutter={[16, 16]} style={{ width: '100%' }}>
            <Col {...SearchColSpan}>
              <Form.Item name="name" label="姓名">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="sex" label="性别">
                <DictSelect placeholder="请选择" code="sex" />
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Space>
                <Button type="primary" onClick={handleSearch}>
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title={
          <Space>
            <Button type="primary" onClick={() => showModal('add')}>
              新增
            </Button>
          </Space>
        }>
        <Table
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={data?.list}
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
    </>
  )
}

export default DemoPage
