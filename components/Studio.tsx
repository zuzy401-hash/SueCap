
import React, { useState, useRef, useEffect } from 'react';
import { GenerationType, AnimationStyle } from '../types';
import { ANIMATION_STYLES } from '../constants';
import { generateImage, generateVideo, generateTTS, decodeBase64Audio, checkVeoKey, openVeoKeyDialog } from '../services/geminiService';

const Studio: React.FC = () => {
  const [type, setType] = useState<GenerationType>(GenerationType.IMAGE);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<AnimationStyle>(ANIMATION_STYLES[0]);
  const [videoAspect, setVideoAspect] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);

  // Dynamic Limits
  const PROMPT_LIMIT = type === GenerationType.VIDEO ? 500 : 1000;

  const loadingSteps = [
    "Interpretando el sueño...",
    "Configurando física de partículas...",
    "Analizando coherencia temporal...",
    "Renderizando texturas de alta fidelidad...",
    "Finalizando obra maestra..."
  ];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingSteps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (msg: string) => {
    setNotification(msg);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.length > PROMPT_LIMIT) return;
    
    setIsGenerating(true);
    setResult(null);
    setError(null);

    try {
      if (type === GenerationType.IMAGE) {
        const imageUrl = await generateImage(prompt, selectedStyle.promptModifier);
        setResult(imageUrl);
      } else if (type === GenerationType.VIDEO) {
        const hasKey = await checkVeoKey();
        if (!hasKey) {
          await openVeoKeyDialog();
        }
        const videoUrl = await generateVideo(`${prompt}. Style: ${selectedStyle.promptModifier}`, videoAspect);
        setResult(videoUrl);
      } else if (type === GenerationType.TTS) {
        const base64Audio = await generateTTS(prompt);
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const buffer = await decodeBase64Audio(base64Audio, audioContextRef.current);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.start();
        setResult('Audio generado y reproduciéndose...');
      }
      showNotification(`¡${type.toUpperCase()} capturado con éxito!`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al generar contenido');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    showNotification("Guardado en tu galería privada");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://suecap.ai/share/${Math.random().toString(36).substr(2, 9)}`);
    showNotification("Enlace de compartido copiado");
  };

  const isInvalid = prompt.trim().length === 0 || prompt.length > PROMPT_LIMIT;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative pb-20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-10 z-[100] animate-bounce-in">
          <div className="bg-slate-900 text-blue-400 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-blue-500/30 backdrop-blur-xl">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <i className="fa-solid fa-check text-xs"></i>
            </div>
            <span className="font-black text-xs uppercase tracking-widest">{notification}</span>
          </div>
        </div>
      )}

      {/* Controls Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="glass p-8 rounded-[2.5rem] border-slate-800 shadow-2xl">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-wand-magic-sparkles text-sm text-white"></i>
            </div>
            Configurar Sueño
          </h3>
          
          <div className="flex bg-slate-950 p-1.5 rounded-2xl mb-8 border border-slate-800">
            {(Object.values(GenerationType)).map((t) => (
              <button 
                key={t}
                onClick={() => { setType(t as GenerationType); setPrompt(prompt.substring(0, t === GenerationType.VIDEO ? 500 : 1000)); }}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${type === t ? 'bg-blue-600 text-white shadow-xl' : 'hover:bg-slate-900 text-slate-500'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Formato para Video */}
          {type === GenerationType.VIDEO && (
            <div className="mb-8 animate-fade-in">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Relación de Aspecto</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setVideoAspect('16:9')}
                  className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${videoAspect === '16:9' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}
                >
                  <i className="fa-solid fa-tv text-sm"></i>
                  <span className="text-xs font-bold">16:9 (Horizontal)</span>
                </button>
                <button 
                  onClick={() => setVideoAspect('9:16')}
                  className={`py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${videoAspect === '9:16' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}
                >
                  <i className="fa-solid fa-mobile-screen text-sm"></i>
                  <span className="text-xs font-bold">9:16 (Vertical)</span>
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prompt del {type}</label>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${prompt.length > PROMPT_LIMIT ? 'bg-red-500/20 text-red-500' : 'bg-slate-950 text-slate-400'}`}>
                {prompt.length}/{PROMPT_LIMIT}
              </span>
            </div>
            <div className="relative">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`w-full bg-slate-950 border ${prompt.length > PROMPT_LIMIT ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-800'} rounded-3xl p-5 text-slate-100 focus:ring-2 ring-blue-500 outline-none transition-all h-44 resize-none shadow-2xl placeholder:text-slate-700`}
                placeholder={type === GenerationType.VIDEO ? "Describe el movimiento y la escena (max 500 carac.)..." : "Describe tu sueño con detalles (max 1000 carac.)..."}
              />
              {prompt.length > PROMPT_LIMIT && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 backdrop-blur-md border border-red-500/20 p-2 rounded-xl">
                  <p className="text-red-500 text-[9px] font-black uppercase text-center">
                    Límite para {type === GenerationType.VIDEO ? 'video' : 'contenido'} excedido
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Estilo de Arte</label>
            <div className="grid grid-cols-2 gap-3">
              {ANIMATION_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${
                    selectedStyle.id === style.id 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400 scale-[1.02] shadow-lg shadow-blue-500/5' 
                      : 'border-slate-800 bg-slate-950 text-slate-600 hover:border-slate-700'
                  }`}
                >
                  <i className={`fa-solid ${style.icon} mb-2 text-xl`}></i>
                  <span className="text-[10px] font-black uppercase tracking-tighter">{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || isInvalid}
            className={`w-full mt-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
              isGenerating || isInvalid 
                ? 'bg-slate-900 cursor-not-allowed text-slate-700 border border-slate-800' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.02] text-white active:scale-95'
            }`}
          >
            {isGenerating ? (
              <><i className="fa-solid fa-circle-notch animate-spin"></i> Procesando Sueño</>
            ) : (
              <><i className="fa-solid fa-sparkles"></i> Materializar</>
            )}
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-2">
        <div className="glass h-full rounded-[3rem] p-4 flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden border border-slate-800 shadow-inner">
          
          {/* Generation Loader */}
          {isGenerating && (
            <div className="text-center space-y-10 max-w-md animate-fade-in p-10">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className={`fa-solid ${type === GenerationType.VIDEO ? 'fa-video' : type === GenerationType.IMAGE ? 'fa-image' : 'fa-microphone'} text-5xl text-blue-500`}></i>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-2xl font-black italic tracking-tighter text-blue-400">{loadingSteps[loadingStep]}</h4>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Generando {type} • Calidad 4K • Estilo {selectedStyle.name}</p>
              </div>
              <div className="h-1.5 w-64 mx-auto bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-full animate-loading-bar"></div>
              </div>
            </div>
          )}

          {/* Result Area */}
          {!isGenerating && result && (
            <div className="w-full h-full flex flex-col animate-fade-in p-6">
              <div className="flex-1 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-950 flex items-center justify-center border border-slate-800 group relative">
                {type === GenerationType.IMAGE && (
                  <img src={result} className="max-w-full max-h-[500px] object-contain transition-transform duration-700 group-hover:scale-105" alt="Dream Result" />
                )}
                {type === GenerationType.VIDEO && (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                     <video src={result} controls autoPlay loop className="max-w-full max-h-full shadow-2xl" />
                  </div>
                )}
                {type === GenerationType.TTS && (
                  <div className="text-center p-16 bg-gradient-to-b from-slate-900 to-slate-950 rounded-[3rem] border border-slate-800 shadow-2xl">
                    <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
                      <i className="fa-solid fa-waveform-lines text-5xl text-blue-400"></i>
                    </div>
                    <h5 className="text-2xl font-black mb-4 tracking-tighter">Audio Capturado</h5>
                    <p className="text-slate-500 text-sm italic mb-10 max-w-sm mx-auto">"{prompt}"</p>
                    <button onClick={handleGenerate} className="bg-blue-600 text-white px-10 py-4 rounded-2xl hover:bg-blue-700 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/40">
                      <i className="fa-solid fa-play mr-2"></i> Reproducir de nuevo
                    </button>
                  </div>
                )}
                
                <div className="absolute top-6 left-6 flex items-center gap-3">
                   <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                     <i className="fa-solid fa-circle text-[6px] animate-pulse"></i>
                     Procesado con SUECAP AI
                   </div>
                </div>
              </div>

              {/* Enhanced Action Bar */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-4">
                  <button 
                    onClick={handleSave}
                    className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-50 transition-all active:scale-95 shadow-xl"
                  >
                    <i className="fa-solid fa-bookmark"></i>
                    Guardar Sueño
                  </button>
                  <button 
                    onClick={handleShare}
                    className="bg-slate-900 text-slate-100 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 border border-slate-700 hover:bg-slate-800 transition-all active:scale-95"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    Compartir
                  </button>
                </div>
                
                <div className="flex items-center gap-8">
                  <button className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <i className="fa-solid fa-layer-group"></i>
                    Variaciones
                  </button>
                  <div className="w-px h-4 bg-slate-800"></div>
                  <button 
                    onClick={() => {setResult(null); setPrompt('');}}
                    className="text-slate-500 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-widest"
                  >
                    Nuevo Lienzo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isGenerating && !result && !error && (
            <div className="text-center space-y-8 animate-fade-in max-w-sm">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="w-40 h-40 border-2 border-dashed border-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto relative z-10 group-hover:border-blue-500/50 transition-all duration-500 group-hover:rotate-6">
                  <i className={`fa-solid ${type === GenerationType.VIDEO ? 'fa-clapperboard' : 'fa-wand-magic'} text-7xl text-slate-800 group-hover:text-blue-500/30`}></i>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-[0.2em] text-slate-700">Esperando tu Visión</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 uppercase tracking-widest">Describe tu sueño en el panel izquierdo para comenzar la captura neuronal.</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center space-y-8 max-w-md animate-shake p-10 bg-red-500/5 rounded-[3rem] border border-red-500/10">
              <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20 shadow-lg shadow-red-500/5">
                <i className="fa-solid fa-bolt-lightning text-4xl text-red-500"></i>
              </div>
              <div>
                <h4 className="font-black text-2xl mb-2 text-red-500 uppercase italic">Error en la Red Neuronal</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{error}</p>
              </div>
              <button onClick={handleGenerate} className="bg-red-500 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-2xl shadow-red-900/40 active:scale-95">
                Reintentar Captura
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.9) translateY(-20px); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Studio;
