import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/UI/Sidebar';
import StatCard from '../components/UI/StatCard';
import Card from '../components/UI/Card';
import { authService } from '../services/authService';

// Secciones
import Horario from './DashboardSections/Horario';
import Calificaciones from './DashboardSections/Calificaciones';
import Apuntes from './DashboardSections/Apuntes';
import Tareas from './DashboardSections/Tareas';
import Resumen from './DashboardSections/Resumen';
import Materias from './DashboardSections/Materias';

// Componente Home interno eliminado, ahora usamos Resumen.jsx

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar (Desktop) */}
            <Sidebar />

            {/* Contenido Principal */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header Móvil (Solo visible en pantallas pequeñas) */}
                <div className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                     <span className="font-bold text-gray-800">Agenda U</span>
                     {/* Aquí iría el botón de menú hamburguesa más adelante */}
                     <button className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                     </button>
                </div>

                {/* Área de Scroll */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                   <Routes>
                       <Route path="/" element={<Navigate to="home" replace />} />
                       <Route path="home" element={<Resumen />} />
                       <Route path="schedule" element={<Horario />} />
                       <Route path="grades" element={<Calificaciones />} />
                       <Route path="notes" element={<Apuntes />} />
                       <Route path="tasks" element={<Tareas />} />
                       <Route path="subjects" element={<Materias />} />
                   </Routes>
                </main>
            </div>
        </div>
    );
}
