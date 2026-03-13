import React, { useRef } from 'react'
import { TableColumnsType, Tag, Select } from 'antd'
import { Button, Card, Col, Form, Input, InputNumber, message, Popconfirm, Row, Space, Table } from 'antd'
import FormModal from './components/FormModal'
import { SearchColSpan } from '@/config/layout'
import { deleteCar, searchCars, CarPageParams, CarVO } from '@/api/modules/car'
import { usePagination } from 'ahooks'
import { BaseParams, ResPage } from '@/api/interface'

const { Option } = Select

const CarPagePage = () => {
  const formModalRef = useRef<any>()
  const [form] = Form.useForm()
  const showModal = (type: ActionType, id?: number) => {
    formModalRef.current.showModal(type, id)
  }
  const handleDelete = async (record: CarVO) => {
    await deleteCar(record.id)
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumnsType<CarVO> = [
    { title: '品牌', dataIndex: 'brand', align: 'center', width: 120 },
    { title: '车型', dataIndex: 'model', align: 'center', width: 150 },
    {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
      width: 120,
      render: (price) => `¥${price.toLocaleString()}`,
    },
    {
      title: '里程数',
      dataIndex: 'mileage',
      align: 'center',
      width: 120,
      render: (mileage) => `${mileage.toLocaleString()}公里`,
    },
    { title: '年份', dataIndex: 'year', align: 'center', width: 100 },
    { title: '颜色', dataIndex: 'color', align: 'center', width: 100 },
    { title: '燃料类型', dataIndex: 'fuelType', align: 'center', width: 100 },
    { title: '变速箱', dataIndex: 'transmission', align: 'center', width: 100 },
    { title: '车辆地址', dataIndex: 'location', align: 'center', width: 200 },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 100,
      render: (status) => <Tag color={status === 1 ? 'green' : 'red'}>{status === 1 ? '已上线' : '已下线'}</Tag>,
    },
    { title: '发布者', dataIndex: 'username', align: 'center', width: 120 },
    { title: '创建时间', dataIndex: 'createTime', align: 'center', width: 160 },
    {
      title: '操作',
      align: 'center',
      width: 150,
      fixed: 'right',
      key: 'action',
      render: (_, record: CarVO) => (
        <Space size="middle">
          <a onClick={() => showModal('view', record.id)}>查看</a>
          <a onClick={() => showModal('edit', record.id)}>编辑</a>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const { data, loading, pagination, run, refresh } = usePagination<ResPage<CarVO>, [BaseParams]>(async (params) => {
    const searchParams: CarPageParams = form.getFieldsValue()
    const result = await searchCars({ ...params, ...searchParams })
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
              <Form.Item name="brand" label="品牌">
                <Input placeholder="请输入品牌" />
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="model" label="车型">
                <Input placeholder="请输入车型" />
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="minPrice" label="最低价格">
                <InputNumber placeholder="最低价格" style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="maxPrice" label="最高价格">
                <InputNumber placeholder="最高价格" style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="year" label="年份">
                <InputNumber placeholder="年份" style={{ width: '100%' }} min={1900} max={2030} />
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" style={{ width: '100%' }} allowClear>
                  <Option value={1}>已上线</Option>
                  <Option value={0}>已下线</Option>
                </Select>
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
              新增车辆
            </Button>
          </Space>
        }>
        <Table
          loading={loading}
          columns={columns}
          rowKey="id"
          dataSource={data?.list}
          scroll={{ x: 1800 }}
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

export default CarPagePage
