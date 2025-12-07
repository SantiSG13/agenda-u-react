import React, { useState, useEffect } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import RichTextEditor from '../../components/UI/RichTextEditor';
import { dataService } from '../../services/dataService';

export default function Apuntes() {
    const [subjects, setSubjects] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Estado para nueva nota o edición
    const [editorContent, setEditorContent] = useState('');
    const [noteTitle, setNoteTitle] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const allSubjects = dataService.subjects.getAll();
        setSubjects(allSubjects);
        setNotes(dataService.notes.getAll());
        
        // Seleccionar la primera materia por defecto si no hay seleccionada
        if (!selectedSubjectId && allSubjects.length > 0) {
            setSelectedSubjectId(allSubjects[0].id);
        }
    };

    const handleSaveNote = () => {
        if (!noteTitle.trim() || !selectedSubjectId) return;

        if (selectedNote) {
            // Actualizar
            dataService.notes.update(selectedNote.id, {
                titulo: noteTitle,
                contenido: editorContent,
                fecha: new Date().toISOString() // Actualizar fecha
            });
        } else {
            // Crear
            dataService.notes.create({
                materiaId: selectedSubjectId,
                titulo: noteTitle,
                contenido: editorContent,
                fecha: new Date().toISOString()
            });
        }

        loadData();
        setIsEditing(false);
        setSelectedNote(null);
        setNoteTitle('');
        setEditorContent('');
    };

    const handleNewNote = () => {
        setSelectedNote(null);
        setNoteTitle('');
        setEditorContent('');
        setIsEditing(true);
    };

    const handleSelectNote = (note) => {
        setSelectedNote(note);
        setNoteTitle(note.titulo);
        setEditorContent(note.contenido);
        setIsEditing(true);
    };

    const handleDeleteNote = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este apunte?')) {
            dataService.notes.delete(id);
            loadData();
            if (selectedNote?.id === id) {
                setIsEditing(false);
                setSelectedNote(null);
            }
        }
    };

    const filteredNotes = notes.filter(n => n.materiaId === selectedSubjectId);

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apuntes</h2>
                <p className="text-gray-500">Tus cuadernos digitales organizados por materia.</p>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar de Materias y Lista de Notas */}
                <Card className="w-1/3 flex flex-col overflow-hidden">
                    {/* Selector de Materia */}
                    <div className="p-4 border-b border-gray-100">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Materia</label>
                        <select
                            value={selectedSubjectId || ''}
                            onChange={(e) => {
                                setSelectedSubjectId(Number(e.target.value));
                                setIsEditing(false);
                            }}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#26667F] outline-none"
                        >
                            {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Lista de Notas */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        <Button 
                            variant="outline" 
                            className="w-full mb-2 border-dashed"
                            onClick={handleNewNote}
                        >
                            + Nuevo Apunte
                        </Button>

                        {filteredNotes.length === 0 ? (
                            <p className="text-center text-sm text-gray-400 py-4">No hay apuntes en esta materia.</p>
                        ) : (
                            filteredNotes.map(note => (
                                <div 
                                    key={note.id}
                                    onClick={() => handleSelectNote(note)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedNote?.id === note.id ? 'bg-[#26667F] text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}
                                >
                                    <h4 className="font-bold text-sm truncate">{note.titulo}</h4>
                                    <p className={`text-xs truncate ${selectedNote?.id === note.id ? 'text-blue-100' : 'text-gray-400'}`}>
                                        {new Date(note.fecha).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Área de Edición */}
                <Card className="flex-1 flex flex-col overflow-hidden p-6">
                    {isEditing ? (
                        <>
                            <div className="mb-4 flex gap-4">
                                <input
                                    type="text"
                                    value={noteTitle}
                                    onChange={(e) => setNoteTitle(e.target.value)}
                                    placeholder="Título del Apunte"
                                    className="flex-1 text-xl font-bold text-gray-900 placeholder-gray-300 outline-none border-b border-transparent focus:border-gray-200 transition-colors"
                                />
                                <div className="flex gap-2">
                                    {selectedNote && (
                                        <button 
                                            onClick={() => handleDeleteNote(selectedNote.id)}
                                            className="text-red-400 hover:text-red-600 px-3"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                    <Button onClick={handleSaveNote}>
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <RichTextEditor 
                                    value={editorContent} 
                                    onChange={setEditorContent} 
                                />
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <p>Selecciona un apunte para ver o crea uno nuevo.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}