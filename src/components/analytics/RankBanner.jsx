import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export function RankBanner({ currentRank, progressToNext, nextRank }) {
  // Use the rank's gradient classes and colors
  const gradientClass = currentRank.gradient;
  
  return (
    <GlassCard 
      className="mb-6 relative overflow-hidden" 
      neonBorder={currentRank.color}
    >
      {/* Animated background glow based on rank */}
      <div 
        className={`absolute inset-0 opacity-10 bg-gradient-to-r ${gradientClass} animate-pulse-glow pointer-events-none`}
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Rank Display */}
        <div className="flex items-center gap-6">
          <div 
            className="w-24 h-24 shrink-0 rounded-full flex items-center justify-center border-4 shadow-xl relative"
            style={{ 
              borderColor: currentRank.color,
              backgroundColor: 'light-dark(#ffffff, #0f172a)',
              boxShadow: `0 0 20px ${currentRank.glowColor}`
            }}
          >
            {/* Inner rotating ring for S and SS ranks */}
            {(currentRank.rank === 'S' || currentRank.rank === 'SS') && (
              <div 
                className="absolute inset-[-4px] rounded-full border-t-4 border-r-4 border-transparent animate-spin"
                style={{ borderTopColor: currentRank.color, animationDuration: '3s' }}
              />
            )}
            <span 
              className="text-4xl font-black italic tracking-tighter"
              style={{ color: currentRank.color, textShadow: `0 0 10px ${currentRank.color}` }}
            >
              {currentRank.rank}
            </span>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-1">
              Current Rank
            </h2>
            <div 
              className="text-3xl md:text-4xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(to right, ${currentRank.color}, #ffffff)` }}
            >
              {currentRank.title}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              {currentRank.description}
            </p>
          </div>
        </div>
        
        {/* Progress to Next Rank */}
        {nextRank && (
          <div className="w-full md:w-1/3 flex flex-col gap-2 bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between text-xs font-bold tracking-wide uppercase text-slate-600 dark:text-slate-400">
              <span>Progress to {nextRank.rank}-Rank</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${progressToNext}%`,
                  backgroundColor: nextRank.color,
                  boxShadow: `0 0 10px ${nextRank.color}80`
                }}
              />
            </div>
            <div className="text-[10px] text-slate-500 text-right mt-1">
              Requires {nextRank.minPercentage}% completion
            </div>
          </div>
        )}
        
        {/* Max Rank State */}
        {!nextRank && (
          <div className="w-full md:w-1/3 text-center p-4">
            <div className="text-yellow-400 text-sm font-bold tracking-widest uppercase animate-pulse">
              Maximum Rank Achieved
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
