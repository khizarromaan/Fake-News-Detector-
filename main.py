import os
import re
import string
import json
from datetime import datetime
from urllib.parse import urlparse
from dotenv import load_dotenv
from groq import Groq
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pytesseract
from PIL import Image
import io
import requests
from bs4 import BeautifulSoup

# Explicitly set Tesseract path for Windows environments where it's not in PATH
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe'

load_dotenv()

app = FastAPI(title="TruthScan AI Backend - Multi Input")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    content: str

class URLRequest(BaseModel):
    url: str

class AnalysisClaim(BaseModel):
    claim: str
    assessment: str
    reasoning: str
    verification: str

class AnalysisResponse(BaseModel):
    status: str
    input_type: str
    result: str
    confidence: int
    title: str | None
    source: str | None
    published_date: str | None
    extracted_text: str | None
    claims: list[dict]
    explanation: str
    evidence: list[str]
    sources_checked: list[str]

def get_base_response(input_type: str) -> dict:
    return {
        "status": "success",
        "input_type": input_type,
        "result": "ERROR",
        "confidence": 0,
        "title": None,
        "source": None,
        "published_date": None,
        "extracted_text": None,
        "claims": [],
        "explanation": "No explanation provided.",
        "evidence": [],
        "sources_checked": []
    }

def analyze_content(text: str, input_type: str, title: str = None, source: str = None) -> AnalysisResponse:
    try:
        client = Groq()
        system_prompt = (
            "You are an AI-Powered Fake News Detector.\n"
            "Analyze the provided text for fake news or misleading claims.\n"
            "Return a strictly valid JSON object matching exactly this schema:\n"
            "{\n"
            '  "result": "Likely True" or "Likely Fake" or "Needs Verification",\n'
            '  "confidence": <integer between 0 and 100>,\n'
            '  "claims": [\n'
            '    {\n'
            '      "claim": "The exact claim",\n'
            '      "assessment": "Short assessment",\n'
            '      "reasoning": "Reasoning",\n'
            '      "verification": "Evidence"\n'
            '    }\n'
            '  ],\n'
            '  "explanation": "Overall explanation of why it is true or fake",\n'
            '  "evidence": ["List of strings showing supporting or conflicting evidence"],\n'
            '  "sources_checked": ["List of actual URLs or reliable sources used to verify"]\n'
            "}"
        )
        
        user_prompt = f"Title: {title or 'Unknown'}\nSource: {source or 'Unknown'}\nContent:\n{text}"

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
              {"role": "system", "content": system_prompt},
              {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        data = json.loads(completion.choices[0].message.content)
        
        base = get_base_response(input_type)
        base["result"] = data.get("result", "ERROR")
        base["confidence"] = data.get("confidence", 0)
        base["claims"] = data.get("claims", [])
        base["explanation"] = data.get("explanation", "")
        base["evidence"] = data.get("evidence", [])
        base["sources_checked"] = data.get("sources_checked", [])
        base["extracted_text"] = text
        base["title"] = title
        base["source"] = source
        
        return AnalysisResponse(**base)
    except Exception as e:
        err = get_base_response(input_type)
        err["status"] = "error"
        err["explanation"] = f"Failed to analyze with AI: {str(e)}"
        return AnalysisResponse(**err)


@app.post("/api/analyze/text", response_model=AnalysisResponse)
async def analyze_text(request: TextRequest):
    if not request.content.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    return analyze_content(request.content, "text")


@app.post("/api/analyze/image", response_model=AnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        extracted_text = pytesseract.image_to_string(image).strip()
        
        if len(extracted_text) < 10:
            raise HTTPException(status_code=400, detail="We couldn't clearly read the text in this image. Please upload a clearer image or paste the news text manually.")
            
        return analyze_content(extracted_text, "image")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process image: {str(e)}")


@app.post("/api/analyze/url", response_model=AnalysisResponse)
async def analyze_url(request: URLRequest):
    url = request.url
    parsed = urlparse(url)
    if not parsed.scheme in ["http", "https"]:
        raise HTTPException(status_code=400, detail="Invalid URL scheme. Must be http or https.")
        
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        res = requests.get(url, headers=headers, timeout=10)
        res.raise_for_status()
        
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Remove scripts, styles, nav, headers, etc.
        for element in soup(["script", "style", "nav", "header", "footer", "iframe"]):
            element.decompose()
            
        # Try to get title
        title = soup.title.string if soup.title else None
        if not title:
            h1 = soup.find('h1')
            title = h1.text if h1 else None
            
        # Get source from hostname
        source = parsed.hostname
        
        # Get main text (best effort by finding paragraphs)
        paragraphs = soup.find_all('p')
        text_content = ' '.join([p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 20])
        
        if len(text_content) < 50:
            raise HTTPException(status_code=400, detail="We couldn't retrieve this article automatically. Please paste the article text instead.")
            
        return analyze_content(text_content, "url", title=title, source=source)
        
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=400, detail="We couldn't retrieve this article automatically. Website might be blocking access.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse URL: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
