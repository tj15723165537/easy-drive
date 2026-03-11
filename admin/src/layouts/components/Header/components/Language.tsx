import { Dropdown } from 'antd'
import useGlobalStore from '@/store'

const Language = () => {
  const language = useGlobalStore((s) => s.language)
  const setLanguage = useGlobalStore((s) => s.setLanguage)

  const menuItems = [
    {
      key: '1',
      label: <span>简体中文</span>,
      onClick: () => setLanguage('zh'),
      disabled: language === 'zh',
    },
    {
      key: '2',
      label: <span>English</span>,
      onClick: () => setLanguage('en'),
      disabled: language === 'en',
    },
  ]
  return (
    <Dropdown menu={{ items: menuItems }} placement="bottom" trigger={['click']} arrow={true}>
      <i className="icon-style iconfont icon-zhongyingwen"></i>
    </Dropdown>
  )
}

export default Language
