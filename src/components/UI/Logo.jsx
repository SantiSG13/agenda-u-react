import React from 'react';

export default function Logo({ className = "", showText = true, textClassName = "text-xl font-bold tracking-tight text-gray-800" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <img src="/Logo.png" alt="Logo" className="w-10 h-10 rounded-xl" />
            {showText && <span className={textClassName}>Agenda U</span>}
        </div>
    );
}
