import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import useMenuStore from '@/store/menu'

const CollapseIcon = () => {
  const isCollapse = useMenuStore((s) => s.isCollapse)
  const updateCollapse = useMenuStore((s) => s.updateCollapse)
  return (
    <div
      className="collapsed"
      onClick={() => {
        updateCollapse(!isCollapse)
      }}>
      {isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
    </div>
  )
}

export default CollapseIcon
