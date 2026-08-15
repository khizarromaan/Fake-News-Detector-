import os
import re
import string
import nltk
from nltk.corpus import stopwords
from dotenv import load_dotenv
from groq import Groq

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
        client = Groq()
        
        system_prompt = (
            "You are an AI-Powered Fake News Detector.\n"
            "Analyze the following news text for potential misleading claims or fake news elements.\n"
            "First, declare if you think this is LIKELY REAL or LIKELY FAKE/MISLEADING. Then, explain why it might be misleading and act as a fact-checker verifying the claims based on reliable reasoning.\n\n"
            "Structure your response:\n"
            "1. Verdict (LIKELY REAL / LIKELY FAKE)\n"
            "2. Potential Misleading Elements\n"
            "3. Explanation\n"
            "4. Fact-Checking Verification"
        )
        
        user_prompt = f"Original News Content:\n{original_text}\n\nCleaned Content (for analysis context):\n{cleaned_text}"

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
              {
                "role": "system",
                "content": system_prompt
              },
              {
                "role": "user",
                "content": user_prompt
              }
            ],
            temperature=1,
            max_completion_tokens=2048,
            top_p=1,
            stream=True,
            stop=None
        )
        
        for chunk in completion:
            print(chunk.choices[0].delta.content or "", end="")
        print()
        return None
    except Exception as e:
        return f"Error connecting to LLM for explanation: {e}"

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
    
    error_msg = explain_and_verify(cleaned, news_text)
    if error_msg:
        print(error_msg)

if __name__ == "__main__":
    main()
