import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('agendaU_user', 'true')
        localStorage.setItem('agendaU_username', usuario || 'Estudiante')
        navigate('/dashboard')
    }

    return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
        <h2>Inicia sesión en Agenda U</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
            <div>
            <label>Usuario</label>
            <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </div>
            <div style={{ marginTop: 8 }}>
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ marginTop: 12 }}>
            <button type="submit">Entrar</button>
            </div>
        </form>
        </div>
    )
}
