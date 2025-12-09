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

// PageWrapper: Componente reutilizable que añade animaciones consistentes a todas las secciones del dashboard
// Esto evita repetir el código de animación en cada sección individual
const PageWrapper = ({ children }) => (
    <motion.div
        // initial: Estado cuando el componente aparece por primera vez
        // opacity: 0 (invisible), y: 20 (20px más abajo de su posición final)
        initial={{ opacity: 0, y: 20 }}
        
        // animate: Estado final al que debe animar
        // opacity: 1 (completamente visible), y: 0 (posición original)
        animate={{ opacity: 1, y: 0 }}
        
        // exit: Animación cuando el componente se desmonta (al cambiar de sección)
        // opacity: 0 (se desvanece), y: -20 (sube 20px)
        // Crea un efecto de "la sección se va hacia arriba mientras entra la nueva desde abajo"
        exit={{ opacity: 0, y: -20 }}
        
        // transition: Configuración de la animación
        // duration: 0.3s - Más rápido que las transiciones de página completa (0.5s)
        // porque los usuarios navegan frecuentemente entre secciones del dashboard
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
                   {/* AnimatePresence permite animar las transiciones entre secciones del dashboard
                       Similar a App.jsx pero para navegación interna del dashboard
                       mode="wait" asegura que la sección actual termine de salir antes de mostrar la nueva */}
                   <AnimatePresence mode="wait">
                       {/* key={location.pathname} activa las animaciones de PageWrapper al cambiar de sección */}
                       <Routes location={location} key={location.pathname}>
                           <Route path="/" element={<Navigate to="home" replace />} />
                           {/* Cada sección está envuelta en PageWrapper para animaciones consistentes */}
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
