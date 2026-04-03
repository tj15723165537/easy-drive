import { useState, useEffect } from 'react'
import { Spin } from 'antd'

interface WeatherData {
  temp: string
  condition: string
  humidity: string
  wind: string
  icon: string
}

export const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://wttr.in/Beijing?format=j1&lang=zh', { mode: 'cors' })
        const data = await response.json()
        const current = data.current_condition[0]
        setWeather({
          temp: current.temp_C + '°C',
          condition: current.weatherDesc[0].value,
          humidity: current.humidity + '%',
          wind: current.windspeedKmph + ' km/h',
          icon: getWeatherIcon(current.weatherCode),
        })
      } catch (error) {
        console.error('获取天气失败:', error)
        setWeather({
          temp: '--',
          condition: '获取失败',
          humidity: '--',
          wind: '--',
          icon: '🌤️',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (code: string): string => {
    const iconMap: Record<string, string> = {
      '113': '☀️',
      '116': '⛅',
      '119': '☁️',
      '122': '☁️',
      '143': '🌫️',
      '176': '🌧️',
      '179': '🌨️',
      '182': '🌨️',
      '185': '🌨️',
      '200': '⛈️',
      '227': '🌨️',
      '230': '❄️',
      '248': '🌫️',
      '260': '🌫️',
      '263': '🌧️',
      '266': '🌧️',
      '281': '🌨️',
      '284': '🌨️',
      '293': '🌧️',
      '296': '🌧️',
      '299': '🌧️',
      '302': '🌧️',
      '305': '🌧️',
      '308': '🌧️',
      '311': '🌨️',
      '314': '🌨️',
      '317': '🌨️',
      '320': '🌨️',
      '323': '🌨️',
      '326': '🌨️',
      '329': '❄️',
      '332': '❄️',
      '335': '❄️',
      '338': '❄️',
      '350': '🌨️',
      '353': '🌧️',
      '356': '🌧️',
      '359': '🌧️',
      '362': '🌨️',
      '365': '🌨️',
      '368': '🌨️',
      '371': '❄️',
      '374': '🌨️',
      '377': '🌨️',
      '386': '⛈️',
      '389': '⛈️',
      '392': '⛈️',
      '395': '❄️',
    }
    return iconMap[code] || '🌤️'
  }

  if (loading) {
    return <Spin size="small" />
  }

  if (!weather) {
    return <div className="weather-error">天气加载失败</div>
  }

  return (
    <div className="info-card weather-card">
      <div className="info-card-icon">{weather.icon}</div>
      <div className="info-card-content">
        <div className="info-card-label">北京天气</div>
        <div className="info-card-value">{weather.temp}</div>
        <div className="info-card-desc">{weather.condition}</div>
        <div className="info-card-extra">
          💧 {weather.humidity} 💨 {weather.wind}
        </div>
      </div>
    </div>
  )
}
