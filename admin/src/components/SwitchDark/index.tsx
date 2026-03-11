import { Switch } from 'antd'
import useGlobalStore from '@/store'

const SwitchDark = () => {
  const themeConfig = useGlobalStore((s) => s.themeConfig)
  const setThemeConfig = useGlobalStore((s) => s.setThemeConfig)
  const onChange = (checked: boolean) => {
    setThemeConfig({ ...themeConfig, isDark: checked })
  }

  return (
    <Switch
      className="dark"
      defaultChecked={themeConfig.isDark}
      checkedChildren={<>🌞</>}
      unCheckedChildren={<>🌜</>}
      onChange={onChange}
    />
  )
}

export default SwitchDark
