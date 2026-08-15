export interface AnalysisRequest {
  type: 'text' | 'image' | 'url';
  content?: string; // For text and url
  file?: File;      // For image
}

export interface AnalysisClaim {
  claim: string;
  assessment: string;
  reasoning: string;
  verification: string;
}

export interface AnalysisResponse {
  status: string;
  input_type: 'text' | 'image' | 'url';
  result: 'Likely True' | 'Likely Fake' | 'Needs Verification' | 'ERROR';
  confidence: number;
  title: string | null;
  source: string | null;
  published_date: string | null;
  extracted_text: string | null;
  claims: AnalysisClaim[];
  explanation: string;
  evidence: string[];
  sources_checked: string[];
  // Keep older fields for backwards compatibility or component reuse
  verdict?: string;
  misleading_elements?: string[];
  fact_checking?: string;
  sources?: string[];
}

export interface HistoryItem extends AnalysisResponse {
  id: string;
  timestamp: number;
  news_text: string;
  short_text: string;
}
