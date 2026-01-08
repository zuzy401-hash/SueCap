
import React from 'react';
import { PRICING_PLANS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Escoge tu Nivel de Creación</h2>
        <p className="text-slate-400 text-lg">Impulsa tu creatividad con herramientas de nivel profesional sin límites.</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/20 animate-pulse text-sm font-bold">
            <i className="fa-solid fa-fire mr-2"></i>
            ¡DESCUENTO DE LANZAMIENTO TERMINA EN 02:45:10!
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative glass rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-2 border-2 ${plan.color} ${plan.recommended ? 'scale-105 z-10' : ''}`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-600/50">
                Más Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-1 uppercase tracking-wider">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-slate-500 text-sm">/mes</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
              plan.recommended 
                ? 'bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-900/40 text-white' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}>
              {plan.id === 'free' ? 'Plan Actual' : 'Seleccionar Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Proof / Trust */}
      <div className="text-center opacity-50 space-y-4">
        <p className="text-xs uppercase tracking-widest">Aceptamos</p>
        <div className="flex justify-center gap-6 text-2xl grayscale">
          <i className="fa-brands fa-cc-visa"></i>
          <i className="fa-brands fa-cc-mastercard"></i>
          <i className="fa-brands fa-cc-paypal"></i>
          <i className="fa-brands fa-cc-apple-pay"></i>
          <i className="fa-brands fa-cc-google-pay"></i>
        </div>
        <p className="text-[10px]">Tus pagos están protegidos con encriptación SSL de 256 bits.</p>
      </div>

      {/* Terms and Conditions mini-link */}
      <div className="text-center pt-10">
        <p className="text-[10px] text-slate-600 max-w-xl mx-auto">
          Al suscribirte, aceptas nuestros Términos de Servicio y Política de Privacidad. Puedes cancelar en cualquier momento. El plan "Edición Ilimitada" está sujeto a una política de uso justo.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
