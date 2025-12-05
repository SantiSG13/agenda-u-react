import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Aquí iría la lógica de registro real
        localStorage.setItem('agendaU_user', 'true')
        localStorage.setItem('agendaU_username', formData.nombre || 'Estudiante')
        navigate('/dashboard')
    }

    return (
        <div className="flex min-h-screen bg-white overflow-hidden flex-row-reverse relative">
             {/* Header Flotante */}
             <Link to="/" className="absolute top-6 right-6 flex items-center gap-2 z-50 hover:opacity-80 transition-opacity p-2 bg-white/50 backdrop-blur-sm rounded-xl">
                <img src="/Logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                <span className="font-bold text-gray-800 text-lg hidden sm:block">Agenda U</span>
            </Link>

            {/* Sección Derecha (ahora izquierda visualmente) - Formulario */}
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
                            Registrate en <span className="text-[#26667F]">Agenda U</span>
                        </h2>
                        <p className="text-gray-500">
                            Únete y organiza tu vida académica.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Nombre Completo"
                            id="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej. Juan Pérez"
                            required
                        />

                        <Input
                            label="Correo Electrónico"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@universidad.edu.co"
                            required
                        />
                        
                        <Input
                            label="Contraseña"
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />

                        <Input
                            label="Confirmar Contraseña"
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />

                        <Button type="submit" className="mt-2">
                            Registrarse
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="font-bold text-[#67C090] hover:text-[#26667F] transition-colors">
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Sección Izquierda (ahora derecha visualmente) - Imagen */}
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
