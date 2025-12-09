import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        // AnimatePresence permite animar el modal cuando aparece/desaparece
        // No necesita mode="wait" porque no hay transiciones entre diferentes modales
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - Fondo oscuro semitransparente detrás del modal */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                        // Animación simple: solo fade in/out
                        initial={{ opacity: 0 }}        // Empieza transparente
                        animate={{ opacity: 1 }}        // Se vuelve visible
                        exit={{ opacity: 0 }}           // Se desvanece al cerrar
                        onClick={onClose}               // Cierra el modal al hacer clic fuera
                    />
                    
                    {/* Modal Content - La ventana del modal con su contenido */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        // Animación combinada: fade + scale + movimiento vertical
                        // Crea un efecto de "pop-up" profesional
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}  // Empieza invisible, pequeño y abajo
                        animate={{ opacity: 1, scale: 1, y: 0 }}      // Crece a tamaño completo y sube
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}     // Se encoge y baja al cerrar
                    >
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg pointer-events-auto max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                                <button 
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Body */}
                            <div className="p-6 overflow-y-auto">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
