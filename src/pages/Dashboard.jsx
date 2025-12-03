import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Horario from './DasboardSections/Horario'
import Calificaciones from './DasboardSections/Calificaciones'
import Apuntes from './DasboardSections/Apuntes'

export default function Dashboard() {
    return (
        <div>
        <NavBar />
        <main style={{ padding: 16 }}>
            <Routes>
            <Route index element={<Navigate to="horario" replace />} />
            <Route path="horario" element={<Horario />} />
            <Route path="calificaciones" element={<Calificaciones />} />
            <Route path="apuntes" element={<Apuntes />} />
            </Routes>
        </main>
        </div>
    )
}
