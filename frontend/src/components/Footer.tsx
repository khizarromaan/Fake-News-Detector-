import { FC } from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: FC = () => {
  return (
    <footer className="relative mt-24 py-12 border-t border-white/10 bg-black/20 overflow-hidden">
      {/* Subtle background watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[15rem] font-black tracking-tighter uppercase whitespace-nowrap">Mindx</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent to-accentSecondary mb-2">
              Mindx
            </h2>
            <p className="text-gray-400 font-medium tracking-wide">Fake News Detector</p>
          </div>
          
          <a
            href="https://github.com/khizarromaan/Fake-News-Detector-?utm_source=chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg glass-button text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium border border-white/10"
          >
            <ExternalLink className="w-5 h-5" />
            <span>GitHub Repository</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-accent mb-3 font-bold">Lead Developers</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 font-medium">Khizar Romaan</li>
              <li className="text-gray-300 font-medium">Puneet Nagwani</li>
            </ul>
          </div>
          
          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-accent mb-3 font-bold">Researcher</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 font-medium">Krishna Bhiogade</li>
            </ul>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-accent mb-3 font-bold">ML Engineer</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 font-medium">Aryan Chopade</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mindx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
