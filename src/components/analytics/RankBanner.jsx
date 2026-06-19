import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { GlassCard } from '../ui/GlassCard';
import { Info, X } from 'lucide-react';
import { rankTiers } from '../../data/rankConfig';

export function RankBanner({ currentRank, progressToNext, nextRank }) {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <>
      <GlassCard 
        className="mb-6 relative overflow-hidden transition-colors duration-500" 
        style={{
          backgroundColor: `${currentRank.color}20`,
          borderColor: `${currentRank.color}50`
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Rank Display */}
          <div className="flex items-center gap-6">
            <div 
              className="w-24 h-24 shrink-0 rounded-full flex items-center justify-center border-4 shadow-sm relative bg-white dark:bg-slate-900 transition-colors duration-500"
              style={{ borderColor: currentRank.color }}
            >
              <span 
                className="text-4xl font-black italic tracking-tighter transition-colors duration-500"
                style={{ color: currentRank.color }}
              >
                {currentRank.rank}
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-sm font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
                  Current Rank
                </h2>
                <button 
                  onClick={() => setShowInfo(true)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  <Info size={16} />
                </button>
              </div>
              <div 
                className="text-3xl md:text-4xl font-black uppercase tracking-tight transition-colors duration-500"
                style={{ color: currentRank.color }}
              >
                {currentRank.title}
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                {currentRank.description}
              </p>
            </div>
          </div>
          
          {/* Progress to Next Rank */}
          {nextRank && (
            <div className="w-full md:w-1/3 flex flex-col gap-2 bg-white/40 dark:bg-slate-900/40 p-4 rounded-xl border border-white/50 dark:border-slate-800/50 backdrop-blur-sm">
              <div className="flex justify-between text-xs font-bold tracking-wide uppercase text-slate-700 dark:text-slate-300">
                <span>Progress to {nextRank.rank}-Rank</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${progressToNext}%`,
                    backgroundColor: nextRank.color
                  }}
                />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 text-right mt-1">
                Requires {nextRank.minPercentage}% completion
              </div>
            </div>
          )}
          
          {/* Max Rank State */}
          {!nextRank && (
            <div className="w-full md:w-1/3 text-center p-4">
              <div className="text-yellow-500 text-sm font-bold tracking-widest uppercase">
                Maximum Rank Achieved
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Info Modal */}
      {showInfo && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowInfo(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-black text-lg tracking-wider uppercase text-slate-800 dark:text-slate-100 italic">Ranking System</h3>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar flex flex-col gap-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                Your rank is determined by your Year-To-Date habit completion percentage. Maintain consistency to climb the ranks and become an SS-Rank Monarch.
              </p>
              {rankTiers.map(tier => (
                <div key={tier.rank} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <div 
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-2 font-black italic text-lg shadow-sm bg-white dark:bg-slate-900"
                    style={{ borderColor: tier.color, color: tier.color }}
                  >
                    {tier.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200" style={{ color: tier.color }}>{tier.title}</span>
                      <span className="text-xs font-mono font-bold text-slate-500">{tier.minPercentage}%+</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{tier.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
