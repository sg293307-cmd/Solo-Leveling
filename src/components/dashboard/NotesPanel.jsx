import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Plus, X } from 'lucide-react';

export function NotesPanel({ data, settings, updateNotes }) {
  const { currentYear, currentMonth } = settings;
  const monthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  
  const notesText = data.notes[monthKey] || '';
  const notesList = notesText.split('\n').filter(n => n.trim() !== '');

  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [...notesList, newNote.trim()].join('\n');
      updateNotes(monthKey, updatedNotes);
      setNewNote('');
      setIsAdding(false);
    }
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = notesList.filter((_, i) => i !== index).join('\n');
    updateNotes(monthKey, updatedNotes);
  };

  return (
    <GlassCard className="h-full flex flex-col p-0 overflow-hidden bg-white/20 dark:bg-slate-800/20">
      <div className="bg-white/30 dark:bg-slate-800/50 p-4 border-b border-slate-300/50 dark:border-slate-700/50 flex justify-between items-center">
        <h3 className="text-sm font-bold tracking-widest text-slate-700 dark:text-slate-300 uppercase">
          Notes
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar relative z-0">

        {isAdding && (
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-300 border-b border-cyan-500 focus:outline-none py-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddNote();
                if (e.key === 'Escape') {
                  setIsAdding(false);
                  setNewNote('');
                }
              }}
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {notesList.map((note, idx) => (
            <div key={idx} className="group/note flex items-start gap-2 relative p-2 rounded hover:bg-white/30 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-300/50 dark:border-slate-700/50 last:border-b-0">
              <div className="flex-1 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed break-words">
                {note}
              </div>
              <button
                onClick={() => handleRemoveNote(idx)}
                className="opacity-0 group-hover/note:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {notesList.length === 0 && !isAdding && (
             <div className="text-sm text-slate-400 dark:text-slate-500 italic text-center mt-8">
               No notes for this month.
             </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
