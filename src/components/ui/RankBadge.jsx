import React from 'react';

export function RankBadge({ rank, size = 'md', showLabel = true }) {
  if (!rank) return null;

  const sizeClasses = {
    xs: 'text-xs px-1.5 py-0.5 border',
    sm: 'text-xs px-2 py-0.5 border',
    md: 'text-sm px-3 py-1 border',
    lg: 'text-base px-4 py-1.5 border-2',
  };

  const isElite = rank.rank === 'S' || rank.rank === 'SS';

  return (
    <div className="relative group inline-block">
      {/* Glow layer for elite ranks */}
      {isElite && (
        <div 
          className="absolute inset-0 rounded-md animate-pulse-glow blur-sm opacity-70"
          style={{ backgroundColor: rank.color }}
        />
      )}
      
      {/* Main badge */}
      <div 
        className={`relative font-bold rounded-md tracking-wider flex items-center justify-center gap-1.5 ${sizeClasses[size]}`}
        style={{ 
          borderColor: rank.color,
          color: rank.color,
          backgroundColor: `light-dark(#ffffff, #0f172a)`,
        }}
      >
        {showLabel && <span className="opacity-80 font-normal text-slate-500 dark:text-slate-400">Rank:</span>}
        <span style={{ textShadow: isElite ? `0 0 10px ${rank.color}` : 'none' }}>
          {showLabel ? `${rank.rank}-Class` : rank.rank}
        </span>
      </div>
    </div>
  );
}
