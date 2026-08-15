import os
import re
import string
import nltk
from nltk.corpus import stopwords
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

# Ensure you have the NLTK stopwords downloaded before running
# nltk.download('stopwords')

def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = re.sub(r'\d+', '', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    
    try:
        stop_words = set(stopwords.words('english'))
        words = text.split()
        filtered_words = [word for word in words if word not in stop_words]
        return ' '.join(filtered_words)
    except LookupError:
        # Fallback if stopwords are not downloaded
        return text

def explain_and_verify(cleaned_text, original_text):
    load_dotenv()
    try:
        llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0.2)
        
        prompt_template = ChatPromptTemplate.from_template(
            "You are an AI-Powered Fake News Detector.\n"
            "Analyze the following news text for potential misleading claims or fake news elements.\n"
            "First, declare if you think this is LIKELY REAL or LIKELY FAKE/MISLEADING. Then, explain why it might be misleading and act as a fact-checker verifying the claims based on reliable reasoning.\n\n"
            "Original News Content:\n{original_text}\n\n"
            "Cleaned Content (for analysis context):\n{cleaned_text}\n\n"
            "Structure your response:\n"
            "1. Verdict (LIKELY REAL / LIKELY FAKE)\n"
            "2. Potential Misleading Elements\n"
            "3. Explanation\n"
            "4. Fact-Checking Verification"
        )
        
        formatted_prompt = prompt_template.format_messages(
            original_text=original_text, 
            cleaned_text=cleaned_text
        )
        response = llm.invoke(formatted_prompt)
        return response.content
    except Exception as e:
        return f"Error connecting to LLM for explanation: {e}\nPlease ensure your GROQ_API_KEY is set in the .env file."

def main():
    print("--- AI-Powered Fake News Detector (LLM-Based) ---")
    print("This tool will clean your input and use Groq to detect and fact-check the news.\n")
    
    news_text = input("Enter news text to analyze:\n")
    if not news_text.strip():
        print("Empty input. Exiting.")
        return
        
    print("\n[i] Cleaning input text...")
    cleaned = clean_text(news_text)
    
    print("[i] Sending to AI for Analysis and Fact-Checking...")
    print("\n--- AI Explanation and Verification ---\n")
    
    explanation = explain_and_verify(cleaned, news_text)
    print(explanation)

if __name__ == "__main__":
    main()
