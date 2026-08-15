import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ListChecks } from 'lucide-react';
import { AnalysisClaim } from '../types/analysis';

interface ClaimBreakdownProps {
  claims: AnalysisClaim[];
}

export const ClaimBreakdown: React.FC<ClaimBreakdownProps> = ({ claims }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!claims || claims.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
          <ListChecks className="w-5 h-5 text-gray-300" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Claim Breakdown</h3>
          <p className="text-xs text-gray-400">Individual claims assessed by the AI</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
        {claims.map((claim, idx) => (
          <div key={idx} className="border border-white/5 rounded-xl bg-black/20 overflow-hidden">
            <button
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              className="w-full text-left p-4 flex items-start gap-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs font-mono text-gray-400">
                {idx + 1}
              </div>
              <div className="flex-1 text-sm font-medium text-gray-200 mt-0.5 leading-relaxed">
                "{claim.claim}"
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${expandedIndex === idx ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <AnimatePresence>
              {expandedIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-white/5 bg-black/40 space-y-4">
                    <div className="mt-4">
                      <span className="text-[10px] font-bold tracking-wider text-accent uppercase mb-1 block">AI Assessment</span>
                      <p className="text-sm text-gray-300">{claim.assessment}</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase mb-1 block">Reasoning</span>
                      <p className="text-sm text-gray-400 leading-relaxed">{claim.reasoning}</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase mb-1 block">Verification</span>
                      <p className="text-sm text-gray-400 leading-relaxed">{claim.verification}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
