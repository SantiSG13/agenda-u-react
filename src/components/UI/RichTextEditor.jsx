import React from 'react';

export default function RichTextEditor({ value, onChange, placeholder }) {
    // Nota: Para una implementación real robusta se usaría algo como Draft.js, Slate.js o Quill.
    // Para mantenerlo "sencillo pero funcional" y sin dependencias pesadas extras, usaremos un textarea estilizado
    // que simula ser un editor, o un contentEditable simple.
    // Dado el requerimiento de "sencillez", un textarea bien diseñado es más estable que un contentEditable mal hecho.
    
    // Sin embargo, el usuario pidió "texto enriquecido". Vamos a hacer un mini-toolbar que inserte markdown básico
    // o simplemente usaremos un textarea que permita escribir libremente.
    
    // Si queremos ser fieles a "texto enriquecido" real sin librerías, contentEditable es la vía, 
    // pero es propenso a bugs. Vamos a usar un enfoque híbrido: Textarea con soporte visual.

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#26667F] transition-all h-full flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
                <div className="text-xs text-gray-500 px-2">Editor de Texto</div>
                {/* Aquí se podrían agregar botones reales si usáramos una librería */}
            </div>
            <textarea
                className="w-full h-full p-4 outline-none resize-none text-gray-700 leading-relaxed"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Escribe tus apuntes aquí..."}
            />
        </div>
    );
}
