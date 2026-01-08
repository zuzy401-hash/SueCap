
import React from 'react';
import { UserStats } from '../types';
import { DAILY_CHALLENGES } from '../constants';

interface ChallengesProps {
  stats: UserStats;
}

const Challenges: React.FC<ChallengesProps> = ({ stats }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">Misiones de Sueño</h2>
          <p className="text-slate-400">Supera tus límites, completa misiones y conviértete en una Leyenda SUECAP.</p>
        </div>
        <div className="glass px-8 py-5 rounded-[2rem] border-blue-500/20 bg-blue-500/5 flex items-center gap-6">
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estado de Racha</p>
             <p className="text-2xl font-black text-amber-500">7 DÍAS 🔥</p>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-950 border-4 border-blue-500 flex items-center justify-center font-black text-xl">
               {stats.level}
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-blue-400 uppercase">Maestro Visual</span>
                <span className="text-xs text-slate-500">Próximo: Gran Arquitecto</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DAILY_CHALLENGES.map((challenge) => (
          <div 
            key={challenge.id} 
            className="glass group p-8 rounded-3xl border-slate-800 hover:border-blue-500/40 transition-all flex items-start gap-6 cursor-pointer overflow-hidden relative"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <i className={`fa-solid ${challenge.icon} text-9xl -rotate-12`}></i>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
              <i className={`fa-solid ${challenge.icon} ${challenge.completed ? 'text-green-500' : 'text-blue-400 group-hover:text-white'}`}></i>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-black tracking-tight">{challenge.title}</h4>
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">+{challenge.rewardXP} XP</span>
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{challenge.description}</p>
              
              <div className="flex items-center gap-3">
                 <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                   <div className={`h-full bg-blue-500 transition-all duration-1000 ${challenge.completed ? 'w-full' : 'w-0'}`}></div>
                 </div>
                 <span className="text-[10px] font-black uppercase text-slate-500">{challenge.completed ? 'Completado' : '0 / 1'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reward Progress Bar */}
      <section className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-2 tracking-tighter">Desbloqueos de Nivel</h3>
          <p className="text-slate-400 mb-10">Continúa creando para obtener recompensas únicas en el ecosistema SUECAP.</p>
          
          <div className="relative flex justify-between max-w-4xl mx-auto px-10">
            {/* Progress line */}
            <div className="absolute top-8 left-10 right-10 h-1 bg-slate-800 z-0">
               <div className="h-full bg-blue-500 w-[45%]"></div>
            </div>
            
            {[
              { lvl: 10, reward: 'Voz Puck', reached: true },
              { lvl: 15, reward: 'Filtro 3D Pro', reached: false },
              { lvl: 20, reward: 'Veo 4K Video', reached: false },
              { lvl: 30, reward: 'SUECAP VIP', reached: false },
            ].map((milestone, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${milestone.reached ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
                   {milestone.reached ? <i className="fa-solid fa-check"></i> : <span className="font-black">{milestone.lvl}</span>}
                 </div>
                 <p className={`mt-4 text-xs font-black uppercase tracking-wider ${milestone.reached ? 'text-blue-400' : 'text-slate-600'}`}>{milestone.reward}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Challenges;
