import React, { useEffect, useState } from 'react';

export function CircularProgress({ 
  percentage, 
  size = 120, 
  strokeWidth = 12, 
  color = '#22d3ee',
  label = null
}) {
  const [animatedPct, setAnimatedPct] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Animation effect on mount or percentage change
  useEffect(() => {
    // Small delay for entrance animation
    const timer = setTimeout(() => setAnimatedPct(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const strokeDashoffset = circumference - (animatedPct / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center flex-col" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background track */}
        <circle
          className="text-slate-200 dark:text-slate-800 transition-colors duration-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress ring */}
        <circle
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-in-out',
            filter: `drop-shadow(0 0 4px ${color}66)`
          }}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold dark:text-white" style={{ color: `light-dark(#0f172a, #ffffff)` }}>
          {Math.round(animatedPct)}%
        </span>
      </div>
      
      {/* Optional bottom label */}
      {label && (
        <div className="absolute -bottom-6 text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
}
