import React from 'react';

export default function Input({
    label,
    id,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    className = ""
}) {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#26667F] focus:ring-2 focus:ring-[#26667F]/20 outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}
