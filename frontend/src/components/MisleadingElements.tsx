import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface MisleadingElementsProps {
  elements: string[];
}

export const MisleadingElements: React.FC<MisleadingElementsProps> = ({ elements }) => {
  if (!elements || elements.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel rounded-2xl p-6"
    >
      <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
        <AlertTriangle className="w-5 h-5 text-warning" />
        Detected Misleading Elements
      </h3>
      <div className="flex flex-wrap gap-3">
        {elements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-lg text-warning text-sm font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
            {element}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
