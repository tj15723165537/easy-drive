import React, { Ref, useImperativeHandle, useMemo, useState } from 'react'
import { Form, Input, message, Modal, Spin, Tree, TreeProps } from 'antd'
import { createRole, getRoleDetail, updateRole, RoleDTO, getMenuList, MenuVO } from '@/api/modules/system'
import { ModalTitleMap } from '@/const/formModal'
import { useRequest } from 'ahooks'
import { DataNode } from 'antd/es/tree'

interface Props {
  myRef: Ref<any>
  onRefresh: () => void
}
const FormModal = ({ myRef, onRefresh }: Props) => {
  useImperativeHandle(myRef, () => ({
    showModal,
  }))
  const [form] = Form.useForm<RoleDTO>()
  const [visible, setVisible] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('add')
  const [id, setId] = useState<number>()
  const isDisabled = useMemo(() => {
    return actionType === 'view'
  }, [actionType])

  const { run: getDetail, loading } = useRequest(
    async (id) => {
      const result = await getRoleDetail(id!)
      form.setFieldsValue({ ...result.data })
      setSelectedKeys(result.data?.menuIds ?? [])
    },
    { manual: true }
  )
  const showModal = async (type: ActionType, id?: number) => {
    setActionType(type)
    setVisible(true)
    if (type === 'add') {
      form.resetFields()
      setId(undefined)
      setSelectedKeys([])
    } else {
      setId(id)
      getDetail(id)
    }
    getTreeData()
  }

  const { loading: submitLoading, run: handleSubmit } = useRequest(
    async (actionType: ActionType, data: RoleDTO) => {
      let submitFun
      if (actionType === 'add') {
        submitFun = createRole
      } else {
        submitFun = updateRole
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

  const [treeData, setTreeData] = useState<MenuVO[]>([])
  const [selectedKeys, setSelectedKeys] = useState<number[]>()
  function getTreeData() {
    getMenuList().then((res) => {
      setTreeData(res.data!)
    })
  }
  const onCheck: TreeProps['onCheck'] = (selectedKeys) => {
    setSelectedKeys(selectedKeys as number[])
    form.setFieldsValue({
      menuIds: selectedKeys as number[],
    })
  }
  return (
    <Modal
      title={ModalTitleMap[actionType] + '角色'}
      open={visible}
      onOk={handleOk}
      okButtonProps={{ disabled: loading, loading: submitLoading }}
      onCancel={() => {
        setVisible(false)
      }}>
      <Spin spinning={loading}>
        <Form form={form} labelCol={{ span: 4 }}>
          <Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
            <Input placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
          <Form.Item name="menuIds" label="权限" rules={[{ required: true, message: '请选择' }]}>
            <Tree
              disabled={isDisabled}
              checkable
              checkedKeys={selectedKeys}
              onCheck={onCheck}
              fieldNames={{
                key: 'id',
              }}
              treeData={treeData as unknown as DataNode[]}
            />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入" disabled={isDisabled} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default FormModal
