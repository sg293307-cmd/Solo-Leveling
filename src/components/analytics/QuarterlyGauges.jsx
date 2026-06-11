import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { CircularProgress } from '../ui/CircularProgress';

export function QuarterlyGauges({ quarterlyRates }) {
  const quarters = [
    { id: 'Q1', title: 'FIRST QUARTER', subtitle: 'JAN-MAR', color: '#fbbf24' }, // Amber
    { id: 'Q2', title: 'SECOND QUARTER', subtitle: 'APR-JUN', color: '#f472b6' }, // Pink
    { id: 'Q3', title: 'THIRD QUARTER', subtitle: 'JUL-SEP', color: '#22d3ee' }, // Cyan
    { id: 'Q4', title: 'FOURTH QUARTER', subtitle: 'OCT-DEC', color: '#f87171' }, // Red
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {quarters.map(q => (
        <GlassCard key={q.id} className="flex flex-col items-center justify-center py-8">
          <CircularProgress 
            percentage={quarterlyRates[q.id] || 0} 
            size={140} 
            strokeWidth={14} 
            color={q.color} 
          />
          <div className="mt-6 text-center">
            <h4 className="text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase mb-1">
              {q.title}
            </h4>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              COMPLETION
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              {q.subtitle}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
