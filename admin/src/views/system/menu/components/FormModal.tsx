import React, { Ref, useImperativeHandle, useMemo, useState } from 'react'
import { Form, Input, InputNumber, message, Modal, Spin, TreeSelect } from 'antd'
import { createMenu, getMenuDetail, MenuDTO, MenuVO, updateMenu } from '@/api/modules/system'
import { ModalTitleMap } from '@/const/formModal'
import { useRequest } from 'ahooks'
import IconSelector from '@/components/IconSelector'

interface Props {
  myRef: Ref<any>
  onRefresh: () => void
  treeData?: MenuVO[]
}
const FormModal = ({ myRef, onRefresh, treeData }: Props) => {
  useImperativeHandle(myRef, () => ({
    showModal,
  }))
  const [form] = Form.useForm<MenuDTO>()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('add')
  const [id, setId] = useState<number>()
  const isDisabled = useMemo(() => {
    return actionType === 'view'
  }, [actionType])

  const { run: getDetail, loading } = useRequest(
    async (id) => {
      const result = await getMenuDetail(id!)
      form.setFieldsValue({
        ...result.data,
        parent_id: result.data?.parent_id === 0 ? undefined : result.data?.parent_id,
      })
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
    async (actionType: ActionType, data: MenuDTO) => {
      let submitFun
      if (actionType === 'add') {
        submitFun = createMenu
      } else {
        submitFun = updateMenu
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
      title={ModalTitleMap[actionType] + '菜单'}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ disabled: loading, loading: submitLoading }}
      onCancel={() => {
        setVisible(false)
      }}>
      <Spin spinning={loading}>
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item name="parent_id" label="父级菜单">
            <TreeSelect
              treeData={treeData}
              disabled={isDisabled}
              placeholder="请选择"
              allowClear
              fieldNames={{
                value: 'id',
                label: 'title',
              }}
            />
          </Form.Item>
          <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="icon" label="图标" rules={[{ required: true, message: '请选择图标' }]}>
            <IconSelector
              disabled={isDisabled}
              value={form.getFieldValue('icon')}
              onChange={(value) => {
                form.setFieldValue('icon', value)
              }}
            />
          </Form.Item>
          <Form.Item name="path" label="路径" rules={[{ required: true, message: '请输入路径' }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="sort" label="排序">
            <InputNumber min={0} placeholder="请输入" disabled={isDisabled} className={'w-full'} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
