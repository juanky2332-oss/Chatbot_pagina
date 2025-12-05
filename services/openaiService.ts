import { SYSTEM_INSTRUCTION } from "../constants";
import { Message, Sender } from "../types";

// Define the structure for OpenAI messages
interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Store conversation history in memory
let conversationHistory: OpenAIMessage[] = [
  { role: 'system', content: SYSTEM_INSTRUCTION }
];

export const sendMessageToOpenAI = async (userText: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    console.error("OpenAI API Key is missing. Please set VITE_OPENAI_API_KEY in your .env file.");
    return "Error de configuración: Falta la API Key de OpenAI.";
  }

  // Add user message to history
  conversationHistory.push({ role: 'user', content: userText });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Or 'gpt-3.5-turbo'
        messages: conversationHistory,
        temperature: 0.1, // Strict adherence to protocol
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0]?.message?.content || "Lo siento, no he podido procesar tu respuesta.";

    // Add bot response to history
    conversationHistory.push({ role: 'assistant', content: botResponse });

    return botResponse;

  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    // Remove the failed user message so we can retry or just to keep state clean? 
    // Actually, usually better to keep it or handle error gracefully.
    return "Ha ocurrido un error técnico al conectar con el asistente. Por favor, inténtelo de nuevo.";
  }
};

export const resetConversation = () => {
    conversationHistory = [{ role: 'system', content: SYSTEM_INSTRUCTION }];
};
