import React, { useState, useRef, useEffect } from 'react';
import { Message, Sender } from '../types';
import { sendMessageToOpenAI } from '../services/openaiService';

// Custom ESGAS "Happy Dynamic Bearing" Bot Icon
// Design: A ball bearing with arms, legs, and a very happy face. Colorful and dynamic.
export const RollingBearingIcon: React.FC<{ className?: string, isAnimating?: boolean }> = ({ className, isAnimating }) => (
  <svg viewBox="0 0 100 120" className={`${className} overflow-visible`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="metalGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#F3F4F6" />
        <stop offset="1" stopColor="#9CA3AF" />
      </linearGradient>
      <radialGradient id="ballGradient" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#E5E7EB" />
        <stop offset="1" stopColor="#6B7280" />
      </radialGradient>
      {/* Vibrant Colors */}
      <linearGradient id="limbGradient" x1="0" y0="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FB923C" /> {/* Orange-400 */}
        <stop offset="1" stopColor="#EA580C" /> {/* Orange-600 */}
      </linearGradient>
    </defs>

    {/* LEGS - Dancing/Standing */}
    <g transform="translate(0, 10)">
      {/* Left Leg */}
      <path d="M35 90 L30 110 L20 110" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 90 L30 110 L20 110" stroke="url(#limbGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      {/* Right Leg */}
      <path d="M65 90 L70 110 L80 110" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M65 90 L70 110 L80 110" stroke="url(#limbGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </g>

    {/* ARMS - One Waving */}
    <g>
      {/* Left Arm (Down/Relaxed) */}
      <path d="M10 50 Q5 70 20 80" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
      <path d="M10 50 Q5 70 20 80" stroke="url(#limbGradient)" strokeWidth="3" strokeLinecap="round" />

      {/* Right Arm (Waving Animation) */}
      <g className={isAnimating ? "animate-wave origin-bottom-left" : ""} style={{ transformOrigin: '80px 50px' }}>
        <path d="M88 50 Q105 30 95 10" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
        <path d="M88 50 Q105 30 95 10" stroke="url(#limbGradient)" strokeWidth="3" strokeLinecap="round" />
        {/* Hand */}
        <circle cx="95" cy="10" r="4" fill="#EA580C" />
      </g>
    </g>

    {/* BODY - The Bearing */}
    <g transform="translate(0, 0)"> {/* Shifted up slightly to fit legs */}
      {/* Outer Race */}
      <circle cx="50" cy="50" r="42" fill="url(#metalGradient)" stroke="#374151" strokeWidth="2" />
      <circle cx="50" cy="50" r="30" fill="#1F2937" stroke="#374151" strokeWidth="1" />

      {/* Bearing Balls (Rolling) */}
      <g className={isAnimating ? "animate-spin-slow" : ""}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <circle
            key={i}
            cx={50 + 36 * Math.cos((angle * Math.PI) / 180)}
            cy={50 + 36 * Math.sin((angle * Math.PI) / 180)}
            r="5"
            fill="url(#ballGradient)"
            stroke="#4B5563"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Inner Race (The Face Area) */}
      <circle cx="50" cy="50" r="24" fill="#F0F9FF" stroke="#4B5563" strokeWidth="2" /> {/* Light Blue Tint for face */}

      {/* FACE - Very Happy */}
      <g className="animate-bounce-subtle">
        {/* Eyes - Happy Arches or Big Circles? Big Circles for cuteness */}
        <ellipse cx="42" cy="46" rx="5" ry="6" fill="#1F2937" />
        <ellipse cx="58" cy="46" rx="5" ry="6" fill="#1F2937" />

        {/* Highlights */}
        <circle cx="43" cy="44" r="2" fill="white" />
        <circle cx="59" cy="44" r="2" fill="white" />

        {/* Cheeks */}
        <circle cx="38" cy="52" r="3" fill="#F472B6" opacity="0.6" />
        <circle cx="62" cy="52" r="3" fill="#F472B6" opacity="0.6" />

        {/* Mouth - Big Grin */}
        <path d="M42 55 Q50 62 58 55" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    </g>

    {/* CSS for internal SVG animations */}
    <style>{`
      @keyframes spin-slow {
        from { transform: rotate(0deg); transform-origin: 50px 50px; }
        to { transform: rotate(360deg); transform-origin: 50px 50px; }
      }
      .animate-spin-slow {
        animation: spin-slow 6s linear infinite;
      }
      @keyframes bounce-subtle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .animate-bounce-subtle {
        animation: bounce-subtle 1.5s ease-in-out infinite;
      }
      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(15deg); }
      }
      .animate-wave {
        animation: wave 1s ease-in-out infinite;
      }
    `}</style>
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
      // CAMBIO 1: Nombre de bienvenida
      text: 'Bienvenido a Flownexion. Soy su asistente técnico virtual.',
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
            <div className="bg-white hover:bg-gray-50 transition-all duration-300 rounded-full p-1 shadow-2xl border-4 border-sky-600 w-20 h-20 flex items-center justify-center overflow-hidden animate-bounce-attention">
              <RollingBearingIcon className="w-16 h-16" isAnimating={true} />
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
          
          {/* CAMBIO 2: HEADER BLANCO y LETRAS OSCURAS */}
          <div className="bg-white p-4 flex justify-between items-center text-gray-800 shadow z-10 border-b border-gray-200 border-b-2">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full border border-gray-200 shadow-sm">
                <RollingBearingIcon className="w-9 h-9" />
              </div>
              <div>
                {/* CAMBIO 3: NOMBRE DEL ASISTENTE */}
                <h3 className="font-bold text-sm tracking-wide text-gray-900">Asistente Flownexion</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.6)]"></span>
                  {/* Cambio: Texto 'Online' un poco más oscuro */}
                  <p className="text-[10px] text-green-600 font-medium uppercase tracking-wider">Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
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
                    <RollingBearingIcon className="w-7 h-7" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] px-4 py-3 text-sm shadow-sm ${msg.sender === Sender.USER
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
                  <RollingBearingIcon className="w-7 h-7" />
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
                className={`p-2.5 rounded-lg flex-shrink-0 ${inputText.trim()
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
               {/* CAMBIO 4: FOOTER DEL CHAT */}
              <span className="text-[10px] text-gray-400 font-medium">Powered by Flownexion AI Tech</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
