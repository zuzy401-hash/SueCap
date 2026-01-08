
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
             <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <i className="fa-solid fa-user text-5xl text-slate-700"></i>
             </div>
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-600 w-10 h-10 rounded-full border-4 border-slate-950 flex items-center justify-center text-xs">
            <i className="fa-solid fa-camera"></i>
          </button>
        </div>
        <div>
          <h2 className="text-3xl font-bold">Dreamer Alpha</h2>
          <p className="text-slate-400">Miembro desde Octubre 2024</p>
          <div className="flex gap-2 mt-4">
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Plan Pro</span>
            <span className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">Verificado</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Información Personal</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Nombre Completo</label>
              <input type="text" defaultValue="Alex Thompson" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:ring-1 ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Email</label>
              <input type="email" defaultValue="alex@dreamer.ai" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:ring-1 ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Idioma</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:ring-1 ring-blue-500">
                <option>Español</option>
                <option>English</option>
                <option>Português</option>
              </select>
            </div>
          </div>
          <button className="mt-8 bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-xl font-bold transition-all">Guardar Cambios</button>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Seguridad y Pago</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-4">
                <i className="fa-brands fa-cc-visa text-2xl"></i>
                <div>
                  <p className="text-sm font-bold">Visa terminada en 4421</p>
                  <p className="text-[10px] text-slate-400">Expira 12/26</p>
                </div>
              </div>
              <button className="text-xs text-blue-400 hover:underline">Editar</button>
            </div>

            <div className="space-y-3">
              <button className="w-full flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-sm hover:bg-slate-700 transition-all">
                <span>Cambiar Contraseña</span>
                <i className="fa-solid fa-chevron-right text-slate-500"></i>
              </button>
              <button className="w-full flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-sm hover:bg-slate-700 transition-all">
                <span>Autenticación de 2 Factores</span>
                <span className="text-xs text-green-500 font-bold">Activo</span>
              </button>
              <button className="w-full flex justify-between items-center p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition-all">
                <span>Cerrar Sesión en todos los dispositivos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl border-red-900/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Zona de Peligro</h3>
        <p className="text-sm text-slate-400 mb-6">Eliminar tu cuenta es irreversible. Se borrarán todos tus sueños generados, plantillas y créditos restantes.</p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all">Eliminar Cuenta</button>
      </div>
    </div>
  );
};

export default Profile;
