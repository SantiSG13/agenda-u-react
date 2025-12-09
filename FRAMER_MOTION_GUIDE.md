# Guía de Framer Motion en Agenda U

Esta guía explica cómo se utiliza **Framer Motion** en toda la aplicación Agenda U para crear animaciones fluidas y transiciones elegantes entre páginas y componentes.

## Tabla de Contenidos

1. [¿Qué es Framer Motion?](#qué-es-framer-motion)
2. [Instalación](#instalación)
3. [Conceptos Clave](#conceptos-clave)
4. [Uso en la Aplicación](#uso-en-la-aplicación)
5. [Ejemplos Detallados](#ejemplos-detallados)

---

## ¿Qué es Framer Motion?

**Framer Motion** es una biblioteca de animación para React que permite crear animaciones complejas de forma declarativa. Es una de las bibliotecas más populares para animaciones en React debido a su:

- **API sencilla y declarativa**: Las animaciones se definen con props simples
- **Rendimiento optimizado**: Usa la GPU para animaciones suaves
- **Soporte para gestos**: Incluye manejo de hover, tap, drag, etc.
- **Transiciones inteligentes**: Anima automáticamente entre diferentes estados

---

## Instalación

La biblioteca ya está instalada en el proyecto. En `package.json`:

```json
"dependencies": {
  "framer-motion": "^12.23.25"
}
```

---

## Conceptos Clave

### 1. **`motion` components**

Framer Motion proporciona componentes `motion` que son versiones animables de elementos HTML:

```jsx
import { motion } from 'framer-motion'

// Cualquier elemento HTML puede convertirse en animable
<motion.div>...</motion.div>
<motion.button>...</motion.button>
<motion.section>...</motion.section>
```

### 2. **Props de Animación Principales**

#### `initial`
Define el estado inicial del componente (antes de aparecer):

```jsx
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  // Empieza invisible (opacity: 0) y 20px más abajo (y: 20)
>
```

#### `animate`
Define el estado final al que debe animar:

```jsx
<motion.div 
  animate={{ opacity: 1, y: 0 }}
  // Termina visible (opacity: 1) y en su posición original (y: 0)
>
```

#### `exit`
Define la animación de salida cuando el componente se desmonta:

```jsx
<motion.div 
  exit={{ opacity: 0, x: -50 }}
  // Al salir, se desvanece y se mueve 50px a la izquierda
>
```

#### `transition`
Configura cómo se realiza la animación:

```jsx
<motion.div 
  transition={{ duration: 0.5, delay: 0.1 }}
  // Duración de 0.5 segundos con retraso de 0.1 segundos
>
```

### 3. **`AnimatePresence`**

Componente especial que permite animar componentes cuando se montan/desmontan del DOM:

```jsx
import { AnimatePresence } from 'framer-motion'

<AnimatePresence mode="wait">
  {/* Los hijos con animaciones exit funcionarán */}
</AnimatePresence>
```

**Modos de AnimatePresence:**
- `wait`: Espera a que la animación de salida termine antes de mostrar el nuevo componente
- `sync`: Las animaciones de entrada y salida ocurren simultáneamente
- `popLayout`: Útil para listas donde elementos pueden aparecer/desaparecer

---

## Uso en la Aplicación

### Archivos que Usan Framer Motion

La aplicación utiliza Framer Motion en los siguientes archivos:

1. **`src/App.jsx`** - Transiciones entre rutas principales
2. **`src/pages/Landing.jsx`** - Animaciones de entrada escalonadas en la página de inicio
3. **`src/pages/Login.jsx`** - Animaciones de entrada lateral
4. **`src/pages/Register.jsx`** - Animaciones de entrada lateral
5. **`src/pages/Recovery.jsx`** - Animaciones de entrada lateral
6. **`src/pages/Dashboard.jsx`** - Transiciones entre secciones del dashboard
7. **`src/components/UI/Modal.jsx`** - Animaciones de apertura/cierre de modales

---

## Ejemplos Detallados

### 1. App.jsx - Transiciones de Página

**Archivo:** `src/App.jsx`

```jsx
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        {/* ... más rutas */}
      </Routes>
    </AnimatePresence>
  )
}
```

**¿Qué hace?**

- **`AnimatePresence`**: Envuelve las rutas para permitir animaciones de salida
- **`mode="wait"`**: Espera a que la página actual termine su animación de salida antes de mostrar la nueva página
- **`key={location.pathname}`**: Clave única para que React detecte cambios de ruta y active las animaciones

**Resultado:** Transiciones suaves entre páginas diferentes de la aplicación.

---

### 2. Landing.jsx - Animaciones Escalonadas

**Archivo:** `src/pages/Landing.jsx`

#### Ejemplo 1: Badge Animado

```jsx
<motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full..."
>
    <span className="w-2 h-2 rounded-full bg-[#26667F] animate-pulse"></span>
    Tu compañero universitario ideal
</motion.div>
```

**Funcionamiento:**
1. **Inicio (`initial`)**: El badge empieza invisible (`opacity: 0`) y 20px más abajo (`y: 20`)
2. **Animación (`animate`)**: Se hace visible (`opacity: 1`) y sube a su posición (`y: 0`)
3. **Duración**: La animación toma 0.5 segundos

#### Ejemplo 2: Título con Retraso

```jsx
<motion.h1 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="text-5xl md:text-7xl font-extrabold..."
>
    Organiza tu vida
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#67C090] to-[#26667F]">
        universitaria
    </span>
</motion.h1>
```

**Funcionamiento:**
- Similar al badge pero con un **`delay: 0.1`**
- Empieza su animación 0.1 segundos después del badge
- Crea un efecto de **animación escalonada** (staggered animation)

#### Ejemplo 3: Descripción con Mayor Retraso

```jsx
<motion.p 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="text-xl text-gray-600 mb-10..."
>
    Horarios, calificaciones, apuntes y tareas en un solo lugar...
</motion.p>
```

**Resultado del Escalonamiento:**
1. Badge aparece inmediatamente (delay: 0)
2. Título aparece 0.1s después
3. Descripción aparece 0.2s después
4. Botones aparecen 0.3s después

Esto crea una **cascada visual** que guía la atención del usuario de arriba hacia abajo.

---

### 3. Login.jsx - Animación de Entrada Lateral

**Archivo:** `src/pages/Login.jsx`

```jsx
<motion.div 
    className="w-full md:w-1/2 flex flex-col justify-center..."
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
>
    {/* Formulario de login */}
</motion.div>

<motion.div 
    className="hidden md:block md:w-1/2 relative overflow-hidden"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
>
    {/* Imagen de fondo */}
</motion.div>
```

**Funcionamiento:**

**Formulario (Lado Izquierdo):**
- **Entrada**: Viene desde la izquierda (`initial: { x: -50 }`)
- **Estado Final**: Se centra (`animate: { x: 0 }`)
- **Salida**: Se va hacia la izquierda (`exit: { x: -50 }`)

**Imagen (Lado Derecho):**
- **Entrada**: Viene desde la derecha (`initial: { x: 50 }`)
- **Estado Final**: Se centra (`animate: { x: 0 }`)
- **Salida**: Se va hacia la derecha (`exit: { x: 50 }`)

**Efecto Visual:** Los dos lados entran "deslizándose" desde direcciones opuestas, creando un efecto de apertura de cortinas.

---

### 4. Register.jsx - Inversión de Dirección

**Archivo:** `src/pages/Register.jsx`

```jsx
{/* Formulario - ahora desde la derecha */}
<motion.div 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
>

{/* Imagen - ahora desde la izquierda */}
<motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
>
```

**Diferencia con Login:**
- Las animaciones están **invertidas** (formulario desde derecha, imagen desde izquierda)
- Esto da **variedad visual** y hace que cada página se sienta única
- El usuario experimenta diferentes direcciones de animación según la página

---

### 5. Dashboard.jsx - PageWrapper para Secciones

**Archivo:** `src/pages/Dashboard.jsx`

```jsx
const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
    >
        {children}
    </motion.div>
);

// Uso:
<AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
        <Route path="home" element={<PageWrapper><Resumen /></PageWrapper>} />
        <Route path="schedule" element={<PageWrapper><Horario /></PageWrapper>} />
        <Route path="grades" element={<PageWrapper><Calificaciones /></PageWrapper>} />
        {/* ... más rutas */}
    </Routes>
</AnimatePresence>
```

**Funcionamiento:**

1. **`PageWrapper`**: Componente reutilizable que envuelve cada sección del dashboard
2. **Animación de Entrada**: Aparece desde abajo (`initial: { y: 20 }`) y se desvanece (`opacity: 0`)
3. **Animación de Salida**: Sube ligeramente (`exit: { y: -20 }`) y se desvanece
4. **Duración Corta**: `0.3s` para que las transiciones sean rápidas en navegación frecuente
5. **`AnimatePresence mode="wait"`**: Asegura que la sección antigua salga antes de mostrar la nueva

**Resultado:** Cada vez que cambias de "Horario" a "Calificaciones" o cualquier otra sección, hay una animación suave de transición.

---

### 6. Modal.jsx - Animación de Backdrop y Contenido

**Archivo:** `src/components/UI/Modal.jsx`

```jsx
<AnimatePresence>
    {isOpen && (
        <>
            {/* Backdrop - Fondo oscuro */}
            <motion.div
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            
            {/* Modal Content - Ventana del modal */}
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center..."
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
                <div className="bg-white rounded-2xl shadow-xl...">
                    {children}
                </div>
            </motion.div>
        </>
    )}
</AnimatePresence>
```

**Funcionamiento:**

**Backdrop (Fondo):**
- **Entrada**: Se desvanece gradualmente (`opacity: 0 → 1`)
- **Salida**: Se desvanece (`opacity: 1 → 0`)
- **Clic**: Cierra el modal cuando haces clic fuera de él

**Modal Content (Ventana):**
- **Entrada**: 
  - Aparece desde abajo (`y: 20 → 0`)
  - Se agranda ligeramente (`scale: 0.95 → 1`)
  - Se desvanece (`opacity: 0 → 1`)
- **Salida**: Invierte la animación de entrada

**Resultado:** El modal tiene una animación profesional tipo "pop-up" que se siente moderna y pulida.

---

## Propiedades de Animación Comunes

### Propiedades Transform

```jsx
// Posición
x: 50          // Mueve 50px a la derecha
y: 20          // Mueve 20px hacia abajo
x: -50         // Mueve 50px a la izquierda
y: -20         // Mueve 20px hacia arriba

// Escala
scale: 0.95    // 95% del tamaño original
scale: 1       // Tamaño original
scale: 1.1     // 110% del tamaño original

// Rotación
rotate: 45     // Rota 45 grados
rotate: -90    // Rota -90 grados
```

### Propiedades de Opacidad

```jsx
opacity: 0     // Completamente transparente (invisible)
opacity: 0.5   // Medio transparente
opacity: 1     // Completamente opaco (visible)
```

### Propiedades de Transition

```jsx
transition={{
  duration: 0.5,        // Duración en segundos
  delay: 0.1,           // Retraso antes de empezar
  ease: "easeInOut",    // Tipo de interpolación
  type: "spring",       // Animación con efecto de resorte
  stiffness: 100,       // Rigidez del resorte
  damping: 10           // Amortiguación del resorte
}}
```

---

## Patrones de Uso en Agenda U

### 1. **Fade In desde Abajo** (Más Común)

```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

**Uso:** Landing page, secciones del dashboard
**Efecto:** Los elementos "suben" gradualmente mientras aparecen

### 2. **Slide desde los Lados**

```jsx
// Desde la izquierda
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}

// Desde la derecha
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
```

**Uso:** Login, Register, Recovery
**Efecto:** Los paneles se deslizar lateralmente

### 3. **Animaciones Escalonadas**

```jsx
// Elemento 1
transition={{ duration: 0.5, delay: 0 }}

// Elemento 2
transition={{ duration: 0.5, delay: 0.1 }}

// Elemento 3
transition={{ duration: 0.5, delay: 0.2 }}
```

**Uso:** Landing page (hero section)
**Efecto:** Los elementos aparecen uno tras otro creando una cascada

### 4. **Pop-up con Escala**

```jsx
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 20 }}
```

**Uso:** Modales
**Efecto:** El modal "crece" desde el centro

---

## Mejores Prácticas

### 1. **Duraciones Apropiadas**

- **Transiciones de página**: 0.5 segundos (suficiente para ser notable pero no lenta)
- **Secciones del dashboard**: 0.3 segundos (más rápido para navegación frecuente)
- **Modales**: 0.2-0.3 segundos (rápido para no interrumpir el flujo)

### 2. **Delays Escalonados**

- Incrementos de 0.1 segundos son ideales
- No uses más de 3-4 elementos escalonados para evitar esperas largas

### 3. **AnimatePresence Mode**

- **`mode="wait"`**: Úsalo para transiciones de página completa
- **`mode="sync"`**: Úsalo para listas o múltiples elementos

### 4. **Consistencia**

- Usa los mismos patrones de animación para acciones similares
- Login, Register y Recovery usan el mismo estilo de animación lateral
- Todas las secciones del dashboard usan el mismo PageWrapper

---

## Resumen

**Framer Motion en Agenda U** se usa para:

1. ✅ **Transiciones entre páginas** - Experiencia fluida al navegar
2. ✅ **Animaciones de entrada escalonadas** - Landing page impactante
3. ✅ **Efectos de deslizamiento lateral** - Login/Register elegantes
4. ✅ **Transiciones del dashboard** - Navegación interna suave
5. ✅ **Modales animados** - Ventanas emergentes profesionales

**Ventajas de este enfoque:**

- 🎯 **Consistente**: Los mismos patrones se reutilizan en toda la app
- ⚡ **Eficiente**: Las animaciones usan GPU, no afectan el rendimiento
- 🎨 **Profesional**: Da una sensación moderna y pulida
- 🔧 **Mantenible**: Código declarativo fácil de entender y modificar

---

## Recursos Adicionales

- **Documentación Oficial**: [https://www.framer.com/motion/](https://www.framer.com/motion/)
- **Ejemplos**: [https://www.framer.com/motion/examples/](https://www.framer.com/motion/examples/)
- **Playground**: [https://codesandbox.io/s/framer-motion](https://codesandbox.io/s/framer-motion)

---

**Fecha de creación:** 2025-12-09  
**Versión de Framer Motion:** 12.23.25  
**Autor:** Documentación generada para Agenda U
