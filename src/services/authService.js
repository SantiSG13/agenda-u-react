
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

    // Agregar nuevo usuario
    const newUser = { ...userData, id: Date.now() };
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
  }
};
