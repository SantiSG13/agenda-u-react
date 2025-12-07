import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/UI/StatCard';
import Card from '../../components/UI/Card';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { dataService } from '../../services/dataService';
import { authService } from '../../services/authService';

const COOL_COLORS = [
    { label: 'Azul', value: 'bg-blue-100 text-blue-800' },
    { label: 'Cian', value: 'bg-cyan-100 text-cyan-800' },
    { label: 'Teal', value: 'bg-teal-100 text-teal-800' },
    { label: 'Índigo', value: 'bg-indigo-100 text-indigo-800' },
    { label: 'Slate', value: 'bg-slate-100 text-slate-800' },
    { label: 'Esmeralda', value: 'bg-emerald-100 text-emerald-800' },
    { label: 'Violeta', value: 'bg-violet-100 text-violet-800' },
    { label: 'Cielo', value: 'bg-sky-100 text-sky-800' }
];

export default function Resumen() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        promedio: '0.0',
        tareasPendientes: 0,
        proximaClase: 'Ninguna',
        creditos: 0
    });
    const [todayClasses, setTodayClasses] = useState([]);
    const [priorityTasks, setPriorityTasks] = useState([]);
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
    
    // Formulario Materia
    const [subjectForm, setSubjectForm] = useState({
        nombre: '',
        profesor: '',
        creditos: '',
        color: COOL_COLORS[0].value
    });

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) setUser(currentUser);
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        const subjects = dataService.subjects.getAll();
        const grades = dataService.grades.getAll();
        const tasks = dataService.tasks.getAll();
        const schedule = dataService.schedule.getAll();

        // 1. Calcular Promedio General
        let totalWeightedGrades = 0;
        let totalCreditsEvaluated = 0; // Simplificación: usaremos créditos como peso si existen, sino 1
        
        // Calcular promedio por materia primero
        const subjectAverages = subjects.map(sub => {
            const subGrades = grades.filter(g => g.materiaId === sub.id);
            if (subGrades.length === 0) return null;
            
            const totalPct = subGrades.reduce((acc, g) => acc + g.porcentaje, 0);
            const weightedSum = subGrades.reduce((acc, g) => acc + (g.nota * (g.porcentaje / 100)), 0);
            
            // Proyectar a 100% para el promedio general actual
            const projectedAvg = totalPct > 0 ? (weightedSum / (totalPct/100)) : 0;
            return { id: sub.id, avg: projectedAvg, credits: Number(sub.creditos) || 1 };
        }).filter(Boolean);

        if (subjectAverages.length > 0) {
            const sumAvg = subjectAverages.reduce((acc, curr) => acc + curr.avg, 0);
            const generalAvg = sumAvg / subjectAverages.length;
            setStats(prev => ({ ...prev, promedio: generalAvg.toFixed(1) }));
        }

        // 2. Tareas Pendientes
        const pending = tasks.filter(t => !t.completada).length;
        setStats(prev => ({ ...prev, tareasPendientes: pending }));

        // 3. Créditos Aprobados (Proyectados)
        const approvedCredits = subjectAverages
            .filter(s => s.avg >= 3.0)
            .reduce((acc, s) => acc + s.credits, 0);
        setStats(prev => ({ ...prev, creditos: approvedCredits }));

        // 4. Próxima Clase y Clases de Hoy
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const todayName = days[new Date().getDay()];
        
        const todaySchedule = schedule
            .filter(c => c.dia === todayName)
            .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
            
        setTodayClasses(todaySchedule.map(c => ({
            ...c,
            subject: subjects.find(s => s.id === c.materiaId)
        })));

        // Encontrar la próxima clase inmediata
        const now = new Date();
        const currentHour = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const nextClass = todaySchedule.find(c => c.horaInicio > currentHour);
        if (nextClass) {
            const subName = subjects.find(s => s.id === nextClass.materiaId)?.nombre;
            setStats(prev => ({ ...prev, proximaClase: subName || 'Desconocida' }));
        } else if (todaySchedule.length > 0) {
            setStats(prev => ({ ...prev, proximaClase: 'Terminadas por hoy' }));
        } else {
            setStats(prev => ({ ...prev, proximaClase: 'Sin clases hoy' }));
        }

        // 5. Tareas Prioritarias
        const prioTasks = tasks
            .filter(t => !t.completada && (t.prioridad === 'high' || t.prioridad === 'medium'))
            .sort((a, b) => new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento))
            .slice(0, 5); // Top 5
            
        setPriorityTasks(prioTasks.map(t => ({
            ...t,
            subject: subjects.find(s => s.id === t.materiaId)
        })));
    };

    const handleSubjectSubmit = (e) => {
        e.preventDefault();
        dataService.subjects.create({
            nombre: subjectForm.nombre,
            profesor: subjectForm.profesor,
            creditos: subjectForm.creditos,
            color: subjectForm.color
        });
        setIsSubjectModalOpen(false);
        setSubjectForm({ nombre: '', profesor: '', creditos: '', color: COOL_COLORS[0].value });
        loadDashboardData(); // Recargar para actualizar contadores si fuera necesario
    };

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-8 relative pb-20">
            {/* Header de Bienvenida */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Hola, {user.nombre} 👋</h1>
                <p className="text-gray-500 mt-1">Aquí tienes un resumen de tu semestre.</p>
            </div>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Promedio General" 
                    value={stats.promedio} 
                    color="green"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
                <StatCard 
                    title="Tareas Pendientes" 
                    value={stats.tareasPendientes} 
                    color="teal"
                    icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                />
                <StatCard 
                    title="Próxima Clase" 
                    value={stats.proximaClase} 
                    color="blue"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                    <StatCard 
                    title="Créditos Aprobados" 
                    value={stats.creditos} 
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
                            <Link to="/dashboard/schedule" className="text-sm font-medium text-[#26667F] hover:text-[#67C090] transition-colors">Ver Horario Completo</Link>
                        </div>
                        <div className="space-y-4">
                            {todayClasses.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="text-gray-400">No tienes clases programadas para hoy.</p>
                                </div>
                            ) : (
                                todayClasses.map(clase => (
                                    <Card key={clase.id} className={`flex items-center justify-between p-5 hover:shadow-md transition-all cursor-pointer border-l-4 ${clase.subject?.color?.replace('bg-', 'border-') || 'border-gray-300'}`}>
                                        <div className="flex items-center gap-4">
                                                <div className="w-16 text-center">
                                                <div className="text-lg font-bold text-gray-900">{clase.horaInicio}</div>
                                                <div className="text-xs text-gray-500 uppercase">Inicio</div>
                                                </div>
                                                <div className="w-px h-10 bg-gray-200"></div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{clase.subject?.nombre}</h3>
                                                    <p className="text-sm text-gray-500">{clase.aula ? `Salón ${clase.aula}` : 'Sin aula asignada'}</p>
                                                </div>
                                        </div>
                                    </Card>
                                ))
                            )}
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
                                    {priorityTasks.length === 0 ? (
                                        <div className="p-6 text-center">
                                            <p className="text-gray-400 text-sm">¡Estás al día! No hay tareas urgentes.</p>
                                        </div>
                                    ) : (
                                        priorityTasks.map(task => (
                                            <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${task.prioridad === 'high' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                                                    <div>
                                                    <h4 className="font-semibold text-gray-900 text-sm">{task.titulo}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{task.subject?.nombre} • {new Date(task.fechaVencimiento).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                                    <Link to="/dashboard/tasks" className="text-xs font-bold text-[#26667F] hover:text-[#67C090] transition-colors uppercase tracking-wider">
                                        Ver todas las tareas
                                    </Link>
                                </div>
                        </Card>
                        </section>
                </div>
            </div>
        </div>
    );
}
