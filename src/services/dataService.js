import { authService } from './authService';

const KEYS = {
    SUBJECTS: 'agenda_subjects',
    SCHEDULE: 'agenda_schedule',
    GRADES: 'agenda_grades',
    NOTES: 'agenda_notes',
    TASKS: 'agenda_tasks'
};

const getUserId = () => {
    const user = authService.getCurrentUser();
    return user ? user.id : null;
};

const getData = (key) => {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    const userId = getUserId();
    if (!userId) return [];
    return data.filter(item => item.userId === userId);
};

const saveData = (key, newData) => {
    const allData = JSON.parse(localStorage.getItem(key) || '[]');
    const userId = getUserId();
    
    // Filtrar los datos que NO son del usuario actual para preservarlos
    const otherUsersData = allData.filter(item => item.userId !== userId);
    
    // Combinar con los nuevos datos del usuario actual
    const updatedData = [...otherUsersData, ...newData];
    
    localStorage.setItem(key, JSON.stringify(updatedData));
};

// Helper genérico para CRUD
const createCRUD = (key) => ({
    getAll: () => getData(key),
    
    getById: (id) => getData(key).find(item => item.id === id),
    
    create: (item) => {
        const userId = getUserId();
        if (!userId) throw new Error('Usuario no autenticado');
        
        const currentData = getData(key);
        const newItem = { ...item, id: Date.now(), userId };
        const newData = [...currentData, newItem];
        saveData(key, newData);
        return newItem;
    },
    
    update: (id, updates) => {
        const currentData = getData(key);
        const index = currentData.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Elemento no encontrado');
        
        const updatedItem = { ...currentData[index], ...updates };
        currentData[index] = updatedItem;
        saveData(key, currentData);
        return updatedItem;
    },
    
    delete: (id) => {
        const currentData = getData(key);
        const newData = currentData.filter(item => item.id !== id);
        saveData(key, newData);
    }
});

export const dataService = {
    subjects: createCRUD(KEYS.SUBJECTS),
    schedule: createCRUD(KEYS.SCHEDULE),
    grades: createCRUD(KEYS.GRADES),
    notes: createCRUD(KEYS.NOTES),
    tasks: createCRUD(KEYS.TASKS),
    
    // Métodos específicos adicionales si son necesarios
    
    // Obtener todo lo relacionado a una materia
    getSubjectDetails: (subjectId) => {
        return {
            subject: dataService.subjects.getById(subjectId),
            schedule: dataService.schedule.getAll().filter(s => s.materiaId === subjectId),
            grades: dataService.grades.getAll().filter(g => g.materiaId === subjectId),
            notes: dataService.notes.getAll().filter(n => n.materiaId === subjectId),
            tasks: dataService.tasks.getAll().filter(t => t.materiaId === subjectId)
        };
    }
};
