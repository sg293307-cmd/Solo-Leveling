import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function LoginPage({ onLogin, theme, toggleTheme }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">

      {/* Background Animated Gradient / Grid */}
      <div className="">
        {/* Base background - gradient in light, solid in dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#e3cbfc] via-[#ffcce0] to-[#ffc9c9] dark:bg-none dark:bg-[var(--color-bg-dark)] transition-colors duration-300" />

        {/* Light mode concentric rings (matching image) */}
        <div
          className="absolute inset-0 top-[-20%] dark:hidden opacity-30 pointer-events-none"
          style={{
            backgroundImage: `repeating-radial-gradient(circle at 50% 0%, transparent, transparent 15px, rgba(0,0,0,0.05) 15px, rgba(0,0,0,0.05) 16px)`
          }}
        />

        {/* Dark mode glow blobs */}
        <div
          className="absolute inset-0 hidden dark:block opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #23555dff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4d2d6cff 0%, transparent 40%)`,
            filter: 'blur(60px)'
          }}
        />

      </div>

      <div className="relative z-10 w-full max-w-md animate-in">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2
                         text-slate-900 dark:text-[#59e1f6ff]">
            Solo Leveling
          </h1>
          <p className="text-slate-700 dark:text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase">
            Habit Tracker
          </p>
        </div>

        <GlassCard className="!bg-white/40 dark:!bg-[var(--color-surface-dark)] !border-white/50 dark:!border-slate-700 p-8 shadow-2xl backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white
                           focus:outline-none focus:border-white focus:ring-1 focus:ring-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                           transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white
                           focus:outline-none focus:border-white focus:ring-1 focus:ring-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                           transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mt-4">
              {/* Dark mode button */}
              <div className="hidden dark:block w-full">
                <NeonButton type="submit" fullWidth color="#22d3ee">
                  ENTER THE GATE
                </NeonButton>
              </div>

              {/* Light mode button (matches image) */}
              <button
                type="submit"
                className="w-full py-4 rounded-[2rem] bg-white text-slate-900 font-bold text-lg 
                           hover:bg-slate-50 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.05)]
                           dark:hidden"
              >
                ENTER THE GATE
              </button>
            </div>
          </form>
        </GlassCard>
      </div>

      <div className="absolute bottom-6 left-6 z-20">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}
