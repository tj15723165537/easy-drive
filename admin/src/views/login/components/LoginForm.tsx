import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Login } from '@/api/interface'
import { loginApi, getUserInfoApi } from '@/api/modules/login'
import { HOME_URL } from '@/config/config'
import { useTranslation } from 'react-i18next'
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons'
import useGlobalStore from '@/store'
import useTabsStore from '@/store/tabs'

const LoginForm = () => {
  const { t } = useTranslation()
  const setToken = useGlobalStore((s) => s.setToken)
  const setUserInfo = useGlobalStore((s) => s.setUserInfo)
  const setTabsList = useTabsStore((s) => s.setTabsList)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  // 登录
  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    try {
      setLoading(true)
      const { data } = await loginApi(loginForm)
      setToken(data?.token!)

      // 获取用户信息
      const userInfoRes = await getUserInfoApi()
      if (userInfoRes.data) {
        setUserInfo(userInfoRes.data)
      }

      setTabsList([])
      message.success('登录成功！')
      navigate(HOME_URL)
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off">
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名：admin" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            form.resetFields()
          }}
          icon={<CloseCircleOutlined />}>
          {t('login.reset')}
        </Button>
        <Button type="primary" className={'ml-4'} htmlType="submit" loading={loading} icon={<UserOutlined />}>
          {t('login.confirm')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
