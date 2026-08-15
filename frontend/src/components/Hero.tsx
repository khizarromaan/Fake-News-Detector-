import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accentSecondary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[80px]" />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-accent/30 text-accent text-sm font-medium tracking-wide"
        >
          <Cpu className="w-4 h-4" />
          Powered by Llama-3.3-70b
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">Detect. Verify.</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accentSecondary text-glow">Understand.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AI-powered news credibility analysis and automated fact-checking. Paste an article, headline, or claim and let TruthScan investigate it.
        </motion.p>
      </div>
    </section>
  );
};
