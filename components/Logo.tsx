
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-16 h-16';
  const fontSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl';

  return (
    <div className="flex items-center gap-3 group">
      <div className={`${dimensions} relative flex items-center justify-center`}>
        {/* Glow Background */}
        <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg group-hover:bg-purple-500/40 transition-all duration-500"></div>
        
        {/* SVG Icon */}
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 filter drop-shadow-lg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          {/* Main Aperture/Eye Shape */}
          <path 
            d="M50 20 C30 20 15 35 15 50 C15 65 30 80 50 80 C70 80 85 65 85 50 C85 35 70 20 50 20 Z" 
            fill="none" 
            stroke="url(#logoGradient)" 
            strokeWidth="8"
            className="group-hover:stroke-purple-400 transition-all duration-300"
          />
          {/* Inner Dream Cloud */}
          <path 
            d="M40 50 C40 45 45 42 50 42 C55 42 58 45 58 50 C58 55 53 58 50 58 C47 58 40 55 40 50" 
            fill="url(#logoGradient)"
            className="animate-pulse"
          />
          {/* Sparkles */}
          <circle cx="75" cy="25" r="4" fill="#fbbf24" className="animate-bounce" />
          <circle cx="20" cy="70" r="3" fill="#fbbf24" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${fontSize} font-black italic tracking-tighter bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-pink-400 transition-all`}>
          SUECAP
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-slate-500 group-hover:text-slate-300 transition-colors">
          Sueños Capturados
        </span>
      </div>
    </div>
  );
};

export default Logo;
