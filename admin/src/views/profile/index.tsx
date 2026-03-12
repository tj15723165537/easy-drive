import React, { useEffect, useState } from 'react'
import { Button, Card, Descriptions, Form, Input, message, Spin, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { getUserInfoApi, updateProfileApi } from '@/api/modules/login'
import useGlobalStore from '@/store'
import type { UploadChangeParam } from 'antd/es/upload'
import type { UploadFile, UploadProps } from 'antd'
import moment from 'moment'
import './index.less'

// 用户信息接口
interface UserInfo {
  id: number
  username: string
  nickname: string
  phone: string
  avatar: string
  status: number
  createTime: string
}

// 将后端返回的相对路径转换为完整的 API URL
const getFullImageUrl = (url: string | undefined) => {
  if (!url) return ''
  // 如果已经是完整 URL 或以 /api 开头，直接返回
  if (url.startsWith('http') || url.startsWith('/api')) return url
  // 否则添加 /api 前缀
  return '/api' + url
}

const Profile = () => {
  const userInfo = useGlobalStore((s) => s.userInfo)
  const setUserInfo = useGlobalStore((s) => s.setUserInfo)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [form] = Form.useForm<UserInfo>()
  const token: string = useGlobalStore.getState().token

  // 获取用户信息
  const fetchUserInfo = async () => {
    setLoading(true)
    try {
      const { data } = await getUserInfoApi()
      if (data) {
        setUserInfo(data)
        form.setFieldsValue(data)
        setImageUrl(data.avatar || '')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      fetchUserInfo()
    } else {
      form.setFieldsValue(userInfo)
      setImageUrl(getFullImageUrl(userInfo.avatar))
    }
  }, [userInfo])

  // 进入编辑模式
  const handleEdit = () => {
    setIsEditing(true)
  }

  // 取消编辑
  const handleCancel = () => {
    setIsEditing(false)
    form.resetFields()
    if (userInfo) {
      form.setFieldsValue(userInfo)
      setImageUrl(getFullImageUrl(userInfo.avatar))
    }
  }

  // 保存信息
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      setSaving(true)

      // 调用更新API
      await updateProfileApi({
        nickname: values.nickname,
        phone: values.phone,
        avatar: values.avatar,
      })

      message.success('保存成功 🎉')
      setIsEditing(false)
      fetchUserInfo()
    } catch (error: any) {
      console.error('保存失败:', error)
      message.error(error.message || '保存失败')
    } finally {
      setSaving(false)
    }
  }

  // 头像上传前的转换
  const beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 文件!')
      return false
    }
    const isLt2M = (file.size || 0) / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!')
      return false
    }
    return true
  }

  // 处理头像上传
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploading(true)
      return
    }
    if (info.file.status === 'done') {
      // 获取上传成功后返回的URL
      const url = info.file.response?.data?.fileUrl || ''
      const fullUrl = getFullImageUrl(url)
      setImageUrl(fullUrl)
      form.setFieldValue('avatar', url) // 存储原始 URL，因为后端需要相对路径
      setUploading(false)
      message.success('头像上传成功')
    } else if (info.file.status === 'error') {
      message.error('头像上传失败')
      setUploading(false)
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </button>
  )

  return (
    <div className="profile-container">
      <Spin spinning={loading}>
        <Card title="个人中心" className="profile-card">
          <div className="profile-content">
            {/* 头像区域 */}
            <div className="avatar-section">
              <Upload
                name="file"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/files/upload"
                headers={{
                  Authorization: `Bearer ${token}`,
                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                disabled={!isEditing}>
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
              {!isEditing && (
                <p className="avatar-tip">点击"编辑"按钮可修改头像</p>
              )}
            </div>

            {/* 信息表单区域 */}
            <div className="info-section">
              {isEditing ? (
                <Form form={form} layout="vertical">
                  <Form.Item name="username" label="账号">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
                    <Input placeholder="请输入昵称" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
                    ]}>
                    <Input placeholder="请输入手机号" maxLength={11} />
                  </Form.Item>
                  <Form.Item name="avatar" label="头像URL" hidden>
                    <Input />
                  </Form.Item>

                  <div className="form-actions">
                    <Button type="primary" onClick={handleSave} loading={saving || uploading}>
                      保存
                    </Button>
                    <Button onClick={handleCancel}>取消</Button>
                  </div>
                </Form>
              ) : (
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="账号">{userInfo?.username}</Descriptions.Item>
                  <Descriptions.Item label="昵称">{userInfo?.nickname}</Descriptions.Item>
                  <Descriptions.Item label="手机号">{userInfo?.phone}</Descriptions.Item>
                  <Descriptions.Item label="注册时间">{userInfo?.createTime ? moment(userInfo.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</Descriptions.Item>
                </Descriptions>
              )}

              {!isEditing && (
                <div className="view-actions">
                  <Button type="primary" icon={<UserOutlined />} onClick={handleEdit}>
                    编辑资料
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Spin>
    </div>
  )
}

export default Profile
