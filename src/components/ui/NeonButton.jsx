import React from 'react';

export function NeonButton({ children, onClick, color = '#22d3ee', className = '', type = 'button', fullWidth = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        relative overflow-hidden group font-bold tracking-wider rounded-lg px-6 py-3
        transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        backgroundColor: `light-dark(rgba(15,23,42,0.05), rgba(255,255,255,0.05))`,
        color: color,
        border: `1px solid ${color}`,
        boxShadow: `0 0 10px ${color}33`,
      }}
    >
      {/* Background fill animation */}
      <div 
        className="absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full opacity-10"
        style={{ backgroundColor: color }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
