import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, HelpCircle } from 'lucide-react';
import { AnalysisResponse } from '../types/analysis';

interface VerdictCardProps {
  result: AnalysisResponse['result'];
  confidence: number;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ result, confidence }) => {
  const isReal = result === 'Likely True' || result.includes('REAL');
  const isFake = result === 'Likely Fake' || result.includes('FAKE');
  const needsVerification = result === 'Needs Verification';
  
  let colorClass = 'text-gray-400';
  let borderClass = 'border-gray-500/30';
  let shadowClass = '';
  let Icon = HelpCircle;
  let description = "The AI was unable to determine the veracity of this content with high confidence.";

  if (isReal) {
    colorClass = 'text-success';
    borderClass = 'border-success/30';
    shadowClass = 'shadow-[0_0_30px_rgba(16,185,129,0.15)]';
    Icon = ShieldCheck;
    description = "The available evidence supports the claims. This content appears factually accurate.";
  } else if (isFake) {
    colorClass = 'text-danger';
    borderClass = 'border-danger/30';
    shadowClass = 'shadow-[0_0_30px_rgba(239,68,68,0.15)]';
    Icon = ShieldAlert;
    description = "The available evidence strongly contradicts the claims or indicates the story is fabricated/misleading.";
  } else if (needsVerification) {
    colorClass = 'text-yellow-500';
    borderClass = 'border-yellow-500/30';
    shadowClass = 'shadow-[0_0_30px_rgba(234,179,8,0.15)]';
    Icon = HelpCircle;
    description = "There is not enough reliable evidence to confidently determine whether the story is true or fake.";
  }
  
  // Calculate stroke dasharray for the confidence circle (max 377)
  const strokeValue = (confidence / 100) * 377;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 border-2 ${borderClass} ${shadowClass}`}
    >
      <div className="relative">
        {/* Ring indicator */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            initial={{ strokeDasharray: "0 1000" }}
            animate={{ strokeDasharray: `${strokeValue} 1000` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            className={colorClass}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-8 h-8 ${colorClass} mb-1`} />
          <span className={`text-sm font-bold ${colorClass}`}>{confidence}%</span>
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <h3 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">AI Result</h3>
        <h2 className={`text-4xl md:text-5xl font-black mb-4 ${colorClass}`}>
          {result}
        </h2>
        <p className="text-gray-300 text-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
