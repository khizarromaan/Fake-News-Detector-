import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Wand2, BrainCircuit, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'INPUT',
    desc: 'User submits news content or a claim.',
    icon: <FileText className="w-6 h-6 text-accent" />
  },
  {
    num: '02',
    title: 'PREPROCESS',
    desc: 'Text is cleaned and prepared for analysis.',
    icon: <Wand2 className="w-6 h-6 text-accent" />
  },
  {
    num: '03',
    title: 'AI ANALYSIS',
    desc: 'The content is analyzed by the LLaMA model.',
    icon: <BrainCircuit className="w-6 h-6 text-accent" />
  },
  {
    num: '04',
    title: 'VERIFICATION',
    desc: 'System returns a verdict, explanation, and fact-checking.',
    icon: <ShieldCheck className="w-6 h-6 text-accent" />
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative max-w-6xl mx-auto px-4 z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How TruthScan Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Our multi-stage verification pipeline uses advanced large language models to dissect, analyze, and verify claims in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent z-0" />

        {STEPS.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 relative group border border-accent/20">
              <div className="absolute inset-0 bg-accent/5 rounded-full group-hover:bg-accent/20 transition-colors" />
              {step.icon}
              <div className="absolute -top-3 -right-3 text-sm font-black text-white/20 text-4xl">{step.num}</div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{step.title}</h3>
            <p className="text-sm text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
