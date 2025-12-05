import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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
        <div className="flex min-h-screen bg-white overflow-hidden relative">
            {/* Header Flotante */}
            <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 z-50 hover:opacity-80 transition-opacity p-2 bg-white/50 backdrop-blur-sm rounded-xl">
                <img src="/Logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                <span className="font-bold text-gray-800 text-lg hidden sm:block">Agenda U</span>
            </Link>

            {/* Sección Izquierda - Formulario */}
            <motion.div 
                className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">
                            Bienvenido a <span className="text-[#26667F]">Agenda U</span>
                        </h2>
                        <p className="text-gray-500">
                            Ingresa tus credenciales para acceder a tu cuenta.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
                                Usuario
                            </label>
                            <input 
                                id="username"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26667F] focus:ring-2 focus:ring-[#26667F]/20 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                                value={usuario} 
                                onChange={(e) => setUsuario(e.target.value)} 
                                placeholder="Ej. estudiante123"
                            />
                        </div>
                        
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Contraseña
                                </label>
                                <Link to="/recovery" className="text-sm font-medium text-[#26667F] hover:text-[#1a4a5c] transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <input 
                                id="password"
                                type="password" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26667F] focus:ring-2 focus:ring-[#26667F]/20 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-linear-to-r from-[#67C090] to-[#26667F] text-white font-bold py-3.5 px-4 rounded-xl hover:bg-[#1a4a5c] transform transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            ¿No tienes una cuenta?{' '}
                            <Link to="/register" className="font-bold text-[#67C090] hover:text-[#26667F] transition-colors">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Sección Derecha - Imagen */}
            <motion.div 
                className="hidden md:block md:w-1/2 relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute inset-0 bg-linear-to-br from-[#26667F]/30 to-[#67C090]/30 z-10 mix-blend-overlay"></div>
                <img 
                    src="/fondo.png" 
                    alt="Fondo Agenda U" 
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </div>
    )
}
