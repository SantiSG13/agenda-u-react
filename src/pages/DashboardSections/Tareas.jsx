import React, { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { dataService } from '../../services/dataService';

const PRIORITIES = {
    HIGH: { label: 'Alta', color: 'bg-red-100 text-red-800', value: 'high' },
    MEDIUM: { label: 'Media', color: 'bg-orange-100 text-orange-800', value: 'medium' },
    LOW: { label: 'Baja', color: 'bg-green-100 text-green-800', value: 'low' }
};

export default function Tareas() {
    const [tasks, setTasks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [filter, setFilter] = useState('all'); // all, pending, completed

    const [formData, setFormData] = useState({
        titulo: '',
        materiaId: '',
        fechaVencimiento: '',
        prioridad: 'medium'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setTasks(dataService.tasks.getAll());
        setSubjects(dataService.subjects.getAll());
    };

    const handleEditTask = (task) => {
        setEditingTaskId(task.id);
        setFormData({
            titulo: task.titulo,
            materiaId: task.materiaId,
            fechaVencimiento: task.fechaVencimiento,
            prioridad: task.prioridad
        });
        setIsModalOpen(true);
    };

    const openNewTaskModal = () => {
        setEditingTaskId(null);
        setFormData({ titulo: '', materiaId: '', fechaVencimiento: '', prioridad: 'medium' });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            titulo: formData.titulo,
            materiaId: Number(formData.materiaId),
            fechaVencimiento: formData.fechaVencimiento,
            prioridad: formData.prioridad,
            completada: false // Si se edita, mantenemos el estado o reseteamos? Generalmente edit solo cambia datos
        };

        if (editingTaskId) {
            // Preservar estado 'completada' al editar
            const existingTask = tasks.find(t => t.id === editingTaskId);
            dataService.tasks.update(editingTaskId, { ...data, completada: existingTask.completada });
        } else {
            dataService.tasks.create(data);
        }

        setIsModalOpen(false);
        setEditingTaskId(null);
        setFormData({ titulo: '', materiaId: '', fechaVencimiento: '', prioridad: 'medium' });
        loadData();
    };

    const toggleTask = (task) => {
        dataService.tasks.update(task.id, { completada: !task.completada });
        loadData();
    };

    const deleteTask = (id) => {
        if (window.confirm('¿Eliminar tarea?')) {
            dataService.tasks.delete(id);
            loadData();
        }
    };

    const getSubjectName = (id) => subjects.find(s => s.id === id)?.nombre || 'General';

    const filteredTasks = tasks.filter(t => {
        if (filter === 'pending') return !t.completada;
        if (filter === 'completed') return t.completada;
        return true;
    }).sort((a, b) => {
        // Ordenar: Pendientes primero, luego por fecha
        if (a.completada !== b.completada) return a.completada ? 1 : -1;
        return new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento);
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tareas</h2>
                    <p className="text-gray-500">Gestiona tus entregas y pendientes.</p>
                </div>
                <Button onClick={openNewTaskModal}>
                    + Nueva Tarea
                </Button>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 border-b border-gray-200 pb-1">
                <button 
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${filter === 'all' ? 'bg-white border-b-2 border-[#26667F] text-[#26667F]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Todas
                </button>
                <button 
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${filter === 'pending' ? 'bg-white border-b-2 border-[#26667F] text-[#26667F]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Pendientes
                </button>
                <button 
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${filter === 'completed' ? 'bg-white border-b-2 border-[#26667F] text-[#26667F]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Completadas
                </button>
            </div>

            {/* Lista de Tareas */}
            <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No hay tareas en esta vista.</p>
                    </div>
                ) : (
                    filteredTasks.map(task => {
                        const priority = Object.values(PRIORITIES).find(p => p.value === task.prioridad);
                        const isOverdue = !task.completada && new Date(task.fechaVencimiento) < new Date().setHours(0,0,0,0);

                        return (
                            <Card key={task.id} className={`p-4 flex items-center gap-4 transition-all ${task.completada ? 'opacity-60 bg-gray-50' : 'hover:shadow-md'}`}>
                                <button 
                                    onClick={() => toggleTask(task)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completada ? 'bg-[#67C090] border-[#67C090]' : 'border-gray-300 hover:border-[#67C090]'}`}
                                >
                                    {task.completada && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className={`font-bold text-gray-900 ${task.completada ? 'line-through text-gray-500' : ''}`}>
                                            {task.titulo}
                                        </h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${priority.color}`}>
                                            {priority.label}
                                        </span>
                                        {isOverdue && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-red-50 text-red-600">
                                                Vencida
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            {getSubjectName(task.materiaId)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(task.fechaVencimiento).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => handleEditTask(task)}
                                        className="text-gray-300 hover:text-[#26667F] transition-colors p-2"
                                        title="Editar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => deleteTask(task.id)}
                                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                        title="Eliminar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingTaskId ? "Editar Tarea" : "Nueva Tarea"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Título de la Tarea"
                        id="titulo"
                        value={formData.titulo}
                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                        placeholder="Ej. Leer capítulo 4"
                        required
                    />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Materia</label>
                        <select
                            value={formData.materiaId}
                            onChange={(e) => setFormData({...formData, materiaId: e.target.value})}
                            className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-[#26667F] outline-none"
                            required
                        >
                            <option value="">Selecciona una materia</option>
                            {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Fecha de Vencimiento"
                            id="fechaVencimiento"
                            type="date"
                            value={formData.fechaVencimiento}
                            onChange={(e) => setFormData({...formData, fechaVencimiento: e.target.value})}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                            <select
                                value={formData.prioridad}
                                onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
                                className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-[#26667F] outline-none"
                            >
                                <option value="low">Baja</option>
                                <option value="medium">Media</option>
                                <option value="high">Alta</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <Button type="submit">
                            {editingTaskId ? "Guardar Cambios" : "Guardar Tarea"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
