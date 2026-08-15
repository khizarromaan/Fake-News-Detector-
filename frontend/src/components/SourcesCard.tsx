import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

interface SourcesCardProps {
  sources: string[];
}

export const SourcesCard: React.FC<SourcesCardProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-panel rounded-2xl p-6 md:col-span-2"
    >
      <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
        <Link2 className="w-5 h-5 text-accentSecondary" />
        Sources & References
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-300 p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-accentSecondary mt-0.5">•</span>
            {(() => {
              const urlRegex = /(https?:\/\/[^\s]+)/g;
              const parts = source.split(urlRegex);
              return (
                <div className="break-words">
                  {parts.map((part, i) => 
                    part.match(urlRegex) ? (
                      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white hover:underline transition-colors">
                        {part}
                      </a>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
              );
            })()}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
