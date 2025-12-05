import React from 'react';

export default function Card({ children, className = "", hoverEffect = false }) {
    const baseStyles = "bg-white p-8 rounded-3xl shadow-sm border border-gray-100";
    const hoverStyles = hoverEffect ? "hover:shadow-md transition-all group" : "";

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}
