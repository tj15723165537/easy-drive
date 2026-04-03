import { useState, useEffect } from 'react'
import { Weather } from './components/Weather'
import './index.less'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weekDay = weekDays[date.getDay()]
    return { dateStr: `${year}年${month}月${day}日`, weekDay }
  }

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  const { dateStr, weekDay } = formatDate(currentTime)

  return (
    <div className="home">
      <div className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-title">欢迎使用 Easy Drive 二手车交易平台</h1>
          <p className="welcome-subtitle">高效、便捷、可靠的二手车交易服务</p>
        </div>

        <div className="info-cards">
          <div className="info-card time-card">
            <div className="info-card-icon">⏰</div>
            <div className="info-card-content">
              <div className="info-card-label">当前时间</div>
              <div className="info-card-value time">{formatTime(currentTime)}</div>
            </div>
          </div>

          <div className="info-card date-card">
            <div className="info-card-icon">📅</div>
            <div className="info-card-content">
              <div className="info-card-label">今日日期</div>
              <div className="info-card-value">{dateStr}</div>
              <div className="info-card-weekday">{weekDay}</div>
            </div>
          </div>

          <Weather />
        </div>
      </div>
    </div>
  )
}

export default Home
