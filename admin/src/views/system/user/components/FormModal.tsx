import React, { Ref, useImperativeHandle, useMemo, useState } from 'react'
import { Form, Input, message, Modal, Radio, Spin } from 'antd'
import { createUser, getRoleList, getUserDetail, RoleVO, updateUser, UserDTO } from '@/api/modules/system'
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
  const [form] = Form.useForm<UserDTO>()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('add')
  const [id, setId] = useState<number>()
  const isDisabled = useMemo(() => {
    return actionType === 'view'
  }, [actionType])

  const { run: getDetail, loading } = useRequest(
    async (id) => {
      const result = await getUserDetail(id!)
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
      form.setFieldValue('status', 1)
    } else {
      setId(id)
      getDetail(id)
    }
    getRole()
  }

  const { loading: submitLoading, run: handleSubmit } = useRequest(
    async (actionType: ActionType, data: UserDTO) => {
      let submitFun
      if (actionType === 'add') {
        submitFun = createUser
      } else {
        submitFun = updateUser
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

  const [roles, setRoles] = useState<RoleVO[]>()
  async function getRole() {
    const res = await getRoleList()
    setRoles(res.data)
  }

  return (
    <Modal
      title={ModalTitleMap[actionType] + '用户'}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ disabled: loading, loading: submitLoading }}
      onCancel={() => {
        setVisible(false)
      }}>
      <Spin spinning={loading}>
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="nick_name" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]}>
            <Input placeholder="请输入" disabled={isDisabled} maxLength={11} />
          </Form.Item>
          <Form.Item name="roleId" label="角色" rules={[{ required: true, message: '请选择' }]}>
            <Radio.Group
              onChange={(v) => {
                form.setFieldsValue({ roleId: v.target.value })
              }}
              value={form.getFieldValue('roleId')}>
              {roles?.map((item) => {
                return <Radio value={item.id} key={item.id}>{item.name}</Radio>
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Radio.Group
              onChange={(v) => {
                form.setFieldsValue({ status: v.target.value })
              }}
              value={form.getFieldValue('status')}>
              <Radio value={1}>正常</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
