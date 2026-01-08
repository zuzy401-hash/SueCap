
import React from 'react';
import { AppView, UserStats } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  userStats: UserStats;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, toggleSidebar, userStats }) => {
  const menuItems = [
    { view: AppView.DASHBOARD, icon: 'fa-house', label: 'Inicio' },
    { view: AppView.STUDIO, icon: 'fa-wand-magic-sparkles', label: 'Estudio AI' },
    { view: AppView.CHALLENGES, icon: 'fa-trophy', label: 'Retos' },
    { view: AppView.COMMUNITY, icon: 'fa-users', label: 'Comunidad' },
    { view: AppView.COURSES, icon: 'fa-graduation-cap', label: 'Cursos' },
    { view: AppView.PRICING, icon: 'fa-tags', label: 'Planes' },
    { view: AppView.PROFILE, icon: 'fa-gear', label: 'Ajustes' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 bg-slate-950 border-r border-slate-900 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between">
        {isOpen && <span className="font-black text-xl italic tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">SUECAP</span>}
        <button onClick={toggleSidebar} className="text-slate-400 hover:text-white p-2">
          <i className={`fa-solid ${isOpen ? 'fa-angles-left' : 'fa-angles-right'}`}></i>
        </button>
      </div>

      <nav className="mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.view 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6`}></i>
            {isOpen && <span className="font-medium">{item.label}</span>}
            {!isOpen && (
               <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 {item.label}
               </div>
            )}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-10 left-0 w-full px-4">
        {isOpen ? (
          <div className="glass p-5 rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-900 border-blue-500/20 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Nivel {userStats.level}</span>
              <i className="fa-solid fa-shield-halved text-blue-400"></i>
            </div>
            <div className="h-2 bg-slate-800 rounded-full mb-2 overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-1000" 
                style={{ width: `${(userStats.xp / userStats.nextLevelXP) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 font-bold text-center">{userStats.xp} / {userStats.nextLevelXP} XP</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-xs">
              {userStats.level}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
