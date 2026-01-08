
import React, { useState, useEffect } from 'react';
import { AppView, UserStats } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Studio from './components/Studio';
import Community from './components/Community';
import Pricing from './components/Pricing';
import Courses from './components/Courses';
import Profile from './components/Profile';
import Challenges from './components/Challenges';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Gamification State
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    xp: 650,
    nextLevelXP: 1000,
    completedChallenges: []
  });

  // Auto-scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard onNavigate={setCurrentView} />;
      case AppView.STUDIO: return <Studio />;
      case AppView.COMMUNITY: return <Community />;
      case AppView.PRICING: return <Pricing />;
      case AppView.COURSES: return <Courses />;
      case AppView.PROFILE: return <Profile />;
      case AppView.CHALLENGES: return <Challenges stats={userStats} />;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        userStats={userStats}
      />

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-6 md:p-10`}>
        <header className="flex justify-between items-center mb-10 sticky top-0 bg-slate-950/80 backdrop-blur-md py-4 z-40 border-b border-slate-800/50">
          <Logo />
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Nivel {userStats.level}</span>
              <div className="w-32 h-1 bg-slate-800 rounded-full mt-1">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(userStats.xp / userStats.nextLevelXP) * 100}%` }}
                />
              </div>
            </div>
            
            <button className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700">
              <i className="fa-solid fa-gem text-amber-400"></i>
              <span className="text-sm font-semibold">Pro Plan</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white cursor-pointer hover:ring-2 ring-blue-400 transition-all">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      {/* Persistent Call to Action for Free Users */}
      {currentView !== AppView.PRICING && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <button 
            onClick={() => setCurrentView(AppView.PRICING)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-3 transition-transform hover:scale-105"
          >
            <i className="fa-solid fa-bolt"></i>
            <span>¡OFERTA LIMITADA - 50% DCTO!</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
