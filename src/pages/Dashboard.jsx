import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../components/UI/Sidebar';
import { authService } from '../services/authService';

// Secciones
import Horario from './DashboardSections/Horario';
import Calificaciones from './DashboardSections/Calificaciones';
import Apuntes from './DashboardSections/Apuntes';
import Tareas from './DashboardSections/Tareas';
import Resumen from './DashboardSections/Resumen';
import Materias from './DashboardSections/Materias';
import AdminDashboard from './AdminDashboard';

// Componente para envolver las páginas con animación
const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
    >
        {children}
    </motion.div>
);

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

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
                     <button className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                     </button>
                </div>

                {/* Área de Scroll */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                   <AnimatePresence mode="wait">
                       <Routes location={location} key={location.pathname}>
                           <Route path="/" element={<Navigate to="home" replace />} />
                           <Route path="home" element={<PageWrapper><Resumen /></PageWrapper>} />
                           <Route path="schedule" element={<PageWrapper><Horario /></PageWrapper>} />
                           <Route path="grades" element={<PageWrapper><Calificaciones /></PageWrapper>} />
                           <Route path="notes" element={<PageWrapper><Apuntes /></PageWrapper>} />
                           <Route path="tasks" element={<PageWrapper><Tareas /></PageWrapper>} />
                           <Route path="subjects" element={<PageWrapper><Materias /></PageWrapper>} />
                           <Route path="admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
                       </Routes>
                   </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
