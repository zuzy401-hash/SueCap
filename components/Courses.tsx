
import React from 'react';

const Courses: React.FC = () => {
  const tutorials = [
    { title: 'Mastering Veo 3.1: Video Cinematográfico', level: 'Intermedio', time: '45 min', img: 'https://picsum.photos/600/400?art=1' },
    { title: 'Estilo Lana y Fieltro: Texturas Realistas', level: 'Básico', time: '20 min', img: 'https://picsum.photos/600/400?art=2' },
    { title: 'IA para Redes Sociales: Reels de Impacto', level: 'Avanzado', time: '1h 15 min', img: 'https://picsum.photos/600/400?art=3' },
    { title: 'Prompt Engineering: Habla con la IA', level: 'Básico', time: '30 min', img: 'https://picsum.photos/600/400?art=4' },
  ];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-2">Academia SUECAP</h2>
        <p className="text-slate-400 mb-8">Domina el arte de capturar sueños con nuestros cursos guiados por expertos.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tutorials.map((course, idx) => (
            <div key={idx} className="glass group rounded-3xl overflow-hidden flex flex-col md:flex-row border-slate-800 hover:border-blue-500/50 transition-all">
              <div className="md:w-2/5 relative overflow-hidden">
                <img src={course.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={course.title} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase font-bold">{course.level}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">
                      <i className="fa-regular fa-clock mr-1"></i> {course.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors">{course.title}</h3>
                </div>
                <button className="mt-6 flex items-center gap-2 text-sm font-bold text-slate-200 hover:text-white">
                  Empezar ahora <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant Guide */}
      <section className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/3 text-center">
          <div className="relative inline-block">
            <div className="w-40 h-40 bg-indigo-500/20 rounded-full flex items-center justify-center animate-pulse">
              <i className="fa-solid fa-robot text-7xl text-indigo-400"></i>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-900"></div>
          </div>
          <h4 className="text-xl font-bold mt-4">SUECAP AI Assistant</h4>
          <p className="text-sm text-green-400">Online & Ready</p>
        </div>
        <div className="md:w-2/3 space-y-4">
          <h3 className="text-2xl font-bold">¿Necesitas ayuda con tu próximo sueño?</h3>
          <p className="text-slate-300">Nuestra IA puede ayudarte a redactar prompts, sugerir estilos de animación basados en tu idea o incluso generar guiones completos para tus videos.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-xs transition-all">"Dame una idea para estilo Arcilla"</button>
            <button className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-xs transition-all">"Mejora mi prompt de ciencia ficción"</button>
            <button className="bg-slate-900/80 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-xs transition-all">"¿Cómo animar lana?"</button>
          </div>
          <div className="relative mt-6">
            <input 
              type="text" 
              placeholder="Pregunta cualquier cosa a la IA..." 
              className="w-full bg-slate-950 border border-indigo-500/30 rounded-xl px-6 py-4 pr-16 text-slate-100 focus:ring-2 ring-indigo-500 outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 p-2 rounded-lg">
              <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
