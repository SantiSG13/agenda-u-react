import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
        <header>
            <img src="../../public/logo.png" alt=""/>
            <h1>Agenda U</h1>
            <p>Tu organizador para la vida universitaria.</p>
        </header>

        <main>
            <section style={{ marginTop: 24 }}>
            <h2>Funciones</h2>
            <ul>
                <li>Horario</li>
                <li>Calificaciones</li>
                <li>Apuntes</li>
                <li>Tareas y recordatorios</li>
            </ul>
            </section>

            <div style={{ marginTop: 24 }}>
            <Link to="/login">Iniciar sesión</Link>
            </div>
        </main>
        </div>
    )
}
