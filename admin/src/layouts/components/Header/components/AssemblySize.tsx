import { Dropdown } from 'antd'
import useGlobalStore from '@/store'
import { SizeType } from 'antd/es/config-provider/SizeContext'

const AssemblySize = () => {
  const assemblySize = useGlobalStore((s) => s.assemblySize)
  const setAssemblySize = useGlobalStore((s) => s.setAssemblySize)

  // 切换组件大小
  const onClick = (e: MenuInfo) => {
    setAssemblySize(e.key as SizeType)
  }

  const menuItems = [
    {
      key: 'middle',
      disabled: assemblySize === 'middle',
      label: '默认',
      onClick,
    },
    {
      key: 'large',
      disabled: assemblySize === 'large',
      label: '大型',
      onClick,
    },
    {
      key: 'small',
      disabled: assemblySize === 'small',
      label: '小型',
      onClick,
    },
  ]
  return (
    <Dropdown menu={{ items: menuItems }} placement="bottom" trigger={['click']} arrow={true}>
      <i className="icon-style iconfont icon-contentright"></i>
    </Dropdown>
  )
}

export default AssemblySize
