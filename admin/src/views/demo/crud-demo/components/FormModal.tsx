import React, { Ref, useImperativeHandle, useMemo, useState } from 'react'
import { Form, Input, InputNumber, message, Modal, Spin } from 'antd'
import { createDemo, DemoDTO, getDemoDetail, updateDemo } from '@/api/modules/demo'
import { ModalTitleMap } from '@/const/formModal'
import DictSelect from '@/components/Dict/DictSelect'
import { useRequest } from 'ahooks'

interface Props {
  myRef: Ref<any>
  onRefresh: () => void
}
const FormModal = ({ myRef, onRefresh }: Props) => {
  useImperativeHandle(myRef, () => ({
    showModal,
  }))
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('add')
  const [id, setId] = useState<Key>()
  const isDisabled = useMemo(() => {
    return actionType === 'view'
  }, [actionType])

  const { run: getDetail, loading } = useRequest(
    async (id) => {
      const result = await getDemoDetail(id!)
      form.setFieldsValue({ ...result.data })
    },
    { manual: true }
  )
  const showModal = async (type: ActionType, id?: Key) => {
    setActionType(type)
    setVisible(true)
    if (type === 'add') {
      form.resetFields()
      setId(undefined)
    } else {
      setId(id)
      getDetail(id)
    }
  }

  const { loading: submitLoading, run: handleSubmit } = useRequest(
    async (actionType: ActionType, data: DemoDTO) => {
      let submitFun
      if (actionType === 'add') {
        submitFun = createDemo
      } else {
        submitFun = updateDemo
        data.id = id!
      }
      await submitFun(data)
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
    handleSubmit(actionType, formData)
  }

  return (
    <Modal
      title={ModalTitleMap[actionType] + '示例'}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ disabled: loading, loading: submitLoading }}
      onCancel={() => {
        setVisible(false)
      }}>
      <Spin spinning={loading}>
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
            <DictSelect
              code="sex"
              disabled={isDisabled}
              placeholder="请选择"
              value={form.getFieldValue('sex')}
              onChange={(value) => {
                form.setFieldValue('sex', value)
              }}
            />
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true }]}>
            <InputNumber min={0} placeholder="请输入" className={'w-full'} disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true }]}>
            <Input.TextArea placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
