import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className="min-h-screen bg-linear-to-br from-white to-green-50">
            <div className="container mx-auto px-6 pt-6 pb-0.5 max-w-4xl">
                {/* Header */}
                <header className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <img src="../../public/Logo.png" alt="logo" className='w-20 h-20 rounded-4xl flex items-center justify-center shadow-lg'/>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Agenda U
                    </h1>
                    <p className="text-xl text-gray-600">
                        Tu organizador para la vida universitaria
                    </p>
                </header>

                {/* Main Content */}
                <main className="p-4 md:p-1">
                    <section className="mb-10">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                            Funciones
                        </h2>
                        <section className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
                            <div className="flex flex-col items-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
                                    alt="Horario" 
                                    className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Organiza tu horario</h3>
                                <p className="text-gray-600 text-center">
                                    Planifica tus clases, eventos y actividades en un calendario visual y fácil de usar.
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
                                    alt="Apuntes" 
                                    className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Administra tus apuntes</h3>
                                <p className="text-gray-600 text-center">
                                    Guarda, organiza y accede a tus notas de clase desde cualquier lugar.
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
                                    alt="Calificaciones" 
                                    className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Digitaliza tus calificaciones</h3>
                                <p className="text-gray-600 text-center">
                                    Registra y visualiza tus notas para llevar un seguimiento de tu rendimiento académico.
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
                                    alt="Tareas y metas" 
                                    className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Asigna tareas y metas</h3>
                                <p className="text-gray-600 text-center">
                                    Crea listas de tareas, establece metas y cumple tus objetivos académicos.
                                </p>
                            </div>


                        </section>
                    </section>

                    <div className="text-center pt-6">
                        <Link 
                            to="/login"
                            className="inline-block bg-linear-to-bl  from-[#67C090] to-[#26667F] text-white font-semibold px-8 py-3 rounded-xl shadow-md 
                            transition-transform duration-500 ease-in-out 
                            hover:scale-105 hover:shadow-lg hover:bg-linear-to-br hover:from-[#67C090] hover:to-[#26667F]"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center mt-12 text-gray-600">
                    <p className="text-sm">Organiza tu vida universitaria de forma simple</p>
                </footer>
            </div>
        </div>
    )
}