import React from 'react';

export function GlassCard({ children, className = '', neonBorder = null }) {
  const borderStyle = neonBorder ? {
    borderColor: neonBorder,
    boxShadow: `0 0 15px ${neonBorder}33` // 33 is approx 20% opacity in hex
  } : {};

  return (
    <div 
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${className}`}
      style={borderStyle}
    >
      {children}
    </div>
  );
}
