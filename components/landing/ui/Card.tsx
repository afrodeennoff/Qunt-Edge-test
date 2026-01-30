
import React from 'react';

export const Card = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`group bg-[#09090b]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-4 md:p-5 relative overflow-hidden transition-all duration-300 hover:border-teal-500/20 hover:shadow-[0_0_30px_-10px_rgba(45,212,191,0.1)] h-full w-full flex flex-col ${className}`}>
    {/* Subtle gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    {children}
  </div>
);
