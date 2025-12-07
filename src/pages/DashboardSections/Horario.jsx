import React, { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { dataService } from '../../services/dataService';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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

export default function Horario() {
    const [schedule, setSchedule] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // ID de la clase que se está editando

    const [formData, setFormData] = useState({
        materiaId: '',
        newMateriaName: '', // Para crear materia al vuelo
        newMateriaColor: COOL_COLORS[0].value,
        dia: 'Lunes',
        horaInicio: '08:00',
        horaFin: '10:00',
        aula: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setSchedule(dataService.schedule.getAll());
        setSubjects(dataService.subjects.getAll());
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const openNewModal = () => {
        setEditingId(null);
        setFormData({
            materiaId: '',
            newMateriaName: '',
            newMateriaColor: COOL_COLORS[0].value,
            dia: 'Lunes',
            horaInicio: '08:00',
            horaFin: '10:00',
            aula: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (clase) => {
        setEditingId(clase.id);
        setFormData({
            materiaId: clase.materiaId,
            newMateriaName: '',
            newMateriaColor: COOL_COLORS[0].value,
            dia: clase.dia,
            horaInicio: clase.horaInicio,
            horaFin: clase.horaFin,
            aula: clase.aula || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta clase del horario?')) {
            dataService.schedule.delete(id);
            loadData();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let materiaId = formData.materiaId;

        // Si eligió crear nueva materia
        if (formData.materiaId === 'new') {
            if (!formData.newMateriaName.trim()) return;
            
            const newSubject = dataService.subjects.create({
                nombre: formData.newMateriaName,
                color: formData.newMateriaColor
            });
            materiaId = newSubject.id;
        }

        const data = {
            materiaId: Number(materiaId),
            dia: formData.dia,
            horaInicio: formData.horaInicio,
            horaFin: formData.horaFin,
            aula: formData.aula
        };

        if (editingId) {
            dataService.schedule.update(editingId, data);
        } else {
            dataService.schedule.create(data);
        }

        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ ...formData, materiaId: '', newMateriaName: '', aula: '', newMateriaColor: COOL_COLORS[0].value });
        loadData();
    };

    const getSubject = (id) => subjects.find(s => s.id === id);

    const getClassesForDay = (day) => {
        return schedule
            .filter(c => c.dia === day)
            .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Horario Semanal</h2>
                    <p className="text-gray-500">Organiza tus clases y tiempos de estudio.</p>
                </div>
                <Button onClick={openNewModal}>
                    + Agregar Clase
                </Button>
            </div>

            {/* Vista Calendario Semanal (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {DAYS.map(day => (
                    <Card key={day} className="flex flex-col h-full min-h-[200px]">
                        <div className="border-b border-gray-100 pb-3 mb-3">
                            <h3 className="font-bold text-gray-900">{day}</h3>
                        </div>
                        
                        <div className="space-y-3 flex-1">
                            {getClassesForDay(day).length === 0 ? (
                                <p className="text-sm text-gray-400 italic text-center py-4">Sin clases</p>
                            ) : (
                                getClassesForDay(day).map(clase => {
                                    const subject = getSubject(clase.materiaId);
                                    return (
                                        <div key={clase.id} className={`p-3 rounded-lg border border-transparent hover:shadow-sm transition-all group relative ${subject?.color || 'bg-gray-100'}`}>
                                            {/* Acciones flotantes (Hover) */}
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-sm rounded-lg p-1">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(clase); }}
                                                    className="p-1 hover:text-[#26667F] text-gray-600 rounded transition-colors"
                                                    title="Editar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(clase.id); }}
                                                    className="p-1 hover:text-red-500 text-gray-600 rounded transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-start mb-1 pr-6">
                                                <span className="font-bold text-sm truncate w-full">{subject?.nombre}</span>
                                            </div>
                                            <div className="text-xs opacity-80 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {clase.horaInicio} - {clase.horaFin}
                                            </div>
                                            {clase.aula && (
                                                <div className="text-xs opacity-80 mt-1 flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {clase.aula}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modal para Agregar/Editar Clase */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Editar Clase" : "Agregar Nueva Clase"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Materia</label>
                        <select
                            id="materiaId"
                            value={formData.materiaId}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-[#26667F] focus:border-transparent outline-none transition-all"
                            required
                        >
                            <option value="">Selecciona una materia</option>
                            {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.nombre}</option>
                            ))}
                            <option value="new">+ Crear Nueva Materia</option>
                        </select>
                    </div>

                    {formData.materiaId === 'new' && (
                        <>
                            <Input
                                label="Nombre de la Nueva Materia"
                                id="newMateriaName"
                                value={formData.newMateriaName}
                                onChange={handleInputChange}
                                placeholder="Ej. Cálculo Diferencial"
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color Identificativo</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {COOL_COLORS.map(color => (
                                        <button
                                            key={color.label}
                                            type="button"
                                            onClick={() => setFormData({...formData, newMateriaColor: color.value})}
                                            className={`h-10 rounded-lg border-2 transition-all ${color.value.split(' ')[0]} ${formData.newMateriaColor === color.value ? 'border-gray-600 scale-105 shadow-md' : 'border-transparent hover:scale-105'}`}
                                            title={color.label}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Día</label>
                            <select
                                id="dia"
                                value={formData.dia}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-[#26667F] focus:border-transparent outline-none transition-all"
                            >
                                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <Input
                            label="Aula / Salón"
                            id="aula"
                            value={formData.aula}
                            onChange={handleInputChange}
                            placeholder="Ej. 402"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Hora Inicio"
                            id="horaInicio"
                            type="time"
                            value={formData.horaInicio}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Hora Fin"
                            id="horaFin"
                            type="time"
                            value={formData.horaFin}
                            onChange={handleInputChange}
                            required
                        />
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
                            {editingId ? "Guardar Cambios" : "Guardar Clase"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
