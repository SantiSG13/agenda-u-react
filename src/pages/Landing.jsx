import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
            
            {/* Barra de navegación */}
            <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <img src="./Logo.png" alt="Logo" className="w-10 h-10 rounded-xl" />
                        <span className="text-xl font-bold tracking-tight text-gray-800">Agenda U</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                        <a href="#features" className="hover:text-green-600 transition-colors">Características</a>
                        <a href="#testimonials" className="hover:text-green-600 transition-colors">Testimonios</a>
                        <a href="#faq" className="hover:text-green-600 transition-colors">Preguntas frecuentes</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Sección Hero */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                {/* Manchas de fondo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                     <div className="absolute top-20 left-10 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                     <div className="absolute top-20 right-10 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                </div>

                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-[#26667F] text-xs font-semibold mb-8 uppercase tracking-wide"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#26667F] animate-pulse"></span>
                        Tu compañero universitario ideal
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8"
                    >
                        Organiza tu vida <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67C090] to-[#26667F]">
                            universitaria
                        </span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Horarios, calificaciones, apuntes y tareas en un solo lugar. Simplifica tu semestre y alcanza tus metas académicas con Agenda U.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link 
                            to="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#67C090] to-[#26667F] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Comenzar Gratis
                        </Link>
                    </motion.div>

                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                     >
                         <div className="text-sm font-semibold text-gray-400">
                            + 50,000 estudiantes ya organizan su semestre
                         </div>
                    </motion.div>
                </div>
            </section>

            {/* Sección de características */}
            <section id="features" className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Todo lo que necesitas para triunfar</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Herramientas diseñadas específicamente para estudiantes universitarios que quieren mantener el control de su vida académica.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Característica 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Horario Inteligente</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Organiza tus clases, laboratorios y actividades extracurriculares en un solo lugar. Visualiza tu semana completa de un vistazo.
                            </p>
                        </div>

                         {/* Característica 2 */}
                         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Control de Calificaciones</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Registra y monitorea tus notas por materia. Calcula promedios automáticamente y establece metas académicas.
                            </p>
                        </div>

                         {/* Característica 3 */}
                         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Apuntes Digitales</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Toma notas organizadas por materia y tema. Accede a ellos desde cualquier dispositivo cuando los necesites.
                            </p>
                        </div>

                         {/* Característica 4 */}
                         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Gestión de Tareas</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Nunca olvides una entrega. Organiza tus tareas por fecha límite, prioridad y materia con recordatorios automáticos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Sección Cómo Funciona */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                La forma más simple de organizar tu semestre
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Regístrate en segundos</h3>
                                        <p className="text-gray-600 text-sm">Crea tu cuenta gratuita y configura tu perfil de estudiante rápidamente.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Carga tus materias</h3>
                                        <p className="text-gray-600 text-sm">Ingresa tus clases, horarios y porcentajes de calificación.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Toma el control</h3>
                                        <p className="text-gray-600 text-sm">Registra notas, tareas y visualiza tu progreso en tiempo real.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-teal-200 rounded-2xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
                                <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                                    {/* Abstract UI Representation */}
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-1/4 h-20 bg-gray-50 rounded-lg"></div>
                                        <div className="w-3/4 h-20 bg-gray-50 rounded-lg"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <div className="h-8 w-24 bg-green-100 rounded-lg"></div>
                                        <div className="h-8 w-8 bg-teal-100 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Testimonios */}
            <section id="testimonials" className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dicen los estudiantes</h2>
                        <p className="text-gray-500">Únete a miles de compañeros que ya mejoraron sus notas.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <div className="flex text-yellow-400 mb-4">
                                    {"★★★★★".split("").map((star, idx) => <span key={idx}>{star}</span>)}
                                </div>
                                <p className="text-gray-600 mb-6 italic">
                                    "Agenda U cambió por completo cómo organizo mi semestre. Antes siempre olvidaba las entregas, ahora tengo todo bajo control."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Estudiante Universitario</p>
                                        <p className="text-gray-400 text-xs">Ingeniería de Sistemas</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección FAQ */}
            <section id="faq" className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
                    </div>
                    <div className="space-y-4">
                        <details className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                            <summary className="flex items-center justify-between gap-1.5 font-medium text-gray-900">
                                <h3 className="font-bold">¿Es Agenda U realmente gratis?</h3>
                                <span className="text-gray-400 group-open:rotate-180 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-gray-600">
                                Sí, Agenda U tiene un plan gratuito que incluye todas las funciones esenciales para organizar tu semestre.
                            </p>
                        </details>

                        <details className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                            <summary className="flex items-center justify-between gap-1.5 font-medium text-gray-900">
                                <h3 className="font-bold">¿Puedo usarlo en mi celular?</h3>
                                <span className="text-gray-400 group-open:rotate-180 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-gray-600">
                                ¡Claro! Agenda U es una aplicación web totalmente responsiva, diseñada para funcionar perfectamente en computadoras, tablets y smartphones.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="bg-gradient-to-r from-[#67C090] to-[#26667F] rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        {/* Background Patterns */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para mejorar tus calificaciones?</h2>
                            <p className="text-green-50 text-lg mb-10 max-w-2xl mx-auto">
                                Únete hoy mismo y empieza a tomar el control de tu vida académica. Es gratis y toma menos de 1 minuto.
                            </p>
                            <Link 
                                to="/register"
                                className="inline-block px-10 py-4 bg-white text-teal-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
                            >
                                Crear Cuenta Gratis
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pie de página */}
            <footer className="bg-white py-12 border-t border-gray-100">
                <div className="container mx-auto px-6 max-w-6xl flex justify-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Agenda U. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}