import React, { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { dataService } from '../../services/dataService';

export default function Calificaciones() {
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
    const [editingGradeId, setEditingGradeId] = useState(null);
    
    // Formulario para nueva nota
    const [gradeForm, setGradeForm] = useState({
        nombre: '',
        porcentaje: '',
        nota: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setSubjects(dataService.subjects.getAll());
        setGrades(dataService.grades.getAll());
    };

    const handleGradeSubmit = (e) => {
        e.preventDefault();
        if (!selectedSubject) return;

        const data = {
            materiaId: selectedSubject.id,
            nombre: gradeForm.nombre,
            porcentaje: Number(gradeForm.porcentaje),
            nota: Number(gradeForm.nota)
        };

        if (editingGradeId) {
            dataService.grades.update(editingGradeId, data);
        } else {
            dataService.grades.create(data);
        }

        setIsGradeModalOpen(false);
        setEditingGradeId(null);
        setGradeForm({ nombre: '', porcentaje: '', nota: '' });
        loadData();
    };

    const handleEditGrade = (grade) => {
        // Encontrar la materia correspondiente para setearla como seleccionada y abrir el modal
        // Aunque generalmente ya debería estar seleccionada si estamos viendo la lista
        const subject = subjects.find(s => s.id === grade.materiaId);
        if (subject) setSelectedSubject(subject);

        setEditingGradeId(grade.id);
        setGradeForm({
            nombre: grade.nombre,
            porcentaje: grade.porcentaje,
            nota: grade.nota
        });
        setIsGradeModalOpen(true);
    };

    const handleDeleteGrade = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta calificación?')) {
            dataService.grades.delete(id);
            loadData();
        }
    };

    const openNewGradeModal = (subject) => {
        setSelectedSubject(subject);
        setEditingGradeId(null);
        setGradeForm({ nombre: '', porcentaje: '', nota: '' });
        setIsGradeModalOpen(true);
    };

    // Cálculos
    const calculateSubjectStats = (subjectId) => {
        const subjectGrades = grades.filter(g => g.materiaId === subjectId);
        
        const totalPercentage = subjectGrades.reduce((acc, curr) => acc + curr.porcentaje, 0);
        const currentAverage = subjectGrades.reduce((acc, curr) => acc + (curr.nota * (curr.porcentaje / 100)), 0);
        
        // Proyección: Cuánto necesito en el porcentaje restante para sacar 3.0
        const remainingPercentage = 100 - totalPercentage;
        let needed = 0;
        
        if (remainingPercentage > 0) {
            const currentPoints = currentAverage; // Puntos acumulados hasta ahora (ej: 1.5)
            const targetPoints = 3.0;
            const pointsNeeded = targetPoints - currentPoints;
            
            // Si ya tiene más de 3.0, needed será negativo (ya pasó)
            // Fórmula: (PuntosFaltantes / PorcentajeRestante) * 100
            needed = (pointsNeeded / remainingPercentage) * 100;
        }

        return {
            grades: subjectGrades,
            totalPercentage,
            currentAverage: currentAverage.toFixed(1), // Nota acumulada real (ej: si lleva 5.0 en el 50%, su acumulado es 2.5)
            projectedAverage: totalPercentage > 0 ? (currentAverage / (totalPercentage/100)).toFixed(1) : '0.0', // Promedio sobre lo evaluado
            remainingPercentage,
            neededToPass: needed
        };
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Calificaciones</h2>
                <p className="text-gray-500">Monitorea tu rendimiento académico.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.length === 0 ? (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No tienes materias registradas aún.</p>
                        <p className="text-sm text-gray-400">Ve a la sección de Horario para crear tus materias.</p>
                    </div>
                ) : (
                    subjects.map(subject => {
                        const stats = calculateSubjectStats(subject.id);
                        const isPassing = Number(stats.projectedAverage) >= 3.0;

                        return (
                            <Card key={subject.id} className="flex flex-col h-full">
                                <div className={`h-2 w-full rounded-t-xl ${subject.color}`}></div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{subject.nombre}</h3>
                                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${isPassing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {stats.projectedAverage}
                                        </div>
                                    </div>

                                    {/* Barra de Progreso de Notas */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Progreso Evaluado: {stats.totalPercentage}%</span>
                                            <span>Meta: 3.0</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                            <div 
                                                className={`h-2.5 rounded-full ${isPassing ? 'bg-[#67C090]' : 'bg-orange-400'}`} 
                                                style={{ width: `${stats.totalPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Lista de Notas */}
                                    <div className="space-y-2 mb-4 flex-1">
                                        {stats.grades.map(grade => (
                                            <div key={grade.id} className="flex items-center justify-between text-sm border-b border-gray-50 pb-1 group hover:bg-gray-50 rounded px-1 transition-colors">
                                                <div className="flex-1">
                                                    <span className="text-gray-600 block">{grade.nombre} <span className="text-xs text-gray-400">({grade.porcentaje}%)</span></span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold text-gray-900">{grade.nota}</span>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleEditGrade(grade)}
                                                            className="text-gray-400 hover:text-[#26667F] transition-colors"
                                                            title="Editar"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteGrade(grade.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Eliminar"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {stats.grades.length === 0 && <p className="text-xs text-gray-400 italic">Sin notas registradas</p>}
                                    </div>

                                    {/* Proyección */}
                                    {stats.remainingPercentage > 0 && (
                                        <div className="mt-auto bg-blue-50 p-3 rounded-lg text-xs text-blue-800 mb-4">
                                            {stats.neededToPass <= 0 
                                                ? "¡Felicidades! Ya has aprobado la materia teóricamente."
                                                : `Necesitas promediar ${stats.neededToPass.toFixed(1)} en el ${stats.remainingPercentage}% restante para pasar.`
                                            }
                                        </div>
                                    )}

                                    <Button 
                                        variant="outline" 
                                        className="w-full text-sm py-2"
                                        onClick={() => openNewGradeModal(subject)}
                                    >
                                        + Agregar Nota
                                    </Button>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            <Modal
                isOpen={isGradeModalOpen}
                onClose={() => setIsGradeModalOpen(false)}
                title={editingGradeId ? `Editar Nota de ${selectedSubject?.nombre}` : `Nueva Nota para ${selectedSubject?.nombre}`}
            >
                <form onSubmit={handleGradeSubmit} className="space-y-4">
                    <Input
                        label="Concepto / Nombre"
                        id="nombreNota"
                        value={gradeForm.nombre}
                        onChange={(e) => setGradeForm({...gradeForm, nombre: e.target.value})}
                        placeholder="Ej. Parcial 1"
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Porcentaje (%)"
                            id="porcentaje"
                            type="number"
                            min="1"
                            max="100"
                            value={gradeForm.porcentaje}
                            onChange={(e) => setGradeForm({...gradeForm, porcentaje: e.target.value})}
                            placeholder="20"
                            required
                        />
                        <Input
                            label="Nota (0.0 - 5.0)"
                            id="nota"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={gradeForm.nota}
                            onChange={(e) => setGradeForm({...gradeForm, nota: e.target.value})}
                            placeholder="4.5"
                            required
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsGradeModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <Button type="submit">
                            {editingGradeId ? "Guardar Cambios" : "Guardar Nota"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}