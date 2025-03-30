import { BACKEND_URL } from './constants';

export const fetchChatId = async (lectureId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/lectures/${lectureId}/chat`);
    const data = await response.json();
    return data.chatID || null;
  } catch (error) {
    console.error('Error fetching chat ID:', error);
    return null;
  }
};

export const sendMessage = async (chatId: string, message: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/chat/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'User',
        message,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send message', response);
      return null;
    }

    const aiMessage = await pollForAIResponse(chatId);
    console.log('===== AI response:', aiMessage);
    return aiMessage;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return null;
  }
};

const MAX_POLLING_ATTEMPTS = 10;
const pollForAIResponse = async (chatId: string) => {
  let counter = MAX_POLLING_ATTEMPTS;

  return new Promise<string | null>((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        counter--;
        const response = await fetch(`${BACKEND_URL}/chat/${chatId}`);
        const data = await response.json();
        console.log(data.length);

        if (data && data.length > 0) {
          const lastMessage = data[data.length - 1];
          console.log('Last message:', lastMessage);
          if (lastMessage.sender === 'AI') {
            clearInterval(interval);
            resolve(lastMessage.message); 
          }
        }

        if (counter <= 0) {
          clearInterval(interval);
          reject('Polling timed out');
        }
      } catch (error) {
        console.error('Error polling for AI response:', error);
        clearInterval(interval);
        reject('Error polling for AI response');
      }
    }, 2000);
  });
};

export const saveNote = async (lectureId: string, content: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/lectures/${lectureId}/save-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error saving note:', error);
    return false;
  }
};
