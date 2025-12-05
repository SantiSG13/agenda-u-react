import React from 'react';
import Sidebar from '../components/UI/Sidebar';
import StatCard from '../components/UI/StatCard';
import Card from '../components/UI/Card';

export default function Dashboard() {
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
                   <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header de Bienvenida */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Hola, Santiago 👋</h1>
                            <p className="text-gray-500 mt-1">Aquí tienes un resumen de tu semestre.</p>
                        </div>

                        {/* Grid de Métricas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                title="Promedio General" 
                                value="4.5" 
                                trend="up" 
                                trendValue="0.2"
                                color="green"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                }
                            />
                            <StatCard 
                                title="Tareas Pendientes" 
                                value="3" 
                                color="teal"
                                icon={
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                }
                            />
                            <StatCard 
                                title="Próxima Clase" 
                                value="Semiótica" 
                                color="blue"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                            />
                             <StatCard 
                                title="Créditos Aprobados" 
                                value="85%" 
                                color="purple"
                                icon={
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Sección Principal (2 col) */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Próximas Clases */}
                                <section>
                                     <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-900">Horario de Hoy</h2>
                                        <button className="text-sm font-medium text-[#26667F] hover:text-[#67C090] transition-colors">Ver Horario Completo</button>
                                    </div>
                                    <div className="space-y-4">
                                         {/* Item de Horario (Ejemplo) */}
                                         <Card className="flex items-center justify-between p-5 hover:border-[#67C090]/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                 <div className="w-16 text-center">
                                                    <div className="text-lg font-bold text-gray-900">08:00</div>
                                                    <div className="text-xs text-gray-500 uppercase">AM</div>
                                                 </div>
                                                 <div className="w-1 h-10 bg-gray-200 rounded-full group-hover:bg-[#67C090] transition-colors"></div>
                                                 <div>
                                                     <h3 className="font-bold text-gray-900">Semiótica y Comunicación</h3>
                                                     <p className="text-sm text-gray-500">Salón 402 • Edificio B</p>
                                                 </div>
                                            </div>
                                            <div className="hidden sm:block">
                                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    En Curso
                                                 </span>
                                            </div>
                                         </Card>

                                         <Card className="flex items-center justify-between p-5 hover:border-blue-200 transition-colors cursor-pointer opacity-75 hover:opacity-100">
                                            <div className="flex items-center gap-4">
                                                 <div className="w-16 text-center">
                                                    <div className="text-lg font-bold text-gray-900">10:00</div>
                                                    <div className="text-xs text-gray-500 uppercase">AM</div>
                                                 </div>
                                                 <div className="w-1 h-10 bg-gray-200 rounded-full"></div>
                                                 <div>
                                                     <h3 className="font-bold text-gray-900">Ingeniería de Software II</h3>
                                                     <p className="text-sm text-gray-500">Laboratorio 3 • Edificio C</p>
                                                 </div>
                                            </div>
                                         </Card>
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar Derecho (1 col) */}
                            <div className="space-y-8">
                                 {/* Tareas Urgentes */}
                                 <section>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Tareas Prioritarias</h2>
                                    <Card className="p-0 overflow-hidden">
                                         <div className="divide-y divide-gray-100">
                                             <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                                 <div className="flex items-start gap-3">
                                                     <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                                                     <div>
                                                        <h4 className="font-semibold text-gray-900 text-sm">Ensayo Final</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Semiótica • Vence Mañana</p>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                                 <div className="flex items-start gap-3">
                                                     <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
                                                     <div>
                                                        <h4 className="font-semibold text-gray-900 text-sm">Diagrama de Clases</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Ing. Software • Vence en 3 días</p>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                                             <button className="text-xs font-bold text-[#26667F] hover:text-[#67C090] transition-colors uppercase tracking-wider">
                                                 Ver todas las tareas
                                             </button>
                                         </div>
                                    </Card>
                                 </section>
                            </div>
                        </div>
                   </div>
                </main>
            </div>
        </div>
    );
}
