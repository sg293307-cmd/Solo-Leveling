import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { MonthlyDashboard } from './pages/MonthlyDashboard';
import { AnnualAnalytics } from './pages/AnnualAnalytics';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardShell } from './components/layout/DashboardShell';
import { useHabitData } from './hooks/useHabitData';
import { useTheme } from './hooks/useTheme';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' | 'analytics'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  
  // Master data hook
  const { 
    data, 
    isLoaded, 
    toggleDailyHabit, 
    toggleWeeklyHabit,
    updateHealthMetrics,
    updateNotes,
    updateSettings,
    addHabit,
    resetData 
  } = useHabitData(user?.uid);

  // Theme hook
  const { theme, toggleTheme } = useTheme(data?.settings?.theme || 'light');

  // Sync theme to settings when it changes
  useEffect(() => {
    if (data && data.settings && data.settings.theme !== theme) {
      updateSettings({ theme });
    }
  }, [theme, data, updateSettings]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthLoading || (isAuthenticated && !isLoaded)) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center">Loading...</div>;
  }

  // Handle Mock Login (Replaced by Firebase Auth, but kept for signature if needed)
  const handleLogin = (username) => {
    if (data && data.settings) {
      updateSettings({ ...data.settings, username });
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
      setCurrentPage('dashboard');
    });
  };

  // Render Login if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-cyan-500/30">
      <Toaster position="top-center" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white font-bold' }} />
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        user={{ ...data?.user, name: user?.displayName || data?.settings?.username || data?.user?.name || user?.email || 'Hunter' }}
        theme={theme}
        toggleTheme={toggleTheme}
        data={data}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <DashboardShell isOpen={isSidebarOpen}>
        {currentPage === 'dashboard' && (
          <MonthlyDashboard 
            data={data}
            updateSettings={updateSettings}
            toggleDailyHabit={toggleDailyHabit}
            toggleWeeklyHabit={toggleWeeklyHabit}
            updateNotes={updateNotes}
            updateHealthMetrics={updateHealthMetrics}
            addHabit={addHabit}
          />
        )}
        
        {currentPage === 'analytics' && (
          <AnnualAnalytics data={data} />
        )}
      </DashboardShell>
    </div>
  );
}

export default App;
