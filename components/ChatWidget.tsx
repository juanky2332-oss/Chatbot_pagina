import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
// Eliminamos imports de servicios externos para evitar errores de "archivo no encontrado"
// import { sendMessageToGemini } from '../services/geminiService'; 

// Definimos los tipos aquí mismo para ser robustos
export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

// --- SERVICIO OPENAI INTEGRADO ---
const sendMessageToOpenAI = async (message: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("Falta la API Key (VITE_OPENAI_API_KEY)");
    return "Error de configuración: API Key no encontrada.";
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Necesario para Vite
    });

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Eres el asistente técnico de ESGAS. Responde de forma breve y profesional." },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || "No he podido generar una respuesta.";
  } catch (error) {
    console.error("Error OpenAI:", error);
    return "Error de conexión con el asistente.";
  }
};

// --- ICONO CORREGIDO (Sin errores de sintaxis) ---
export const IndustrialBotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sb" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#F3F4F6"/>
        <stop offset="1" stopColor="#9CA3AF"/>
      </linearGradient>
      <linearGradient id="ba" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0EA5E9"/>
        <stop offset="1" stopColor="#0284C7"/>
      </linearGradient>
    </defs>
    <rect x="20" y="22" width="60" height="54" rx="12" fill="url(#sb)" stroke="#4B5563" strokeWidth="2"/>
    <rect x="26" y="32" width="48" height="28" rx="6" fill="#111827"/>
    
    {/* Ojos */}
    <ellipse cx="40" cy="44" rx="6" ry="7" fill="#38BDF8" className="animate-pulse"/>
    <ellipse cx="60" cy="44" rx="6" ry="7" fill="#38BDF8" className="animate-pulse"/>
    
    {/* Boca */}
    <path d="M42 53Q50 58 58 53" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>
    
    {/* Antenas laterales (CORREGIDO: ircle>) */}
    ircle cx="16" cy="48" r="4" fill="url(#ba)"/>
    ircle cx="84" cy="48" r="4" fill="url(#ba)"/>
    
    {/* Antena superior */}
    <line x1="50" y1="22" x2="50" y2="12" stroke="#9CA3AF" strokeWidth="3"/>
    ircle cx="50" cy="10" r="4" fill="#10B981" className="animate-pulse"/>
    
    {/* Base */}
    <path d="M30 82C30 82 40 76 50 76C60 76 70 82 70 82V90H30V82Z" fill="#374151"/>
  </svg>
);

// --- COMPONENTE PRINCIPAL ---
interface ChatWidgetProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      text: 'Bienvenido a ESGAS. Soy su asistente técnico virtual.',
      sender: Sender.BOT,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Usamos la función interna de OpenAI
      const responseText = await sendMessageToOpenAI(userMessage.text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Lo siento, hubo un error técnico.",
          sender: Sender.BOT,
          timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Helper simple para formato
  const renderMessageText = (text: string) => {
     return <div className="whitespace-pre-wrap">{text}</div>;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
        <div className="pointer-events-auto">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="relative group transition-transform hover:scale-105 active:scale-95"
                >
                    <div className="bg-white hover:bg-gray-50 transition-colors duration-300 rounded-full p-2 shadow-2xl border-4 border-sky-600 w-16 h-16 flex items-center justify-center overflow-hidden">
                        <IndustrialBotIcon className="w-12 h-12" />
                    </div>
                </button>
            )}
        </div>

      {isOpen && (
        <div className="pointer-events-auto bg-white rounded-xl shadow-2xl w-[90vw] sm:w-[380px] h-[600px] max-h-[85vh] flex flex-col overflow-hidden border border-gray-200 animate-fade-in-up">
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white shadow z-10 border-b-2 border-sky-600">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full border border-gray-200">
                  <IndustrialBotIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Asistente ESGAS</h3>
                <p className="text-[10px] text-green-400 font-medium uppercase">Online</p>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2 ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === Sender.BOT && (
                    <div className="flex-shrink-0 w-8 h-8 mt-1">
                        <IndustrialBotIcon className="w-8 h-8" />
                    </div>
                )}
                <div 
                  className={`max-w-[85%] px-4 py-3 text-sm shadow-sm rounded-2xl ${
                    msg.sender === Sender.USER 
                      ? 'bg-sky-600 text-white rounded-tr-sm' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'
                  }`}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            
            {isLoading && (
               <div className="text-xs text-gray-400 ml-12">Escribiendo...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escriba su consulta..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                    className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                >
                    Enviar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
