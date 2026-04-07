import './index.less'

const Home = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = weekDays[today.getDay()]

  return (
    <div className="home">
      <div className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-title">欢迎使用 Easy Drive 二手车交易平台</h1>
          <p className="welcome-subtitle">高效、便捷、可靠的二手车交易服务</p>
        </div>

        <div className="date-card">
          <div className="date-icon">📅</div>
          <div className="date-main">{year}年{month}月{day}日</div>
          <div className="date-week">{weekDay}</div>
        </div>
      </div>
    </div>
  )
}

export default Home
