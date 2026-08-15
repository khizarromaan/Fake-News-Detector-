# AI-Powered Fake News Detector

This project provides an AI system that detects potentially false news articles and explains why the content may be misleading. It allows users to verify claims through a Retrieval-Augmented Generation (RAG) style chatbot connected to reliable fact-checking reasoning via an LLM.

This repository uses functions and tools previously learned (such as text cleaning via `nltk` and API interactions via `ChatGroq`).

## Features
- **Text Preprocessing**: Cleans texts by removing punctuation, digits, and stopwords using `re`, `string`, and `nltk`.
- **AI Detection & Verification**: Uses `ChatGroq` (LLaMA-3 via LangChain) to analyze the cleaned text, declare a verdict on the authenticity of the news, explain misleading elements, and verify claims as an automated fact-checker.

## Setup

1. **Install Requirements**
```bash
pip install -r requirements.txt
```

2. **Download NLTK Data**
Make sure to download the NLTK stopwords if you haven't already. You can run this once in python:
```python
import nltk
nltk.download('stopwords')
```

3. **Set Up Environment Variables**
Create a `.env` file in the root directory with your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

## Usage

Run the script using Python:
```bash
python main.py
```

Input a piece of news text when prompted. The script will clean the text, pass it to the Groq LLM, and output a structured explanation including a verdict (Real or Fake), potential misleading elements, and a fact-checking verification.
