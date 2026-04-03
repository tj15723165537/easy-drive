import React, { Ref, useImperativeHandle, useState } from 'react'
import { Form, Input, InputNumber, Modal, Select, message } from 'antd'
import { useRequest } from 'ahooks'
import {
  createBrand,
  updateBrand,
  getBrandDetail,
  createModel,
  updateModel,
  getModelDetail,
  getBrandList,
  CarBrandDTO,
  CarModelDTO,
} from '@/api/modules/carModel'

const { Option } = Select

interface Props {
  onRefresh: () => void
  onModelRefresh: (brandId: number) => void
}

export interface FormModalRef {
  showBrandModal: (type: 'add' | 'edit', id?: number) => void
  showModelModal: (type: 'add' | 'edit', brandId?: number, id?: number) => void
}

const INITIALS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const FormModal: React.FC<Props> = ({ onRefresh, onModelRefresh }, ref: Ref<FormModalRef>) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<'brand' | 'model'>('brand')
  const [editType, setEditType] = useState<'add' | 'edit'>('add')
  const [brandId, setBrandId] = useState<number>()
  const [modelId, setModelId] = useState<number>()
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([])

  useImperativeHandle(ref, () => ({
    showBrandModal,
    showModelModal,
  }))

  const showBrandModal = async (type: 'add' | 'edit', id?: number) => {
    setActionType('brand')
    setEditType(type)
    setVisible(true)
    if (type === 'add') {
      form.resetFields()
    } else {
      const result = await getBrandDetail(id!)
      form.setFieldsValue(result.data)
    }
  }

  const showModelModal = async (type: 'add' | 'edit', brandId?: number, id?: number) => {
    setActionType('model')
    setEditType(type)
    setVisible(true)

    // 获取品牌列表
    const brandResult = await getBrandList()
    setBrands(brandResult.data || [])

    if (type === 'add') {
      form.resetFields()
      if (brandId) {
        form.setFieldValue('brandId', brandId)
      }
    } else {
      const result = await getModelDetail(id!)
      form.setFieldsValue({
        ...result.data,
        brandId: result.data.brandId,
      })
    }
  }

  const { loading: submitLoading, run: handleSubmit } = useRequest(
    async () => {
      const values = await form.validateFields()
      if (actionType === 'brand') {
        if (editType === 'add') {
          await createBrand(values as CarBrandDTO)
        } else {
          await updateBrand(modelId!, values as CarBrandDTO)
        }
      } else {
        if (editType === 'add') {
          await createModel(values as CarModelDTO)
        } else {
          await updateModel(modelId!, values as CarModelDTO)
        }
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('操作成功')
        setVisible(false)
        onRefresh()
        if (actionType === 'model' && brandId) {
          onModelRefresh(brandId)
        }
      },
    }
  )

  const handleOk = () => {
    handleSubmit()
  }

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={actionType === 'brand' ? (editType === 'add' ? '新增品牌' : '编辑品牌') : (editType === 'add' ? '新增车型' : '编辑车型')}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ loading: submitLoading }}
      onCancel={handleCancel}
      width={500}
    >
      <Form form={form} labelCol={{ span: 6 }} style={{ marginTop: 20 }}>
        {actionType === 'brand' ? (
          <>
            <Form.Item name="name" label="品牌名称" rules={[{ required: true, message: '请输入品牌名称' }]}>
              <Input placeholder="请输入品牌名称" />
            </Form.Item>
            <Form.Item name="initial" label="首字母">
              <Select placeholder="请选择首字母" allowClear style={{ width: '100%' }}>
                {INITIALS.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="sort" label="排序" initialValue={0}>
              <InputNumber placeholder="请输入排序" min={0} style={{ width: '100%' }} />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item name="brandId" label="所属品牌" rules={[{ required: true, message: '请选择所属品牌' }]}>
              <Select placeholder="请选择所属品牌" style={{ width: '100%' }}>
                {brands.map((brand) => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="name" label="车型名称" rules={[{ required: true, message: '请输入车型名称' }]}>
              <Input placeholder="请输入车型名称" />
            </Form.Item>
            <Form.Item name="sort" label="排序" initialValue={0}>
              <InputNumber placeholder="请输入排序" min={0} style={{ width: '100%' }} />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default FormModal
