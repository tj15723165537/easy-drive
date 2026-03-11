import { useRef } from 'react'
import { Avatar, Dropdown, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '@/store'
import PasswordModal from './PasswordModal'
import InfoModal from './InfoModal'
import avatar from '@/assets/images/avatar.png'
import { ItemType } from 'antd/es/menu/interface'

const AvatarIcon = () => {
  const setToken = useGlobalStore((s) => s.setToken)
  const navigate = useNavigate()

  interface ModalProps {
    showModal: () => void
  }
  const passRef = useRef<ModalProps>(null)
  const infoRef = useRef<ModalProps>(null)

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '温馨提示 🧡',
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
      key: '1',
      label: <span className="dropdown-item">修改密码</span>,
      onClick: () => passRef.current!.showModal(),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: <span className="dropdown-item">退出登录</span>,
      onClick: logout,
    },
  ]
  return (
    <>
      <Dropdown menu={{ items: menuItems }} placement="bottom" arrow trigger={['click']}>
        <Avatar size="large" src={avatar} />
      </Dropdown>
      <InfoModal innerRef={infoRef}></InfoModal>
      <PasswordModal innerRef={passRef}></PasswordModal>
    </>
  )
}

export default AvatarIcon
