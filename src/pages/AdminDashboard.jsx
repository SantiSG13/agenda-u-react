import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { dataService } from '../services/dataService';
import Card from '../components/UI/Card';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, totalSubjects: 0, totalTasks: 0 });
    const [users, setUsers] = useState([]);
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setStats(dataService.getSystemStats());
        setUsers(authService.getAllUsers());
    };

    const handleDeleteUser = (userId) => {
        if (userId === currentUser.id) {
            alert("No puedes eliminar tu propia cuenta de administrador.");
            return;
        }

        if (window.confirm("ADVERTENCIA: ¿Estás seguro de que quieres eliminar este usuario permanentemente? Esta acción borrará todos sus datos.")) {
            authService.deleteUser(userId);
            loadData(); // Recargar lista y estadísticas
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900">Panel de Administración</h2>
                <p className="text-gray-500">Gestión global del sistema Agenda U.</p>
            </div>

            {/* Estadísticas Globales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <h3 className="text-blue-800 text-sm font-semibold uppercase">Usuarios Totales</h3>
                    <p className="text-4xl font-bold text-blue-900 mt-2">{stats.totalUsers}</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <h3 className="text-purple-800 text-sm font-semibold uppercase">Materias Creadas</h3>
                    <p className="text-4xl font-bold text-purple-900 mt-2">{stats.totalSubjects}</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                    <h3 className="text-teal-800 text-sm font-semibold uppercase">Tareas en Sistema</h3>
                    <p className="text-4xl font-bold text-teal-900 mt-2">{stats.totalTasks}</p>
                </Card>
            </div>

            {/* Gestión de Usuarios */}
            <Card className="p-6 overflow-hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Usuarios Registrados</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                                <th className="py-3 px-2">Usuario</th>
                                <th className="py-3 px-2">Correo</th>
                                <th className="py-3 px-2">Rol</th>
                                <th className="py-3 px-2 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-2 font-medium text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                                            {u.nombre?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        {u.nombre || 'Sin nombre'}
                                    </td>
                                    <td className="py-3 px-2 text-gray-600">{u.email}</td>
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                                            {u.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        {u.id !== currentUser.id && (
                                            <button 
                                                onClick={() => handleDeleteUser(u.id)}
                                                className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
