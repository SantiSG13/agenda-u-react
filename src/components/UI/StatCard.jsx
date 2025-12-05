import React from 'react';
import Card from './Card';

export default function StatCard({ title, value, icon, trend, trendValue, color = "green" }) {
    const colors = {
        green: "bg-green-100 text-green-600",
        teal: "bg-teal-100 text-teal-600",
        blue: "bg-blue-100 text-blue-600",
        purple: "bg-purple-100 text-purple-600"
    };

    return (
        <Card className="flex items-center gap-4 p-6 hover:translate-y-[-2px] transition-transform">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <div className="flex items-end gap-2">
                     <h3 className="text-2xl font-bold text-gray-900 leading-none">{value}</h3>
                     {trend && (
                         <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                             trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                         }`}>
                             {trend === 'up' ? '↑' : '↓'} {trendValue}
                         </span>
                     )}
                </div>
            </div>
        </Card>
    );
}
