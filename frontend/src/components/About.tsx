import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative max-w-4xl mx-auto px-4 z-10">
      <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center md:justify-start gap-3">
          <Info className="w-8 h-8 text-accent" />
          About TruthScan AI
        </h2>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          TruthScan AI is an AI-powered news verification interface designed to help users identify potentially misleading information and understand why a claim may be unreliable. By combining natural language processing, entity extraction, and automated reasoning, our platform cross-references claims against known patterns of misinformation.
        </p>

        <div className="bg-warning/10 border border-warning/20 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <ShieldAlert className="w-8 h-8 text-warning shrink-0" />
          <div>
            <h4 className="text-warning font-bold mb-1 text-left">Disclaimer</h4>
            <p className="text-sm text-warning/80 text-left leading-relaxed">
              AI-generated verdicts should be treated as an aid to verification, not absolute proof. The system may occasionally produce inaccurate or hallucinated explanations. Always verify critical information with multiple trusted sources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
