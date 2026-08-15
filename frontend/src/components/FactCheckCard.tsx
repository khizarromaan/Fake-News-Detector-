import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface FactCheckCardProps {
  factChecking: string;
}

export const FactCheckCard: React.FC<FactCheckCardProps> = ({ factChecking }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel rounded-2xl p-6 border-l-4 border-accent"
    >
      <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
        <FileCheck className="w-5 h-5 text-accent" />
        Fact-Checking Verification
      </h3>
      <div className="prose prose-invert max-w-none text-gray-300">
        <ReactMarkdown>{factChecking}</ReactMarkdown>
      </div>
    </motion.div>
  );
};
