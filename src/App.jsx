import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { MonthlyDashboard } from './pages/MonthlyDashboard';
import { AnnualAnalytics } from './pages/AnnualAnalytics';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardShell } from './components/layout/DashboardShell';
import { useHabitData } from './hooks/useHabitData';
import { useTheme } from './hooks/useTheme';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' | 'analytics'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
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
  } = useHabitData();

  // Theme hook
  const { theme, toggleTheme } = useTheme(data?.settings?.theme || 'light');

  // Sync theme to settings when it changes
  useEffect(() => {
    if (data && data.settings.theme !== theme) {
      updateSettings({ theme });
    }
  }, [theme, data, updateSettings]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center">Loading...</div>;
  }

  // Handle Mock Login
  const handleLogin = (username) => {
    updateSettings({ ...data.settings, username });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  // Render Login if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-cyan-500/30">
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        user={{ ...data.user, name: data.settings.username || data.user.name }}
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
