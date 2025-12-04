import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
    const navigate = useNavigate()
    const username = localStorage.getItem('agendaU_username') || 'Estudiante'

    const handleLogout = () => {
        localStorage.removeItem('agendaU_user')
        localStorage.removeItem('agendaU_username')
        navigate('/')
    }

    return (
        <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
            <div><strong>Agenda U</strong></div>
            <Link to="/dashboard/horario">Horario</Link>
            <Link to="/dashboard/calificaciones">Calificaciones</Link>
            <Link to="/dashboard/apuntes">Apuntes</Link>
            <div style={{ marginLeft: 'auto' }}>
                Hola, {username} <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </nav>
    )
}
