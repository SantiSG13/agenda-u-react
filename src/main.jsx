import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Ayuda a identificar problemas potenciales en la aplicación durante el desarrollo */}
    <BrowserRouter> {/* envuelve toda la app para permitir rutas con react-router-dom. Todo lo que esté dentro puede usar Route, Link, useNavigate, etc. */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
