import React, { Ref, useImperativeHandle, useMemo, useState } from 'react'
import { Form, Input, InputNumber, message, Modal, Select, Spin, Upload, Row, Col } from 'antd'
import { createCar, getCarDetail, updateCar, CarDTO } from '@/api/modules/car'
import { ModalTitleMap } from '@/const/formModal'
import { useRequest } from 'ahooks'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile, UploadProps } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import useGlobalStore from '@/store'
import { getModelTree } from '@/api/modules/carModel'

const { Option } = Select

interface Props {
  myRef: Ref<any>
  onRefresh: () => void
}

const FUEL_TYPES = ['汽油', '柴油', '电动', '混动']
const TRANSMISSION_TYPES = ['自动', '手动', '无级变速']

// 将后端返回返回的相对路径转换为完整的 API URL
const getFullImageUrl = (url: string | undefined) => {
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('/api')) return url
  return '/api' + url
}

// 将完整 URL 转换为相对路径
const getRelativeImageUrl = (url: string | undefined) => {
  if (!url) return ''
  if (url.startsWith('/api')) return url.substring(4)
  return url
}

const FormModal = ({ myRef, onRefresh }: Props) => {
  useImperativeHandle(myRef, () => ({
    showModal,
  }))
  const [form] = Form.useForm<CarDTO>()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('add')
  const [id, setId] = useState<number>()
  const [uploading, setUploading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>()
  const isDisabled = useMemo(() => {
    return actionType === 'view'
  }, [actionType])
  const token: string = useGlobalStore.getState().token

  // 从API获取品牌车型级联选项
  const { data: treeData } = useRequest(getModelTree, {
    ready: visible,
  })

  // 转换为品牌选项格式
  const brandOptions = useMemo(() => {
    if (!treeData?.data) return []
    return treeData.data.map((item) => ({
      value: item.value,
      label: item.label,
      children: item.children?.map((child) => ({
        value: child.value,
        label: child.label,
      })),
    }))
  }, [treeData])

  // 当前选中品牌的车型列表
  const modelOptions = useMemo(() => {
    if (!selectedBrand || !treeData?.data) return []
    const brandItem = treeData.data.find((item) => item.value === selectedBrand)
    return brandItem?.children || []
  }, [selectedBrand, treeData])

  // 品牌选择变化
  const handleBrandChange = (value: string) => {
    setSelectedBrand(value)
    form.setFieldValue('brand', value)
    form.setFieldValue('model', undefined)
  }

  // 车型选择变化
  const handleModelChange = (value: string) => {
    form.setFieldValue('model', value)
  }

  const { run: getDetail, loading } = useRequest(
    async (id) => {
      const result = await getCarDetail(id!)
      if (result.data) {
        form.setFieldsValue({ ...result.data })
        if (result.data.brand) {
          setSelectedBrand(result.data.brand)
        }
        if (result.data.imageList) {
          setImageUrls(result.data.imageList.map(getFullImageUrl))
        }
      }
    },
    { manual: true }
  )

  const showModal = async (type: ActionType, id?: number) => {
    setActionType(type)
    setVisible(true)
    if (type === 'add') {
      form.resetFields()
      setId(undefined)
      setSelectedBrand(undefined)
      form.setFieldValue('year', new Date().getFullYear())
      form.setFieldValue('status', 1) // 默认已上线
      setImageUrls([])
    } else {
      setId(id)
      getDetail(id)
    }
  }

  const { loading: submitLoading, run: handleSubmit } = useRequest(
    async (actionType: ActionType, data: CarDTO) => {
      if (actionType === 'add') {
        await createCar(data)
      } else {
        await updateCar({
          ...data,
          id,
        })
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('操作成功')
        setVisible(false)
        onRefresh()
      },
    }
  )

  const handleOk = async () => {
    const formData = await form.validateFields()
    // 将图片URL列表转换为逗号分隔的字符串
    formData.images = imageUrls.map(getRelativeImageUrl).join(',')
    handleSubmit(actionType, formData)
  }

  // 图片上传前的转换
  const beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG/WEBP 文件!')
      return false
    }
    const isLt5M = (file.size || 0) / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('图片大小不能超过 5MB!')
      return false
    }
    return true
  }

  // 处理图片上传
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploading(true)
      return
    }
    if (info.file.status === 'done') {
      const url = info.file.response?.data?.fileUrl || ''
      const fullUrl = getFullImageUrl(url)
      setImageUrls([...imageUrls, fullUrl])
      form.setFieldValue(
        'images',
        imageUrls.map(getRelativeImageUrl).join(',') + (imageUrls.length > 0 ? ',' : '') + url
      )
      setUploading(false)
      message.success('图片上传成功')
    } else if (info.file.status === 'error') {
      message.error('图片上传失败')
      setUploading(false)
    }
  }

  // 删除图片
  const handleRemove = (url: string) => {
    const newUrls = imageUrls.filter((u) => u !== url)
    setImageUrls(newUrls)
    form.setFieldValue('images', newUrls.map(getRelativeImageUrl).join(','))
  }

  const uploadButton = (
    <div>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  return (
    <Modal
      title={ModalTitleMap[actionType] + '车辆'}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ disabled: loading, loading: submitLoading }}
      onCancel={() => {
        setVisible(false)
      }}
      width={700}
    >
      <Spin spinning={loading}>
        <Form form={form} labelCol={{ span: 5 }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="brand" label="品牌" rules={[{ required: true, message: '请选择品牌' }]}>
                <Select
                  placeholder="请选择品牌"
                  disabled={isDisabled}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="model" label="车型" rules={[{ required: true, message: '请选择车型' }]}>
                <Select
                  placeholder={selectedBrand ? '请选择车型' : '请先选择品牌'}
                  disabled={isDisabled || !selectedBrand}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={handleModelChange}
                >
                  {modelOptions.map((item) => (
                    <Option key={item.value} value={item.value} label={item.label}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }]}>
            <InputNumber placeholder="请输入价格" style={{ width: '100%' }} min={0} disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="mileage" label="里程数" rules={[{ required: true, message: '请输入里程数' }]}>
            <InputNumber placeholder="请输入里程数" style={{ width: '100%' }} min={0} disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="year" label="年份" rules={[{ required: true, message: '请选择年份' }]}>
            <InputNumber
              placeholder="请选择年份"
              style={{ width: '100%' }}
              min={1900}
              max={2030}
              disabled={isDisabled}
            />
          </Form.Item>
          <Form.Item name="fuelType" label="燃料类型">
            <Select placeholder="请选择燃料类型" style={{ width: '100%' }} disabled={isDisabled} allowClear>
              {FUEL_TYPES.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="transmission" label="变速箱">
            <Select placeholder="请选择变速箱" style={{ width: '100%' }} disabled={isDisabled} allowClear>
              {TRANSMISSION_TYPES.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="pickupLocation" label="提车地址" rules={[{ required: true, message: '请输入提车地址' }]}>
            <Input placeholder="请输入提车地址" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select placeholder="请选择状态" style={{ width: '100%' }} disabled={isDisabled}>
              <Option value={1}>已上线</Option>
              <Option value={0}>已下线</Option>
            </Select>
          </Form.Item>
          <Form.Item label="车辆图片">
            <div style={{ marginBottom: 16 }}>
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/files/upload"
                headers={{
                  Authorization: `Bearer ${token}`,
                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                disabled={isDisabled}
              >
                {uploadButton}
              </Upload>
            </div>
            {/* 已上传的图片列表 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {imageUrls.map((url, index) => (
                <div key={index} style={{ position: 'relative', width: 100, height: 100 }}>
                  <img
                    src={url}
                    alt={`car-${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 4,
                      border: '1px solid #d9d9d9',
                    }}
                  />
                  {!isDisabled && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        cursor: 'pointer',
                        background: '#ff4d4f',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                      }}
                      onClick={() => handleRemove(url)}
                    >
                      ×
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入车辆描述" rows={3} disabled={isDisabled} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
