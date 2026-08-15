import React from 'react';
import { ShieldCheck, History, Info, Activity, Gamepad2, Code2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-t-0 border-x-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20 text-accent">
              <ShieldCheck className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 bg-accent/30 blur-md rounded-lg"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
              TRUTHSCAN <span className="text-accent font-black">AI</span>
            </span>
          </div>
          
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-6">
              <a href="#analyzer" className="text-gray-300 hover:text-white hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2">
                <Activity className="w-4 h-4" /> Analyzer
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all">
                How It Works
              </a>
              <a href="#games" className="text-gray-300 hover:text-white hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" /> Games
              </a>
              <a href="#source" className="text-gray-300 hover:text-white hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Source
              </a>
              <a href="#history" className="text-gray-300 hover:text-white hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2">
                <History className="w-4 h-4" /> History
              </a>
              <a href="#about" className="text-gray-300 hover:text-white hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2">
                <Info className="w-4 h-4" /> About
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
