import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import FloatingHeader from '../components/UI/FloatingHeader'
import { authService } from '../services/authService'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        try {
            authService.login(email, password)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="flex min-h-screen bg-white overflow-hidden relative">
            {/* Header Flotante */}
            <FloatingHeader />

            {/* ANIMACIÓN DE ENTRADA LATERAL - Formulario desde la izquierda
                Este patrón crea un efecto de "puertas que se abren" donde ambos lados
                se deslizar hacia el centro desde direcciones opuestas */}
            
            {/* Sección Izquierda - Formulario */}
            <motion.div 
                className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12"
                // Entrada: Viene desde la izquierda (x: -50px)
                initial={{ opacity: 0, x: -50 }}
                // Estado final: Centrado en su posición (x: 0)
                animate={{ opacity: 1, x: 0 }}
                // Salida: Se va hacia la izquierda nuevamente
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

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Correo Electrónico"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@universidad.edu.co"
                        />
                        
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Contraseña
                                </label>
                                <Link to="/recovery" className="text-sm font-medium text-[#26667F] hover:text-[#1a4a5c] transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" variant="primary">
                            Iniciar Sesión
                        </Button>
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
                // Entrada: Viene desde la derecha (x: 50px) - dirección opuesta al formulario
                initial={{ opacity: 0, x: 50 }}
                // Estado final: Centrado en su posición (x: 0)
                animate={{ opacity: 1, x: 0 }}
                // Salida: Se va hacia la derecha nuevamente
                // Resultado: Efecto visual de "cortinas abriéndose"
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
