import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, X, Clock, ChevronRight, Trash2 } from 'lucide-react';
import { HistoryItem } from '../types/analysis';

interface AnalysisHistoryProps {
  onSelectHistory: (item: HistoryItem) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ onSelectHistory, isOpen, setIsOpen }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const stored = localStorage.getItem('truthscan_history');
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse history');
        }
      }
    };
    loadHistory();
    // In a real app we might want to listen to a custom event if history updates from another component
  }, [isOpen]); // Reload when opened

  const clearHistory = () => {
    localStorage.removeItem('truthscan_history');
    setHistory([]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full md:w-96 glass-panel border-l border-white/10 z-50 flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-accent" />
            Recent Analyses
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No recent analyses found.</p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectHistory(item);
                  setIsOpen(false);
                }}
                className="w-full text-left p-4 rounded-xl glass-button flex flex-col gap-2 group"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    item.verdict === 'LIKELY REAL' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                  }`}>
                    {item.verdict}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                  {item.short_text || item.news_text.substring(0, 80) + '...'}
                </p>
                <div className="flex items-center text-accent text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  View Results <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </button>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="p-4 border-t border-white/10">
            <button
              onClick={clearHistory}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-danger hover:bg-danger/10 rounded-lg transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};
