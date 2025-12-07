import React from 'react';

export default function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    className = "",
    disabled = false
}) {
    const baseStyles = "w-full flex items-center justify-center cursor-pointer"

    const variants = {
        primary: "bg-gradient-to-r from-[#67C090] to-[#26667F] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-101 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
    }
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
