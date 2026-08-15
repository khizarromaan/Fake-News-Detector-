import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Layout, Database, Code, Zap } from 'lucide-react';

export function SourceSection() {
  const stack = [
    { name: 'React', icon: <Layout className="w-6 h-6" />, desc: 'Frontend Framework' },
    { name: 'Tailwind CSS', icon: <Zap className="w-6 h-6" />, desc: 'Styling' },
    { name: 'Framer Motion', icon: <Code className="w-6 h-6" />, desc: 'Animations' },
    { name: 'Python (FastAPI)', icon: <Server className="w-6 h-6" />, desc: 'Backend API' },
    { name: 'Groq API', icon: <Database className="w-6 h-6" />, desc: 'LLM Inference' }
  ];

  return (
    <section id="source" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Source</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              TruthScan is built with modern, high-performance technologies. Explore our tech stack and check out the code.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stack.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-200">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl border border-white/10 text-center relative overflow-hidden group max-w-3xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">View on GitHub</h3>
            <p className="text-gray-400 mb-8 max-w-lg">
              Want to contribute or see how it works under the hood? TruthScan is open source and available on GitHub.
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              Source Code
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
