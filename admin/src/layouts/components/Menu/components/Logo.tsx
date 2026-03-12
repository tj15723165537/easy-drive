import logo from '@/assets/images/logo.png'
import useMenuStore from '@/store/menu'

const Logo = () => {
  const isCollapse = useMenuStore((s) => s.isCollapse)
  return (
    <div className="logo-box">
      <img src={logo} alt="logo" className="logo-img" />
      {!isCollapse ? <h2 className="logo-text">Easy Drive</h2> : null}
    </div>
  )
}

export default Logo
