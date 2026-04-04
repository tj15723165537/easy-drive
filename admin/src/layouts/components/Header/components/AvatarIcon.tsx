import { useRef } from 'react'
import { Avatar, Dropdown, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '@/store'
import PasswordModal from './PasswordModal'
import avatar from '@/assets/images/avatar.png'
import type { ItemType } from 'antd/es/menu/interface'

// 将后端返回的相对路径转换为完整的 API URL
const getFullImageUrl = (url: string | undefined) => {
  if (!url) return ''
  // 如果已经是完整 URL 或以 /api 开头，直接返回
  if (url.startsWith('http') || url.startsWith('/api')) return url
  // 否则添加 /api 前缀
  return '/api' + url
}

const AvatarIcon = () => {
  const setToken = useGlobalStore((s) => s.setToken)
  const userInfo = useGlobalStore((s) => s.userInfo)
  const navigate = useNavigate()

  interface ModalProps {
    showModal: () => void
  }
  const passRef = useRef<ModalProps>(null)

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setToken('')
        message.success('退出登录成功！')
        navigate('/login')
      },
    })
  }

  const menuItems: ItemType[] = [
    {
      key: 'profile',
      label: <span className="dropdown-item">个人中心</span>,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'password',
      label: <span className="dropdown-item">修改密码</span>,
      onClick: () => passRef.current!.showModal(),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <span className="dropdown-item">退出登录</span>,
      onClick: logout,
    },
  ]

  const avatarUrl = userInfo?.avatar ? getFullImageUrl(userInfo.avatar) : avatar

  return (
    <>
      <Dropdown menu={{ items: menuItems }} placement="bottom" arrow trigger={['click']}>
        <Avatar size="large" src={avatarUrl} />
      </Dropdown>
      <PasswordModal innerRef={passRef}></PasswordModal>
    </>
  )
}

export default AvatarIcon
