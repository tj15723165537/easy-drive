import React, { useRef } from 'react'
import type { TableColumnsType } from 'antd'
import { Button, Card, Col, Form, Input, message, Popconfirm, Row, Space, Table } from 'antd'
import FormModal from './components/FormModal'
import { SearchColSpan } from '@/config/layout'
import { deleteRole, getRolePage, RolePageParams, RoleVO } from '@/api/modules/system'
import { usePagination } from 'ahooks'
import { BaseParams, ResPage } from '@/api/interface'

const RolePage = () => {
  const formModalRef = useRef<any>(null)
  const [form] = Form.useForm()
  const showModal = (type: ActionType, id?: Key) => {
    formModalRef.current.showModal(type, id)
  }
  const handleDelete = async (record: RoleVO) => {
    await deleteRole(record.id)
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumnsType<RoleVO> = [
    { title: '角色名称', dataIndex: 'name', align: 'center' },
    { title: '描述', dataIndex: 'description', align: 'center' },
    { title: '创建时间', dataIndex: 'created_at', align: 'center' },
    { title: '更新时间', dataIndex: 'updated_at', align: 'center' },
    {
      title: '操作',
      align: 'center',
      width: 150,
      key: 'action',
      render: (_, record: RoleVO) => (
        <Space size="middle">
          <a onClick={() => showModal('edit', record.id)}>编辑</a>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const { data, loading, pagination, run, refresh } = usePagination<ResPage<RoleVO>, [BaseParams]>(async (params) => {
    const searchParams: RolePageParams = form.getFieldsValue()
    const result = await getRolePage({ ...params, ...searchParams })
    return result.data!
  })

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

export default RolePage
