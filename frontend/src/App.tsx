import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewsAnalyzer } from './components/NewsAnalyzer';
import { ResultDashboard } from './components/ResultDashboard';
import { AnalysisHistory } from './components/AnalysisHistory';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { MiniGame } from './components/MiniGame';
import { SourceSection } from './components/SourceSection';
import { AwarenessSection } from './components/AwarenessSection';
import { analyzeNews } from './services/api';
import { AnalysisRequest, AnalysisResponse, HistoryItem } from './types/analysis';
import { AlertCircle, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originalText, setOriginalText] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleAnalyze = async (request: AnalysisRequest) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    
    // Save original text if it's text or url
    if (request.type === 'text' || request.type === 'url') {
      setOriginalText(request.content || '');
    } else {
      setOriginalText('Image uploaded for analysis');
    }
    
    try {
      const data = await analyzeNews(request);
      setResult(data);
      saveToHistory(request.content || 'Image Upload', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsAnalyzing(false);
      
      // Scroll to results if successful or error
      setTimeout(() => {
        const analyzerElement = document.getElementById('analyzer');
        if (analyzerElement) {
          analyzerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const saveToHistory = (text: string, data: AnalysisResponse) => {
    try {
      const existing = localStorage.getItem('truthscan_history');
      let history: HistoryItem[] = existing ? JSON.parse(existing) : [];
      
      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        news_text: text,
        short_text: text.length > 80 ? text.substring(0, 80) + '...' : text,
        ...data
      };
      
      history = [newItem, ...history].slice(0, 20); // Keep last 20
      localStorage.setItem('truthscan_history', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history");
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setResult({
      status: item.status || 'success',
      input_type: item.input_type || 'text',
      result: item.result || (item.verdict as any) || 'ERROR',
      confidence: item.confidence || 0,
      title: item.title || null,
      source: item.source || null,
      published_date: item.published_date || null,
      extracted_text: item.extracted_text || item.news_text,
      claims: item.claims || [],
      explanation: item.explanation || '',
      evidence: item.evidence || [],
      sources_checked: item.sources_checked || item.sources || [],
      verdict: item.verdict,
      misleading_elements: item.misleading_elements,
      fact_checking: item.fact_checking,
      sources: item.sources
    });
    setOriginalText(item.news_text);
    setTimeout(() => {
      const analyzerElement = document.getElementById('analyzer');
      if (analyzerElement) {
        analyzerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
    setOriginalText('');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navbar History button trigger */}
      <div className="fixed top-3 right-4 z-50 md:hidden">
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="p-2 rounded-lg bg-surface border border-white/10 text-white"
        >
          <History className="w-5 h-5" />
        </button>
      </div>

      <Navbar />
      
      <main className="relative z-10 pb-20">
        <Hero />
        
        <AwarenessSection />
        
        <div className={`mx-auto px-4 w-full transition-all duration-500 ${result && !isAnalyzing ? 'max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start' : 'max-w-4xl flex flex-col items-center'}`}>
          
          <div className={`w-full transition-all duration-500 ${result && !isAnalyzing ? 'lg:col-span-5 sticky top-24' : ''}`}>
            <NewsAnalyzer 
              onAnalyze={handleAnalyze} 
              isAnalyzing={isAnalyzing} 
              onClear={handleClear}
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`w-full mt-6 ${result && !isAnalyzing ? 'lg:col-span-12' : ''}`}
              >
                <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-danger font-bold text-sm">Analysis Failed</h4>
                    <p className="text-danger/80 text-sm">{error}</p>
                    <button 
                      onClick={() => handleAnalyze({ news_text: originalText })}
                      className="mt-2 text-xs bg-danger/20 text-danger hover:bg-danger/30 px-3 py-1.5 rounded transition-colors"
                    >
                      Retry Analysis
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {result && !isAnalyzing && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 w-full h-full"
              >
                <ResultDashboard result={result} originalText={originalText} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="max-w-4xl mx-auto px-4 w-full flex justify-center mt-8">
           <button 
             onClick={() => setIsHistoryOpen(true)}
             className="md:hidden glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-gray-300"
           >
             View History
           </button>
        </div>

        <div className="mt-32">
          <HowItWorks />
        </div>
        
        <div className="mt-16">
          <MiniGame />
        </div>

        <div className="mt-16">
          <SourceSection />
        </div>
        
        <div className="mt-16">
          <About />
        </div>
      </main>

      <AnalysisHistory 
        isOpen={isHistoryOpen} 
        setIsOpen={setIsHistoryOpen} 
        onSelectHistory={handleSelectHistory} 
      />

      {/* Override Navbar's History link to open sidebar */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const historyLinks = document.querySelectorAll('a[href="#history"]');
            historyLinks.forEach(link => {
              link.addEventListener('click', (e) => {
                e.preventDefault();
                // This is a bit hacky but works for the global nav link
                const btn = document.querySelector('button[title="History"]');
                if(btn) btn.click();
              });
            });
          });
        `
      }} />
    </div>
  );
}

export default App;
