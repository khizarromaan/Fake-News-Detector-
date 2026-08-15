import React from 'react';
import { motion } from 'framer-motion';
import { Bot, FileCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ExplanationCardProps {
  explanation: string;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ explanation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel rounded-2xl p-6"
    >
      <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
        <Bot className="w-5 h-5 text-accent" />
        AI Explanation
      </h3>
      <div className="prose prose-invert max-w-none text-gray-300">
        <ReactMarkdown>{explanation}</ReactMarkdown>
      </div>
    </motion.div>
  );
};
