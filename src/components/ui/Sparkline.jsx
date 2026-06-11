import React, { useMemo } from 'react';

export function Sparkline({ data = [], width = 200, height = 50, color = '#a855f7' }) {
  const pts = useMemo(() => {
    if (!data || data.length === 0) return '';
    
    // Extents
    const padding = 4;
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;
    
    const minX = data[0].day;
    const maxX = data[data.length - 1].day;
    
    // Y maps 0-100% to height
    
    return data.map((d, i) => {
      const x = padding + ((d.day - minX) / (maxX - minX)) * innerW;
      const y = padding + innerH - (d.percentage / 100) * innerH;
      return `${x},${y}`;
    }).join(' ');
  }, [data, width, height]);

  if (!data || data.length === 0) {
    return <div style={{ width, height }} className="bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />;
  }

  return (
    <div style={{ width, height }} className="relative opacity-80 hover:opacity-100 transition-opacity">
      <svg width={width} height={height} className="overflow-visible">
        {/* Fill under the curve */}
        <polygon 
          points={`${padding},${height - padding} ${pts} ${width - padding},${height - padding}`}
          fill={`url(#sparkline-gradient)`}
          opacity="0.3"
        />
        
        {/* The line itself */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pts}
          style={{ filter: `drop-shadow(0 2px 4px ${color}80)` }}
        />
        
        <defs>
          <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Extracted constant for padding scope
const padding = 4;
