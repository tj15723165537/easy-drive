import { Dropdown, Menu } from 'antd'
import { CloseCircleOutlined, CloseOutlined, ColumnWidthOutlined, DownOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HOME_URL } from '@/config/config'

const MoreButton = (props: any) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Close multiple tabs
  const closeMultipleTab = (tabPath?: string) => {
    const handleTabsList = props.tabsList.filter((item: Menu.MenuOptions) => {
      return item.path === tabPath || item.path === HOME_URL
    })
    props.setTabsList(handleTabsList)
    tabPath ?? navigate(HOME_URL)
  }

  const menuItems = [
    {
      key: '1',
      label: t('tabs.closeCurrent'),
      icon: <CloseCircleOutlined />,
      onClick: () => props.delTabs(pathname),
    },
    {
      key: '2',
      label: t('tabs.closeOther'),
      icon: <ColumnWidthOutlined />,
      onClick: () => closeMultipleTab(pathname),
    },
    {
      key: '3',
      label: t('tabs.closeAll'),
      icon: <CloseOutlined />,
      onClick: () => closeMultipleTab(),
    },
  ]

  return (
    <Dropdown
      menu={{ items: menuItems, style: { padding: '5px', width: '120px', borderRadius: '6px' } }}
      placement="bottomRight"
      trigger={['click']}>
      <div className="more-button">
        <DownOutlined style={{ fontSize: '16px' }} />
      </div>
    </Dropdown>
  )
}

export default MoreButton
