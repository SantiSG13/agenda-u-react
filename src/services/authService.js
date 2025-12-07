
const USERS_KEY = 'agenda_users';
const CURRENT_USER_KEY = 'currentUser';

export const authService = {
  // Registrar un nuevo usuario
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado.');
    }

    // Rol de Administrador si el correo es admin@agendau.com
    const role = userData.email === 'admin@agendau.com' ? 'admin' : 'user';

    // Agregar nuevo usuario
    const newUser = { ...userData, role, id: Date.now() };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return newUser;
  },

  // Iniciar sesión
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciales inválidas.');
    }

    // Guardar sesión actual (sin la contraseña por seguridad básica)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  },

  // Verificar si hay sesión activa
  isAuthenticated: () => {
    return !!localStorage.getItem(CURRENT_USER_KEY);
  },

  // ADMIN: Obtener todos los usuarios
  getAllUsers: () => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return users.map(({ password, ...u }) => u); // Retornar sin contraseña
  },

  // ADMIN: Eliminar usuario
  deleteUser: (id) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const newUsers = users.filter(u => u.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
  }
};
