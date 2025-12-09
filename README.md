# Agenda U

Aplicación web para organizar la vida universitaria de estudiantes. Gestiona horarios, calificaciones, apuntes y tareas en un solo lugar.

## 🚀 Características

- 📅 **Horario Inteligente** - Organiza tus clases y actividades
- 📊 **Control de Calificaciones** - Monitorea tus notas y promedios
- 📝 **Apuntes Digitales** - Toma notas organizadas por materia
- ✅ **Gestión de Tareas** - Nunca olvides una entrega

## 🛠️ Tecnologías

- **React 19** - Framework de UI
- **React Router** - Navegación entre páginas
- **Framer Motion** - Animaciones y transiciones fluidas
- **Tailwind CSS** - Estilos y diseño responsivo
- **Vite** - Build tool y desarrollo

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📚 Documentación

- **[Guía de Framer Motion](./FRAMER_MOTION_GUIDE.md)** - Explicación detallada de cómo funcionan las animaciones en toda la aplicación

## 🎨 Animaciones

La aplicación utiliza **Framer Motion** para crear una experiencia de usuario fluida y moderna:

- Transiciones suaves entre páginas
- Animaciones de entrada escalonadas en la landing page
- Efectos de deslizamiento lateral en Login/Register
- Transiciones del dashboard
- Modales con animaciones pop-up

Para más detalles, consulta la [Guía de Framer Motion](./FRAMER_MOTION_GUIDE.md).

## 🏗️ Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── UI/          # Componentes de interfaz (Button, Input, Modal, etc.)
│   └── PrivateRoute.jsx
├── pages/           # Páginas de la aplicación
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Recovery.jsx
│   ├── Dashboard.jsx
│   └── DashboardSections/
├── services/        # Servicios (autenticación, API, etc.)
└── styles/          # Estilos globales
```

## 👤 Autenticación

El sistema incluye:

- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseña
- Rutas protegidas para el dashboard
- Autenticación simulada (localStorage)

## 📱 Responsive

La aplicación está completamente optimizada para:

- 💻 Desktop
- 📱 Tablets
- 📱 Móviles

## 🔒 Seguridad

- Rutas protegidas con PrivateRoute
- Validación de formularios
- Gestión segura de sesiones

## 📄 Licencia

© 2024 Agenda U. Todos los derechos reservados.
