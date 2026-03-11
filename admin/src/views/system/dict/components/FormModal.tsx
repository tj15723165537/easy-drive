import React, { Ref, useImperativeHandle, useMemo, useState } from 'react'
import { Form, Input, message, Modal, Spin } from 'antd'
import { createDictType, DictTypeDTO, getDictTypeDetail, updateDictType } from '@/api/modules/system'
import { ModalTitleMap } from '@/const/formModal'
import { useRequest } from 'ahooks'

interface Props {
  myRef: Ref<any>
  onRefresh: () => void
}
const FormModal = ({ myRef, onRefresh }: Props) => {
  useImperativeHandle(myRef, () => ({
    showModal,
  }))
  const [form] = Form.useForm<DictTypeDTO>()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('add')
  const [id, setId] = useState<number>()
  const isDisabled = useMemo(() => {
    return actionType === 'view'
  }, [actionType])

  const { run: getDetail, loading } = useRequest(
    async (id) => {
      const result = await getDictTypeDetail(id!)
      form.setFieldsValue({ ...result.data })
    },
    { manual: true }
  )
  const showModal = async (type: ActionType, id?: number) => {
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
    async (actionType: ActionType, data: DictTypeDTO) => {
      let submitFun
      if (actionType === 'add') {
        submitFun = createDictType
      } else {
        submitFun = updateDictType
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
      title={ModalTitleMap[actionType] + '字典分类'}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ disabled: loading, loading: submitLoading }}
      onCancel={() => {
        setVisible(false)
      }}>
      <Spin spinning={loading}>
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="code" label="编码" rules={[{ required: true, message: '请输入编码' }]}>
            <Input placeholder="请输入" disabled={actionType !== 'add'} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
