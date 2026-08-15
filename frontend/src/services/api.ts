import { AnalysisRequest, AnalysisResponse } from '../types/analysis';

const API_BASE = "http://127.0.0.1:8000/api/analyze";

export async function analyzeNews(request: AnalysisRequest): Promise<AnalysisResponse> {
  try {
    let response: Response;
    
    if (request.type === 'text') {
      response = await fetch(`${API_BASE}/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: request.content }),
      });
    } 
    else if (request.type === 'url') {
      response = await fetch(`${API_BASE}/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: request.content }),
      });
    }
    else if (request.type === 'image' && request.file) {
      const formData = new FormData();
      formData.append('file', request.file);
      
      response = await fetch(`${API_BASE}/image`, {
        method: 'POST',
        body: formData, // Browser automatically sets multipart/form-data boundary
      });
    }
    else {
      throw new Error("Invalid request format");
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.detail || `Server error: ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    console.error("Analysis API failed:", error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : "Failed to analyze. Ensure the Python backend is running on port 8000."
    );
  }
}
