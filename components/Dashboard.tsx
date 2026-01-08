
import React, { useState } from 'react';
import { AppView } from '../types';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const exploreThumbnails = [
    { view: AppView.STUDIO, title: 'Estudio AI', desc: 'Crea magia', icon: 'fa-wand-magic-sparkles', color: 'from-blue-500 to-indigo-600' },
    { view: AppView.COMMUNITY, title: 'Galería', desc: 'Inspírate', icon: 'fa-images', color: 'from-purple-500 to-pink-600' },
    { view: AppView.COURSES, title: 'Academia', desc: 'Aprende', icon: 'fa-graduation-cap', color: 'from-amber-500 to-orange-600' },
    { view: AppView.PRICING, title: 'Premium', desc: 'Sin límites', icon: 'fa-gem', color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Interactive Hero Section */}
      <section 
        className="relative h-[500px] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        <div 
          className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] transition-transform duration-75 ease-out opacity-60"
          style={{ 
            transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px) scale(1.05)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        
        <div className="relative z-10 px-12 h-full flex flex-col justify-center max-w-3xl">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white">Nuevo: Veo 3.1</span>
            <span className="text-slate-400 text-sm font-medium">• 100% Realismo AI</span>
          </div>
          
          <h2 className="text-6xl font-black mb-6 leading-none tracking-tighter">
            Tus pensamientos,<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Hechos Realidad.</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
            La plataforma definitiva para creadores visuales. Transforma texto en obras maestras de arcilla, lana, 3D y video profesional.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => onNavigate(AppView.STUDIO)}
              className="bg-white text-slate-950 hover:bg-blue-50 px-10 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              CREAR MI SUEÑO
            </button>
            <button 
              onClick={() => onNavigate(AppView.CHALLENGES)}
              className="bg-slate-900/50 backdrop-blur hover:bg-slate-800 px-10 py-5 rounded-2xl font-black text-lg border border-slate-700 transition-all flex items-center gap-3"
            >
              <i className="fa-solid fa-trophy text-amber-400"></i>
              VER RETOS
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 flex gap-4 animate-bounce-slow">
           <div className="w-20 h-20 rounded-2xl border-2 border-white/20 overflow-hidden rotate-6">
              <img src="https://picsum.photos/200/200?clay" className="w-full h-full object-cover" />
           </div>
           <div className="w-20 h-20 rounded-2xl border-2 border-white/20 overflow-hidden -rotate-6">
              <img src="https://picsum.photos/200/200?wool" className="w-full h-full object-cover" />
           </div>
        </div>
      </section>

      {/* Interactive Thumbnail Navigation */}
      <section>
        <h3 className="text-sm uppercase tracking-[0.4em] font-black text-slate-500 mb-8 text-center">Explora el Ecosistema</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreThumbnails.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(item.view)}
              className="group relative h-48 rounded-3xl overflow-hidden p-6 text-left transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 border border-slate-800"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-950/50 flex items-center justify-center text-xl">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <div>
                  <h4 className="font-black text-2xl tracking-tighter">{item.title}</h4>
                  <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 group-hover:opacity-30 transition-all transform group-hover:rotate-12 group-hover:scale-150">
                <i className={`fa-solid ${item.icon} text-6xl`}></i>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Level / Rewards Preview Card */}
      <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-[2.5rem] p-10 border border-blue-500/20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h3 className="text-3xl font-black tracking-tighter">Sube de nivel creando</h3>
          <p className="text-slate-400 leading-relaxed">Completa retos diarios, comparte tus diseños y desbloquea herramientas exclusivas de Veo 3.1 Pro.</p>
          <div className="pt-4 flex items-center gap-4">
            <div className="h-4 bg-slate-800 rounded-full flex-1 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
            <span className="font-black text-blue-400 text-sm whitespace-nowrap">650 / 1000 XP</span>
          </div>
        </div>
        <div className="flex-shrink-0 grid grid-cols-2 gap-4">
           {[
             { label: 'Nivel 12', icon: 'fa-medal', color: 'text-amber-400' },
             { label: '3 Retos hoy', icon: 'fa-calendar-check', color: 'text-emerald-400' }
           ].map((stat, i) => (
             <div key={i} className="glass px-6 py-4 rounded-2xl text-center">
                <i className={`fa-solid ${stat.icon} ${stat.color} text-2xl mb-2`}></i>
                <p className="font-black text-sm uppercase">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
