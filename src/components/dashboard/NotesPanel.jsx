import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard } from '../ui/GlassCard';

export function NotesPanel({ data, settings, updateNotes }) {
  const { currentYear, currentMonth } = settings;
  const monthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  
  // Local state for smooth typing
  const [localText, setLocalText] = useState(data.notes[monthKey] || '');

  // Sync local state when month changes
  useEffect(() => {
    setLocalText(data.notes[monthKey] || '');
  }, [monthKey, data.notes]);

  // Debounce the save to global state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localText !== (data.notes[monthKey] || '')) {
        updateNotes(monthKey, localText);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localText, monthKey, updateNotes, data.notes]);

  return (
    <GlassCard className="h-full flex flex-col p-0 overflow-hidden bg-white/20 dark:bg-slate-800/20">
      <div className="bg-white/30 dark:bg-slate-800/50 p-4 border-b border-slate-300/50 dark:border-slate-700/50">
        <h3 className="text-sm font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase text-center">
          Notes
        </h3>
      </div>
      
      <div className="flex-1 p-4 relative group">
        <textarea
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          placeholder="Brain dump, thoughts, or goals..."
          className="w-full h-full bg-transparent resize-none focus:outline-none 
                     text-sm text-slate-700 dark:text-slate-300 custom-scrollbar
                     placeholder:text-slate-400 dark:placeholder:text-slate-500
                     font-medium leading-relaxed"
          spellCheck="false"
        />
        
        {/* Subtle lined paper effect background */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-10 dark:opacity-5 mix-blend-multiply dark:mix-blend-overlay"
             style={{
               backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, currentColor 27px, currentColor 28px)`,
               backgroundPosition: `0 16px`
             }}
        />
      </div>
    </GlassCard>
  );
}
