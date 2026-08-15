import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, FileText, Image as ImageIcon, Link2, UploadCloud, AlertCircle } from 'lucide-react';
import { AnalysisRequest } from '../types/analysis';

interface NewsAnalyzerProps {
  onAnalyze: (request: AnalysisRequest) => Promise<void>;
  isAnalyzing: boolean;
  onClear: () => void;
}

type TabType = 'text' | 'image' | 'url';

const STAGES: Record<TabType, string[]> = {
  text: [
    "Reading news content...",
    "Analyzing linguistic patterns...",
    "Fact-checking claims...",
    "Generating explanation..."
  ],
  url: [
    "Validating URL...",
    "Safely retrieving webpage...",
    "Extracting article text...",
    "Analyzing claims...",
    "Verifying information..."
  ],
  image: [
    "Processing image...",
    "Running OCR extraction...",
    "Parsing extracted text...",
    "Checking claims against evidence...",
    "Preparing results..."
  ]
};

export const NewsAnalyzer: React.FC<NewsAnalyzerProps> = ({ onAnalyze, isAnalyzing, onClear }) => {
  const [activeTab, setActiveTab] = useState<TabType>('text');
  
  // State for Text
  const [text, setText] = useState('');
  
  // State for URL
  const [url, setUrl] = useState('');
  
  // State for Image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAnalyzing) {
      setStageIndex(0);
      interval = setInterval(() => {
        setStageIndex((prev) => (prev < STAGES[activeTab].length - 1 ? prev + 1 : prev));
      }, 900);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnalyzing, activeTab]);

  const handleAnalyze = () => {
    if (activeTab === 'text' && text.trim()) {
      onAnalyze({ type: 'text', content: text });
    } else if (activeTab === 'url' && url.trim()) {
      onAnalyze({ type: 'url', content: url });
    } else if (activeTab === 'image' && imageFile) {
      onAnalyze({ type: 'image', file: imageFile });
    }
  };

  const handleClear = () => {
    setText('');
    setUrl('');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClear();
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
  };

  const isAnalyzeDisabled = isAnalyzing || 
    (activeTab === 'text' && !text.trim()) || 
    (activeTab === 'url' && !url.trim()) || 
    (activeTab === 'image' && !imageFile);

  return (
    <section id="analyzer" className="relative w-full z-20">
      <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden h-full flex flex-col">
        
        {/* Scanning Animation Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              className="absolute inset-0 z-30 bg-surfaceHighlight/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_20px_#00F0FF] animate-scan" />
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative flex items-center justify-center w-24 h-24 mb-6"
              >
                <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-accentSecondary/20 border-b-accentSecondary animate-spin-reverse" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
                <Zap className="w-8 h-8 text-accent animate-pulse" />
              </motion.div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Analyzing your news...</h3>
                <div className="h-6 overflow-hidden relative w-72 mx-auto text-center">
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={stageIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-accent text-sm font-medium absolute w-full"
                    >
                      {STAGES[activeTab][stageIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Analyze a News Story</h2>
          <p className="text-gray-400 text-sm">Choose an input method and let AI investigate it.</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-black/40 rounded-xl p-1 mb-6 border border-white/5">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'text' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <FileText className="w-4 h-4" /> Text
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'image' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <ImageIcon className="w-4 h-4" /> Image
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'url' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
          >
            <Link2 className="w-4 h-4" /> URL
          </button>
        </div>
        
        {/* Input Areas */}
        <div className="flex-1 min-h-[220px] relative">
          
          {/* TEXT TAB */}
          {activeTab === 'text' && (
            <div className="relative h-full flex flex-col">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isAnalyzing}
                placeholder="Enter or paste your news story here..."
                className="flex-1 w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent resize-none transition-all disabled:opacity-50 min-h-[200px]"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-xs text-gray-500">{text.length} chars</span>
                {text && (
                  <button onClick={handleClear} disabled={isAnalyzing} className="p-1.5 text-gray-400 hover:text-white bg-black/40 rounded-md transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* URL TAB */}
          {activeTab === 'url' && (
            <div className="relative h-full flex flex-col justify-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isAnalyzing}
                  placeholder="https://example.com/news/article"
                  className="block w-full pl-12 pr-12 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all disabled:opacity-50"
                />
                {url && (
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <button onClick={handleClear} disabled={isAnalyzing} className="p-1.5 text-gray-400 hover:text-white bg-black/40 rounded-md transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-start gap-2 text-gray-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-accent" />
                <p>Ensure the URL points to a publicly accessible article. Paywalled or heavily restricted sites may block automatic extraction.</p>
              </div>
            </div>
          )}

          {/* IMAGE TAB */}
          {activeTab === 'image' && (
            <div className="relative h-full flex flex-col">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                className="hidden"
                onChange={handleChange}
                disabled={isAnalyzing}
              />
              
              {!imagePreview ? (
                <div 
                  className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors ${dragActive ? 'border-accent bg-accent/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'} ${isAnalyzing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className={`w-10 h-10 mb-4 ${dragActive ? 'text-accent' : 'text-gray-500'}`} />
                  <p className="text-sm text-gray-300 font-medium mb-1">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              ) : (
                <div className="relative flex-1 rounded-xl border border-white/10 overflow-hidden bg-black/40 flex items-center justify-center p-2">
                  <img src={imagePreview} alt="Preview" className="max-h-48 object-contain rounded-lg" />
                  {!isAnalyzing && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleClear(); }}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzeDisabled}
            className="relative overflow-hidden group px-8 py-3 rounded-xl bg-accent text-background font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] w-full md:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze News'}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
