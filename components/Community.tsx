
import React from 'react';
import { MOCK_TEMPLATES } from '../constants';

const Community: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Comunidad de Creadores</h2>
          <p className="text-slate-400">Descubre plantillas, comparte tus sueños y colabora con otros artistas AI.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Buscar estilos..." 
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 ring-blue-500"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold">Publicar Proyecto</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_TEMPLATES.map((tmpl) => (
          <div key={tmpl.id} className="glass rounded-2xl overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]">
            <div className="relative aspect-video">
              <img src={tmpl.previewUrl} className="w-full h-full object-cover" alt={tmpl.title} />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] uppercase font-bold">
                {tmpl.type}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold truncate">{tmpl.title}</h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px]">
                  {tmpl.author[0]}
                </div>
                <span className="text-xs text-slate-400">@{tmpl.author}</span>
              </div>
              <div className="flex gap-2 mt-4">
                {tmpl.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">#{tag}</span>
                ))}
              </div>
              <button className="w-full mt-4 py-2 rounded-lg border border-blue-500/30 text-blue-400 text-xs font-bold hover:bg-blue-500/10 transition-all">
                Usar como Plantilla
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Creators */}
      <section className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-crown text-amber-400"></i>
          Creadores del Mes
        </h3>
        <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full ring-2 ring-blue-500 p-1 mb-2">
                <img src={`https://picsum.photos/100/100?u=${i}`} className="w-full h-full rounded-full object-cover" alt="User" />
              </div>
              <span className="text-sm font-bold">Artist_{i}</span>
              <span className="text-[10px] text-slate-400">12k Sueños</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Community;
