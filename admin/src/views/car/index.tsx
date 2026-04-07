import React, { useRef, useState, useMemo } from 'react'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from 'antd'
import FormModal from './components/FormModal'
import DetailModal from './components/DetailModal'
import { SearchColSpan } from '@/config/layout'
import { CarPageParams, CarVO, deleteCar, getCarDetail, searchCars } from '@/api/modules/car'
import { getBrandList, getModelList } from '@/api/modules/carModel'
import { usePagination } from 'ahooks'
import { useRequest } from 'ahooks'
import { CarBrandVO, CarModelVO } from '@/api/modules/carModel'
import dayjs from 'dayjs'

const { Option } = Select

const CarPagePage = () => {
  const formModalRef = useRef<any>()
  const [detailVisible, setDetailVisible] = useState(false)
  const [detailData, setDetailData] = useState<CarVO | null>(null)
  const [form] = Form.useForm()
  const [selectedBrandId, setSelectedBrandId] = useState<number>()

  // 获取品牌列表
  const { data: brandList } = useRequest(getBrandList)

  // 获取车型列表（根据品牌筛选）
  const { data: modelList } = useRequest(
    () => getModelList(selectedBrandId),
    { ready: !!selectedBrandId }
  )

  // 品牌选项
  const brandOptions = useMemo(() => {
    if (!brandList?.data) return []
    return brandList.data.map((item: CarBrandVO) => ({
      value: item.id,
      label: item.name,
    }))
  }, [brandList])

  // 车型选项
  const modelOptions = useMemo(() => {
    if (!modelList?.data) return []
    return modelList.data.map((item: CarModelVO) => ({
      value: item.id,
      label: item.name,
    }))
  }, [modelList])

  const showEditModal = (id?: number) => {
    formModalRef.current.showModal('edit', id)
  }

  const showDetailModal = async (id: number) => {
    setDetailVisible(true)
    const result = await getCarDetail(id)
    if (result.data) {
      setDetailData(result.data)
    }
  }

  const handleDelete = async (record: CarVO) => {
    await deleteCar(record.id)
    message.success('操作成功')
    refresh()
  }

  const columns: TableColumnsType<CarVO> = [
    { title: '品牌', dataIndex: 'brandName', align: 'center', width: 120 },
    { title: '车型', dataIndex: 'modelName', align: 'center', width: 150 },
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
    { title: '燃料类型', dataIndex: 'fuelType', align: 'center', width: 100 },
    { title: '变速箱', dataIndex: 'transmission', align: 'center', width: 100 },
    { title: '提车地址', dataIndex: 'pickupLocation', align: 'center', width: 200 },
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
          <a onClick={() => showDetailModal(record.id)}>查看</a>
          <a onClick={() => showEditModal(record.id)}>编辑</a>
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const { data, loading, pagination, run, refresh } = usePagination<any, []>(async (params) => {
    const searchParams = form.getFieldsValue()
    // 将年份 dayjs 对象转换为数字
    if (searchParams.year) {
      searchParams.year = dayjs(searchParams.year).year()
    }
    const result = await searchCars({ ...params, ...searchParams })
    return result.data!
  })

  const handleReset = () => {
    form.resetFields()
    setSelectedBrandId(undefined)
    run({ current: 1, pageSize: pagination.pageSize })
  }

  const handleBrandChange = (value: number) => {
    setSelectedBrandId(value)
    form.setFieldValue('modelId', undefined)
    form.setFieldValue('brandId', value)
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
              <Form.Item name="brandId" label="品牌">
                <Select
                  placeholder="请选择品牌"
                  style={{ width: '100%' }}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={handleBrandChange}
                >
                  {brandOptions.map((item) => (
                    <Option key={item.value} value={item.value} label={item.label}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="modelId" label="车型">
                <Select
                  placeholder={selectedBrandId ? '请选择车型' : '请先选择品牌'}
                  style={{ width: '100%' }}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={!selectedBrandId}
                >
                  {modelOptions.map((item) => (
                    <Option key={item.value} value={item.value} label={item.label}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col {...SearchColSpan}>
              <Form.Item name="year" label="年份">
                <DatePicker.YearPicker placeholder="请选择年份" style={{ width: '100%' }} />
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
                <Button type="primary" htmlType="submit">
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
            <Button type="primary" onClick={() => formModalRef.current.showModal('add')}>
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
        <DetailModal visible={detailVisible} onClose={() => setDetailVisible(false)} carData={detailData} />
      </Card>
    </>
  )
}

export default CarPagePage
