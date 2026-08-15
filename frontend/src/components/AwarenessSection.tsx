import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, TrendingDown, BrainCircuit } from 'lucide-react';

const REASONS = [
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Creates Division",
    description: "Misinformation is often designed to spark outrage, polarizing communities and destroying constructive dialogue."
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
    title: "Real-World Harm",
    description: "False medical claims or fabricated emergency alerts can lead to dangerous situations and loss of life."
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
    title: "Manipulates Opinions",
    description: "Coordinated fake news campaigns are used to unfairly influence elections, markets, and public policies."
  },
  {
    icon: <TrendingDown className="w-6 h-6 text-orange-400" />,
    title: "Erodes Trust",
    description: "When fiction blends with fact, people lose trust in legitimate journalism, science, and democratic institutions."
  }
];

export const AwarenessSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 w-full pt-16 pb-20 relative z-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why You Should Avoid Fake News</h2>
        <p className="text-gray-400 text-lg">
          Misinformation spreads 6 times faster than the truth. Understanding the impact of fabricated stories is the first step in stopping them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REASONS.map((reason, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              {reason.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {reason.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
