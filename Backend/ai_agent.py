from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from datetime import datetime, timezone
import os
import uuid

class AIAgent:
    def __init__(self, api_key: str):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=api_key,
            convert_system_message_to_human=True,
            temperature=0.4,
        )

        self.notes_prompt = ChatPromptTemplate.from_template(
            """
            You are an expert academic assistant. Based on the lecture transcript below,
            generate well-structured and clear notes that a student can use to study from.

            The notes should:
            - Be concise and informative
            - Organize content into bullet points or short sections with headers
            - Include key concepts, definitions, examples, and any steps discussed
            - Avoid repetition or irrelevant details

            Transcript:
            ---
            {transcript}
            ---

            Return the response as a JSON with keys: title, summary, content.
            """
        )

        self.chat_prompt = ChatPromptTemplate.from_template(
            """
            You are a helpful AI tutor. Based on the lecture context and prior conversation, continue the discussion.

            Lecture Summary:
            ---
            {context}
            ---

            Previous messages:
            ---
            {chat_history}
            ---

            Respond to the user's latest input:
            User: {user_input}
            AI:
            """
        )

    def generate_notes(self, title: str, transcript: str):
        prompt = self.notes_prompt.invoke({"transcript": transcript})
        response = self.llm.invoke(prompt)
        return {
            "id": str(uuid.uuid4()),
            "title": f"Notes on {title}",
            "summary": f"Key points covered in the lecture titled '{title}'.",
            "content": response.content.strip(),
            "date_generated": datetime.now(timezone.utc).timestamp(),
        }

    def chat_response(self, context: str, messages: list[dict], user_input: str) -> str:
        chat_history = "\n".join([f"{m.sender}: {m.message}" for m in messages])
        prompt = self.chat_prompt.invoke({
            "context": context,
            "chat_history": chat_history,
            "user_input": user_input
        })
        response = self.llm.invoke(prompt)
        return response.content.strip()


def main():
    from dotenv import load_dotenv
    load_dotenv()

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("Google API Key not found. Please set GOOGLE_API_KEY in your environment.")

    agent = AIAgent(api_key=api_key)

    # Test 1: Notes Generation
    dummy_transcript = (
        "In today's lecture, we discussed the fundamentals of Newton's laws. "
        "Newton's first law states that an object in motion stays in motion unless acted upon by a force. "
        "The second law is F=ma, where force equals mass times acceleration. "
        "The third law is every action has an equal and opposite reaction. "
        "We went over several examples involving pushing blocks on frictionless surfaces."
    )
    notes = agent.generate_notes(title="Newton's Laws", transcript=dummy_transcript)
    print("\n--- Test: Notes Generation ---")
    print(notes)

    # Test 2: Chat Response with structured history
    context = notes["summary"]
    chat_history = [
        {"sender": "User", "message": "What is Newton's second law?"},
        {"sender": "AI", "message": "It states that Force equals mass times acceleration."}
    ]
    user_input = "Can you explain it with a practical example?"
    response = agent.chat_response(context, chat_history, user_input)
    print("\n--- Test: Chat Response ---")
    print(response)


if __name__ == "__main__":
    main()
