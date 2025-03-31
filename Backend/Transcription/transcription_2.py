import whisper
from pathlib import Path
from summa import summarizer
import os
from langchain_ollama import ChatOllama
from langchain.schema import SystemMessage, HumanMessage

# Constants
OLLAMA_URL = "http://localhost:11434"
LLM_MODEL = "llama3.3"
STUDY_NOTES_PROMPT = "You are a helpful assistant that generates concise study notes from lecture transcripts."
CHAT_PROMPT = "You are a helpful AI assistant that answers questions based on the provided lecture notes."
TIMEOUT_SECONDS = 20 * 60  # 20 minutes

# Global variable to store the LLM instance
_llm_instance = None

def get_llm():
    global _llm_instance
    if _llm_instance is None:
        _llm_instance = ChatOllama(
            base_url=OLLAMA_URL,
            model=LLM_MODEL,
            num_ctx=12888,
            keep_alive=-1,
            stream=False,
            timeout=TIMEOUT_SECONDS,
        )
    return _llm_instance

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
    llm = get_llm()

    messages = [
        SystemMessage(content=STUDY_NOTES_PROMPT),
        HumanMessage(content=f"Generate study notes from this lecture transcript:\n\n{transcript}")
    ]

    response = llm(messages)
    study_notes = response.content

    return study_notes

def init_chat(lecture_notes, initial_question):
    llm = get_llm()

    messages = [
        SystemMessage(content=CHAT_PROMPT),
        HumanMessage(content=f"Here are the lecture notes:\n\n{lecture_notes}\n\n Question: {initial_question}")
    ]

    response = llm(messages)
    ai_answer = response.content
    conversation_history = messages + [response]
    return ai_answer, conversation_history

def continue_ai_chat(conversation_history, user_followup):
    llm = get_llm()

    updated_history = conversation_history + [HumanMessage(content=user_followup)]
    response = llm(updated_history)
    ai_answer = response.content
    updated_history = updated_history + [response]
    return ai_answer, updated_history

if __name__ == '__main__':
    # Read transcript from ./samples/transcript.txt
    with open('Transcription/samples/transcript.txt', 'r') as file:
        transcript = file.read()
    # Generate study notes
    study_notes = generate_study_notes(transcript)
    # Save study notes to a file
    with open('Transcription/samples/study_notes_ollama.md', 'w') as file:
        file.write(study_notes)
    print("Study notes saved to 'study_notes_ollama.md'")

    # Example of using the new chat functions
    with open('Transcription/samples/study_notes_ollama.md', 'r') as file:
        lecture_notes_for_chat = file.read()

    initial_question = "Can you explain superposition in simple terms?"
    ai_response_1, chat_history = init_chat(lecture_notes_for_chat, initial_question)
    print(f"User: {initial_question}")
    print(f"AI: {ai_response_1}")

    followup_question_1 = "How does entanglement differ from superposition?"
    ai_response_2, chat_history = continue_ai_chat(chat_history, followup_question_1)
    print(f"User: {followup_question_1}")
    print(f"AI: {ai_response_2}")

    followup_question_2 = "What are some potential applications of quantum computing mentioned in the notes?"
    ai_response_3, chat_history = continue_ai_chat(chat_history, followup_question_2)
    print(f"User: {followup_question_2}")
