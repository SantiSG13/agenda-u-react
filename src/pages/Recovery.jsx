import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Recovery() {
    const [email, setEmail] = useState('')
    const [enviado, setEnviado] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulación de envío de correo
        setEnviado(true)
    }

    return (
        <div className="flex min-h-screen bg-white overflow-hidden flex-row-reverse relative">
            {/* Header Flotante */}
            <Link to="/" className="absolute top-6 right-6 flex items-center gap-2 z-50 hover:opacity-80 transition-opacity p-2 bg-white/50 backdrop-blur-sm rounded-xl">
                <img src="/Logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                <span className="font-bold text-gray-800 text-lg hidden sm:block">Agenda U</span>
            </Link>

            {/* Sección Derecha (Formulario) */}
            <motion.div 
                className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">
                            Recuperar <span className="text-[#26667F]">Contraseña</span>
                        </h2>
                        <p className="text-gray-500">
                            Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
                        </p>
                    </div>

                    {!enviado ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                    Correo Electrónico
                                </label>
                                <input 
                                    id="email"
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26667F] focus:ring-2 focus:ring-[#26667F]/20 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="ejemplo@universidad.edu.co"
                                    required
                                />
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-linear-to-r from-[#67C090] to-[#26667F] text-white font-bold py-3.5 px-4 rounded-xl hover:bg-[#1a4a5c] transform transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Enviar
                            </button>
                        </form>
                    ) : (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                            <div className="text-green-500 text-5xl mb-4">✓</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">¡Correo Enviado!</h3>
                            <p className="text-gray-600 mb-6">
                                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. Por favor revisa tu bandeja de entrada.
                            </p>
                            <button 
                                onClick={() => setEnviado(false)}
                                className="text-[#26667F] font-medium hover:underline"
                            >
                                Intentar con otro correo
                            </button>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            ¿Recordaste tu contraseña?{' '}
                            <Link to="/login" className="font-bold text-[#67C090] hover:text-[#26667F] transition-colors">
                                Volver al Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Sección Izquierda (Imagen) */}
            <motion.div 
                className="hidden md:block md:w-1/2 relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
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
