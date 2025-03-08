import whisper
from pathlib import Path
from summa import summarizer
import requests
import json
import os

def transcribe_audio(audio_path):
    model = whisper.load_model('base')
    result = model.transcribe(str(audio_path), language='en')
    
    transcript = result['text']
    
    # Save transcript to a file
    with open('Transcription/samples/transcript.txt', 'w') as file:
        file.write(transcript)
    
    return transcript

def summarize_transcript(transcript):
    summary = summarizer.summarize(transcript, ratio=0.2)

    # Save summary to a file
    with open('Transcription/samples/summary.txt', 'w') as file:
        file.write(summary)
        
    return summary

def generate_study_notes(transcript):
    api_key = os.environ.get('PERPLEXITY_API_KEY')
    if not api_key:
        raise ValueError("Perplexity API key not found in environment variables")

    url = "https://api.perplexity.ai/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "sonar",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant that generates concise study notes from lecture transcripts."
            },
            {
                "role": "user",
                "content": f"Generate study notes from this lecture transcript: {transcript}"
            }
        ]
    }
    
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    
    result = response.json()
    print(result)
    study_notes = result['choices'][0]['message']['content']
    
    return study_notes

audio_file_path = Path('Transcription/samples/sample-audio-2.mp3')
transcript = transcribe_audio(audio_file_path)
print("Transcription complete. Saved to 'transcript.txt'")

summary = summarize_transcript(transcript)
print("Summarization complete.")

study_notes = generate_study_notes(summary)

# Save study notes to a file
with open('Transcription/samples/study_notes.md', 'w') as file:
    file.write(study_notes)
print("Study notes saved to 'study_notes.md'")
