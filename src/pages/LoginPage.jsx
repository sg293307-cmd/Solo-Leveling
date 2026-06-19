import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { NeonButton } from '../components/ui/NeonButton';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

export function LoginPage({ onLogin, theme, toggleTheme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      if (!username.trim()) {
        setError('Username is required for sign up.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (!/[^A-Za-z0-9]/.test(password)) {
        setError('Password must contain at least 1 unique (special) character.');
        return;
      }
    }

    try {
      if (isLogin) {
        // We use 'email' for login now, let's treat the username field as email if 'email' is empty.
        const loginEmail = email || username; // basic fallback
        await signInWithEmailAndPassword(auth, loginEmail, password);
        toast.success('Welcome back!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        toast.success('Welcome!');
        if (onLogin) onLogin(username);
      }
    } catch (err) {
      console.error(err);
      let errorMessage = err.message || 'An error occurred during authentication.';
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already awakened (in use).';
        toast.error('You are already Awakened! Please Login.');
        setIsLogin(true); // Switch to login
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        if (isLogin) {
          toast.error('Hunter not found or invalid credentials. Please Awaken (Sign Up) first!');
          setIsLogin(false); // Switch to signup
        }
        errorMessage = 'Invalid credentials. Please try again.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }
      
      setError(errorMessage);
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

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center font-bold animate-in fade-in">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                {isLogin ? "Email or Username" : "Username"}
              </label>
              <input
                type={isLogin ? "text" : "text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white
                           focus:outline-none focus:border-white focus:ring-1 focus:ring-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                           transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600"
                placeholder={isLogin ? "hunter@gmail.com" : "Enter your name"}
                required
              />
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white
                             focus:outline-none focus:border-white focus:ring-1 focus:ring-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500
                             transition-all placeholder:text-slate-500 dark:placeholder:text-slate-600"
                  placeholder="hunter@gmail.com"
                  required={!isLogin}
                />
              </div>
            )}

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

            <div className="mt-4 flex flex-col gap-4">
              {/* Dark mode button */}
              <div className="hidden dark:block w-full">
                <NeonButton type="submit" fullWidth color="#22d3ee">
                  {isLogin ? 'ENTER THE GATE' : 'AWAKEN (SIGN UP)'}
                </NeonButton>
              </div>

              {/* Light mode button (matches image) */}
              <button
                type="submit"
                className="w-full py-4 rounded-[2rem] bg-white text-slate-900 font-bold text-lg 
                           hover:bg-slate-50 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.05)]
                           dark:hidden"
              >
                {isLogin ? 'ENTER THE GATE' : 'AWAKEN (SIGN UP)'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-cyan-400 transition-colors text-center"
              >
                {isLogin ? "New Hunter? Sign Up" : "Already Awakened? Login"}
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
