import React, { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { dataService } from '../../services/dataService';

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

export default function Materias() {
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        profesor: '',
        creditos: '',
        color: COOL_COLORS[0].value
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setSubjects(dataService.subjects.getAll());
    };

    const handleEdit = (subject) => {
        setEditingId(subject.id);
        setFormData({
            nombre: subject.nombre,
            profesor: subject.profesor || '',
            creditos: subject.creditos || '',
            color: subject.color || COOL_COLORS[0].value
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta materia? Se perderán todos los datos asociados (horarios, notas, tareas).')) {
            dataService.subjects.delete(id);
            loadData();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            nombre: formData.nombre,
            profesor: formData.profesor,
            creditos: formData.creditos,
            color: formData.color
        };

        if (editingId) {
            dataService.subjects.update(editingId, data);
        } else {
            dataService.subjects.create(data);
        }

        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ nombre: '', profesor: '', creditos: '', color: COOL_COLORS[0].value });
        loadData();
    };

    const openNewModal = () => {
        setEditingId(null);
        setFormData({ nombre: '', profesor: '', creditos: '', color: COOL_COLORS[0].value });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Administrar Materias</h2>
                    <p className="text-gray-500">Gestiona tus asignaturas, profesores y créditos.</p>
                </div>
                <Button onClick={openNewModal}>
                    + Nueva Materia
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No tienes materias registradas.</p>
                        <button onClick={openNewModal} className="text-[#26667F] font-bold mt-2 hover:underline">
                            Crear mi primera materia
                        </button>
                    </div>
                ) : (
                    subjects.map(subject => (
                        <Card key={subject.id} className={`p-6 relative group hover:shadow-lg transition-all border-t-4 ${subject.color?.replace('bg-', 'border-') || 'border-gray-300'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${subject.color || 'bg-gray-100 text-gray-600'}`}>
                                    {subject.nombre.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleEdit(subject)}
                                        className="p-2 text-gray-400 hover:text-[#26667F] hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(subject.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{subject.nombre}</h3>
                            
                            <div className="space-y-2 mt-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{subject.profesor || 'Sin profesor asignado'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span>{subject.creditos ? `${subject.creditos} Créditos` : 'Créditos no definidos'}</span>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Editar Materia" : "Nueva Materia"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nombre de la Materia"
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        placeholder="Ej. Cálculo Integral"
                        required
                    />
                    <Input
                        label="Profesor (Opcional)"
                        id="profesor"
                        value={formData.profesor}
                        onChange={(e) => setFormData({...formData, profesor: e.target.value})}
                        placeholder="Ej. Dr. Smith"
                    />
                    <Input
                        label="Créditos Académicos"
                        id="creditos"
                        type="number"
                        min="0"
                        value={formData.creditos}
                        onChange={(e) => setFormData({...formData, creditos: e.target.value})}
                        placeholder="Ej. 3"
                    />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color Identificativo</label>
                        <div className="grid grid-cols-4 gap-2">
                            {COOL_COLORS.map(color => (
                                <button
                                    key={color.label}
                                    type="button"
                                    onClick={() => setFormData({...formData, color: color.value})}
                                    className={`h-10 rounded-lg border-2 transition-all ${color.value.split(' ')[0]} ${formData.color === color.value ? 'border-gray-600 scale-105 shadow-md' : 'border-transparent hover:scale-105'}`}
                                    title={color.label}
                                />
                            ))}
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
                            {editingId ? "Guardar Cambios" : "Crear Materia"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
