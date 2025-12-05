import React, { useState, useRef, useEffect } from 'react';
import { Message, Sender } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

// Custom ESGAS Bot Icon (Silver/Metallic + Blue) - "Pensativo y Alegre"
export const IndustrialBotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Silver Gradient for Body */}
      <linearGradient id="silverBody" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#F3F4F6"/>
        <stop offset="1" stopColor="#9CA3AF"/>
      </linearGradient>
      {/* Blue Gradient for Accents */}
      <linearGradient id="blueAccent" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0EA5E9"/>
        <stop offset="1" stopColor="#0284C7"/>
      </linearGradient>
    </defs>
    
    {/* Head Shape */}
    <rect x="20" y="22" width="60" height="54" rx="12" fill="url(#silverBody)" stroke="#4B5563" strokeWidth="2"/>
    
    {/* Face Screen (Dark Glass) */}
    <rect x="26" y="32" width="48" height="28" rx="6" fill="#111827"/>
    
    {/* Eyes (Glowing Blue - Expressive/Thinking) */}
    {/* Left Eye */}
    <ellipse cx="40" cy="44" rx="6" ry="7" fill="#38BDF8" className="animate-pulse"/>
    {/* Right Eye */}
    <ellipse cx="60" cy="44" rx="6" ry="7" fill="#38BDF8" className="animate-pulse"/>
    
    {/* Eyebrows (Expression: One slightly raised = Pensativo/Attentive) */}
    <line x1="34" y1="36" x2="46" y2="36" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    <line x1="54" y1="35" x2="66" y2="33" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

    {/* Smile (Happy/Helpful) */}
    <path d="M42 53Q50 58 58 53" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"/>

    {/* Ears / Antennas */}
    <circle cx="16" cy="48" r="4" fill="url(#blueAccent)"/>
    <circle cx="84" cy="48" r="4" fill="url(#blueAccent)"/>
    <path d="M20 48H26" stroke="#9CA3AF" strokeWidth="3"/>
    <path d="M74 48H80" stroke="#9CA3AF" strokeWidth="3"/>

    {/* Top Antenna */}
    <line x1="50" y1="22" x2="50" y2="12" stroke="#9CA3AF" strokeWidth="3"/>
    <circle cx="50" cy="10" r="4" fill="#10B981" className="animate-pulse" />

    {/* Neck/Shoulders */}
    <path d="M30 82C30 82 40 76 50 76C60 76 70 82 70 82V90H30V82Z" fill="#374151"/>
  </svg>
);

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
    },
    {
        id: 'welcome-2',
        text: 'Puedo ayudarle a localizar referencias, consultar medidas, verificar stock o resolver dudas técnicas sobre transmisión de potencia.',
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

  // Auto-focus input when opening
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
      const responseText = await sendMessageToGemini(userMessage.text);
      
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
          text: "Lo siento, hubo un error de conexión con el sistema técnico.",
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

  // Helper to process markdown-like bold syntax (**text**) and line breaks (<br>)
  const formatText = (text: string) => {
    const parts = text.split(/(<br\s*\/?>|\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.match(/^<br\s*\/?>$/)) {
        return <br key={index} />;
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Helper to render message text (markdown support for tables and bold)
  const renderMessageText = (text: string) => {
    // Basic Markdown Table support
    if (text.includes('|') && text.includes('---')) {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const tableLines = lines.filter(line => line.includes('|'));
        const otherLines = lines.filter(line => !line.includes('|') && !line.includes('---'));

        return (
            <div className="space-y-2">
                {otherLines.length > 0 && (
                    <div className="whitespace-pre-wrap leading-relaxed">
                        {otherLines.map((line, i) => <div key={i}>{formatText(line)}</div>)}
                    </div>
                )}
                <div className="overflow-x-auto my-3 border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full text-xs text-left border-collapse">
                        <tbody className="bg-white">
                            {tableLines.map((row, i) => {
                                if (row.includes('---')) return null; // Skip separator line
                                const cells = row.split('|').filter((c, idx, arr) => {
                                    // Filter out empty strings from start/end if pipe is at boundary
                                    if (idx === 0 && c.trim() === '') return false;
                                    if (idx === arr.length - 1 && c.trim() === '') return false;
                                    return true;
                                });
                                
                                const isHeader = i === 0; 
                                return (
                                    <tr key={i} className={isHeader ? "bg-slate-800 text-white" : "border-b border-gray-100 last:border-0 hover:bg-sky-50 transition-colors"}>
                                        {cells.map((cell, j) => (
                                            <td key={j} className={`px-3 py-2.5 ${isHeader ? 'font-semibold' : 'text-gray-700'}`}>
                                                {formatText(cell.trim())}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    // Standard text message
    return <div className="whitespace-pre-wrap leading-relaxed">{formatText(text)}</div>;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
        <div className="pointer-events-auto">
            {/* Toggle Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="relative group transition-transform hover:scale-105 active:scale-95"
                >
                    {/* Background WHITE requested, with blue border to stand out */}
                    <div className="bg-white hover:bg-gray-50 transition-colors duration-300 rounded-full p-2 shadow-2xl border-4 border-sky-600 w-16 h-16 flex items-center justify-center overflow-hidden">
                        <IndustrialBotIcon className="w-12 h-12" />
                    </div>
                    {/* Notification Dot - GREEN for 'Operativo' */}
                    <span className="absolute top-0 right-0 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                    </span>
                    
                    {/* Tooltip hint */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-slate-800 text-white px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block border border-gray-600">
                        <span className="text-xs font-semibold">Asistente Técnico Online</span>
                    </div>
                </button>
            )}
        </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto bg-white rounded-xl shadow-2xl w-[90vw] sm:w-[380px] h-[600px] max-h-[85vh] flex flex-col overflow-hidden border border-gray-200 animate-fade-in-up ring-1 ring-black/10">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white shadow z-10 border-b border-sky-600 border-b-2">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full border border-gray-200 shadow-inner">
                  <IndustrialBotIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide text-white">Asistente ESGAS</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.6)]"></span>
                    <p className="text-[10px] text-sky-200 font-medium uppercase tracking-wider">Online</p>
                </div>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-colors"
                aria-label="Cerrar chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 scroll-smooth custom-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={msg.id} 
                className={`flex gap-2 ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
              >
                {/* Avatar for Bot in Message */}
                {msg.sender === Sender.BOT && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center self-start shadow-sm overflow-hidden mt-1">
                        <IndustrialBotIcon className="w-6 h-6" />
                    </div>
                )}

                <div 
                  className={`max-w-[85%] px-4 py-3 text-sm shadow-sm ${
                    msg.sender === Sender.USER 
                      ? 'bg-sky-600 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {renderMessageText(msg.text)}
                  
                  <div className={`text-[9px] mt-1 text-right ${msg.sender === Sender.USER ? 'text-sky-100' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start gap-2">
                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center self-start overflow-hidden mt-1">
                    <IndustrialBotIcon className="w-6 h-6" />
                </div>
                 <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="relative flex items-center gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escriba su consulta técnica..."
                    className="flex-1 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-sm"
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputText.trim()}
                    className={`p-2.5 rounded-lg flex-shrink-0 ${
                        inputText.trim() 
                        ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-md transform hover:scale-105' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    } transition-all duration-200`}
                >
                    {/* Paper Plane Icon */}
                    <svg className="w-5 h-5 transform rotate-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
            <div className="text-center mt-2">
                 <span className="text-[10px] text-gray-400 font-medium">Powered by ESGAS AI Tech</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;