import React, { Ref, useImperativeHandle, useMemo, useState } from 'react'
import { Form, Input, InputNumber, message, Modal, Spin } from 'antd'
import { createDict, DictDTO, getDictDetail, updateDict } from '@/api/modules/system'
import { ModalTitleMap } from '@/const/formModal'
import { useRequest } from 'ahooks'

interface Props {
  myRef: Ref<any>
  onRefresh: () => void
  dictTypeId: number
}
const FormModal = ({ myRef, onRefresh, dictTypeId }: Props) => {
  useImperativeHandle(myRef, () => ({
    showModal,
  }))
  const [form] = Form.useForm<DictDTO>()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('add')
  const [id, setId] = useState<number>()
  const isDisabled = useMemo(() => {
    return actionType === 'view'
  }, [actionType])

  const { run: getDetail, loading } = useRequest(
    async (id) => {
      const result = await getDictDetail(id!)
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
    async (actionType: ActionType, data: DictDTO) => {
      let submitFun
      if (actionType === 'add') {
        submitFun = createDict
      } else {
        submitFun = updateDict
        data.id = id!
      }
      await submitFun({
        ...data,
        dictTypeId,
      })
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
      title={ModalTitleMap[actionType] + '字典'}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ disabled: loading, loading: submitLoading }}
      onCancel={() => {
        setVisible(false)
      }}>
      <Spin spinning={loading}>
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item name="label" label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="value" label="字典值" rules={[{ required: true, message: '请输入字典值' }]}>
            <InputNumber min={0} className={'w-full'} placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
