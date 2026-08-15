<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-success.svg?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <br />
  <br />
  <h1 align="center">Mindx Fake News Detector</h1>
  <p align="center">
    <strong>An advanced, multi-modal AI platform designed to detect and expose fake news through Text, Images, and URLs.</strong>
  </p>
  <p align="center">
    <strong>🚀 <a href="https://fake-news-detector-ten-flame.vercel.app/">Live Demo</a></strong>
  </p>
</div>

<hr />

## 🚀 Overview

The **Mindx Fake News Detector** (also known as TruthScan AI) is a powerful tool built to combat misinformation. It uses advanced Large Language Models (LLMs) via the **Groq API** to perform deep logical reasoning, cross-check claims, and provide transparent explanations for its verdicts.

Unlike standard text analyzers, this platform features a **Multi-Modal Backend**, allowing users to analyze news from three distinct sources:
1. **Raw Text Input**
2. **Images / Screenshots** (Powered by Tesseract OCR)
3. **Web URLs / Articles** (Powered by BeautifulSoup Web Scraping)

---

## ✨ Key Features

- **🧠 Deep Reasoning Engine**: Analyzes logical fallacies, emotional manipulation, and unsubstantiated claims.
- **🖼️ Image OCR Analysis**: Drag and drop a screenshot of a news headline or social media post, and the system will automatically extract and analyze the text.
- **🔗 URL Web Scraping**: Paste a link to any news article, and the system intelligently extracts the core news content while stripping away UI noise and ads.
- **⚡ Real-time Feedback**: Lightning-fast inference powered by the Groq AI engine.
- **🎨 Stunning UI/UX**: Built with React, Tailwind CSS, and Framer Motion for a fluid, responsive, glassmorphism-inspired design.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python)
- **OCR Engine**: Tesseract OCR (`pytesseract`)
- **Web Scraping**: BeautifulSoup4
- **AI/ML Engine**: Groq API (LLM)

---

## 💻 Installation & Setup

To run this project locally, you will need to start both the Python Backend and the React Frontend.

### Prerequisites
1. **Node.js** (v16+)
2. **Python** (3.8+)
3. **Tesseract OCR** (Must be installed on your system. For Windows, download from [UB-Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)).
4. **Groq API Key** (Get one from [console.groq.com](https://console.groq.com/))

### 1. Backend Setup
Navigate to the root directory and install the Python dependencies:

```bash
# Install required python packages
pip install -r requirements.txt

# Create a .env file in the root directory and add your Groq API Key
echo "GROQ_API_KEY=your_api_key_here" > .env

# Start the FastAPI server
python main.py
```
*The backend server will start on `http://localhost:8000`.*

### 2. Frontend Setup
Open a new terminal window, navigate to the `frontend` folder, and start the development server:

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend application will be available at `http://localhost:5173` (or 5174).*

---

## 📖 How to Use

1. **Open the Web App**: Navigate to the local URL provided by Vite.
2. **Select an Input Method**:
   - **Text Tab**: Type or paste an article directly.
   - **Image Tab**: Upload a screenshot of a news headline.
   - **URL Tab**: Paste a direct link to a news article.
3. **Analyze**: Click the **Analyze News** button.
4. **Review Results**: The dashboard will display a verdict (`Likely True`, `Likely Fake`, or `Needs Verification`), a confidence score, a detailed explanation, and the sources checked.

---

## 👥 The Mindx Team

This project was developed by the **Mindx** team:

| Role | Name |
| :--- | :--- |
| **Lead Developers** | Khizar Romaan • Puneet Nagwani |
| **Researcher** | Krishna Bhiogade |
| **ML Engineer** | Aryan Chopade |

---

<div align="center">
  <i>"Empowering the truth in the digital age."</i>
</div>
