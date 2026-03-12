import { useState, useImperativeHandle, Ref } from 'react'
import { Form, Input, Modal, message } from 'antd'
import { updatePasswordApi } from '@/api/modules/login'

interface Props {
  innerRef: Ref<{ showModal: () => void }>
}

const PasswordModal = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  useImperativeHandle(props.innerRef, () => ({
    showModal,
  }))
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalVisible(true)
    form.resetFields()
  }

  const handleOk = async () => {
    const formData = await form.validateFields()
    // 只发送后端需要的字段
    const { oldPassword, newPassword } = formData
    await updatePasswordApi({ oldPassword, newPassword })
    setIsModalVisible(false)
    message.success('修改密码成功 🎉🎉🎉')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Modal title="修改密码" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnHidden={true}>
      <Form form={form} layout="vertical" name="password_form" autoComplete="off">
        <Form.Item label="当前密码" name="oldPassword" rules={[{ required: true, message: '请输入当前密码' }]}>
          <Input.Password placeholder="请输入当前密码" />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码长度至少6位' },
            {
              validator: (_, value) =>
                value && form.getFieldValue('oldPassword') === value
                  ? Promise.reject(new Error('新密码不能与当前密码相同'))
                  : Promise.resolve(),
            },
          ]}>
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请再次输入新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次输入的密码不一致'))
              },
            }),
          ]}>
          <Input.Password placeholder="请再次输入新密码" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PasswordModal
