import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  // useLocation() obtiene la ubicación actual de React Router
  // Es necesario para que AnimatePresence detecte cambios de ruta
  const location = useLocation()

  return (
    // AnimatePresence permite animar componentes cuando se montan/desmontan del DOM
    // mode="wait" hace que espere a que la página actual termine su animación de salida
    // antes de mostrar la nueva página, evitando superposiciones
    <AnimatePresence mode="wait">
      {/* key={location.pathname} es crucial: crea una clave única para cada ruta
          Cuando cambia la ruta, React detecta el cambio de key y activa las animaciones
          definidas en cada página (initial, animate, exit) */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        
        {/* Rutas Protegidas del Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
