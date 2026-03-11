import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/reset.less'
import '@/assets/iconfont/iconfont.less'
import '@/assets/fonts/font.less'
import '@/styles/common.less'
import '@/language/index'
import 'virtual:svg-icons-register'
import App from '@/App'
import 'virtual:uno.css'

// if (import.meta.env.MODE === 'development') {
//   import('./mock')
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
