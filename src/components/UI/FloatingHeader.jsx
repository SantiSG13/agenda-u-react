import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function FloatingHeader({ position = "left" }) {
    const positionClass = position === "right" ? "right-6" : "left-6";
    
    return (
        <Link 
            to="/" 
            className={`absolute top-6 ${positionClass} flex items-center gap-2 z-50 hover:opacity-80 transition-opacity p-2 bg-white/50 backdrop-blur-sm rounded-xl`}
        >
            <Logo showText={true} textClassName="font-bold text-gray-800 text-lg hidden sm:block" />
        </Link>
    );
}
