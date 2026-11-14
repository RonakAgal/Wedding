import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, RotateCcw, Sparkles, Bot } from 'lucide-react';
import { ChatMessage, sendChatMessageToGemini } from '../services/geminiChatService';

export const RoyalWeddingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `खम्मा घणी सा! 🙏\n\nमैं हिमांशी आगाल एवं गगन बाहेती के विवाह उत्सव का **"शाही सहायक"** हूँ।\n\nआप मुझसे विवाह की रस्मों, समय, ड्रेस कोड, वेन्यू लोकेशन या फैमिली हेल्पलाइन के बारे में कभी भी पूछ सकते हैं! ⚜️`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessageToGemini(textToSend, messages);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'खम्मा घणी सा! 🙏 कृपया एक क्षण बाद पुनः प्रयास करें, या हेल्पलाइन नंबर पर संपर्क करें।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `खम्मा घणी सा! 🙏 वार्तालाप रीसेट कर दी गई है।\n\nआप मुझसे किसी भी रस्म, समय, ड्रेस कोड या लोकेशन की जानकारी ले सकते हैं! ⚜️`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Quick Action Buttons
  const quickActions = [
    { label: '🗓️ Schedule', query: 'Functions ka schedule aur timing batao' },
    { label: '👗 Dress Code', query: 'Sabhi ceremonies ka dress code kya hai?' },
    { label: '📍 Venue Map', query: 'Swarn Jayanti Park venue ka route aur location?' },
    { label: '📞 Helplines', query: 'Agal aur Baheti family ka helpline number do' },
    { label: '💌 Wishes & Shayari', query: 'Himanshi & Gagan ke liye sundar wedding shayari ya wish likho' },
  ];

  // Helper to format bot markdown text cleanly
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Bold text handling
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block min-h-[1.1rem]">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-[#8B1E1E]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={pIdx} className="italic text-[#987220]">
                  {part.slice(1, -1)}
                </em>
              );
            }
            // Simple link renderer
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              return (
                <a
                  key={pIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B1E1E] underline font-semibold hover:text-[#5A1111]"
                >
                  {linkMatch[1]}
                </a>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Rajputana Trigger Button (Bottom-Right) - Real-world compact circular FAB */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: isOpen ? 0 : [0, -4, 0] }}
          transition={{
            scale: { duration: 0.4, delay: 0.8 },
            opacity: { duration: 0.4, delay: 0.8 },
            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          }}
          className="relative group"
        >
          {/* Subtle Ambient Pulse Halo */}
          {!isOpen && (
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C89D3C] via-[#8B1E1E] to-[#C89D3C] opacity-75 blur-xs animate-pulse group-hover:opacity-100 transition-opacity" />
          )}

          {/* Floating Pill Tag (Real-world Chatbot Badge) */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              className="absolute -top-7 right-0 pointer-events-none px-2 py-0.5 rounded-full bg-[#FAF3E0] text-[#8B1E1E] border border-[#C89D3C] font-label text-[9px] font-bold shadow-md whitespace-nowrap flex items-center gap-1"
            >
              <span>शाही AI</span>
              <Sparkles className="w-2.5 h-2.5 text-[#C89D3C] animate-pulse" />
            </motion.div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#5A1111] via-[#8B1E1E] to-[#A52A2A] text-white border-2 border-[#C89D3C] shadow-[0_8px_25px_rgba(139,30,30,0.5)] hover:shadow-[0_12px_32px_rgba(200,157,60,0.6)] transition-shadow duration-300 cursor-pointer active:scale-90"
            aria-label={isOpen ? 'Close Royal Wedding AI Assistant' : 'Open Royal Wedding AI Assistant'}
          >
            <motion.div
              key={isOpen ? 'open' : 'closed'}
              initial={{ rotate: isOpen ? -90 : 90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: isOpen ? 90 : -90, scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 22 }}
              className="relative flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#F0DB9E]" />
              ) : (
                <>
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#F0DB9E]" />
                  {/* Glowing Online Indicator */}
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 border-2 border-[#8B1E1E] shadow-xs animate-pulse" />
                </>
              )}
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Floating Royal Chatbot Modal Window with Spring-Pop Transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2, y: 60, x: 20, rotate: -4 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
              rotate: 0,
              transition: {
                type: 'spring',
                damping: 24,
                stiffness: 340,
                mass: 0.85,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.25,
              y: 50,
              x: 15,
              rotate: 3,
              transition: { duration: 0.2, ease: 'easeIn' },
            }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-18 right-3 sm:bottom-21 sm:right-6 z-50 w-[calc(100vw-24px)] xs:w-[350px] sm:w-[380px] h-[500px] max-h-[80vh] rounded-3xl bg-[#FFFDF9] border-2 border-[#C89D3C] shadow-[0_25px_60px_rgba(0,0,0,0.35),0_0_40px_rgba(200,157,60,0.25)] flex flex-col overflow-hidden select-none"
          >
            {/* Header: Royal Crimson Banner */}
            <div className="bg-gradient-to-r from-[#8B1E1E] via-[#5A1111] to-[#8B1E1E] text-white p-3.5 border-b-2 border-[#C89D3C] flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E0] to-[#F5E6C4] border-2 border-[#C89D3C] flex items-center justify-center shrink-0 shadow-sm text-[#8B1E1E]">
                  <Bot className="w-5 h-5 text-[#8B1E1E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline text-sm sm:text-base font-bold text-[#F0DB9E] leading-none">
                      शाही सहायक
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="font-label text-[9px] uppercase tracking-wider text-white/80 mt-0.5">
                    Himanshi & Gagan Concierge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white/80">
                <button
                  onClick={handleResetChat}
                  title="Clear Chat"
                  className="p-1.5 rounded-full hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-full hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Suggestion Bar */}
            <div className="p-2 bg-[#FAF3E0]/70 border-b border-[#C89D3C]/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 text-left">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(action.query)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/50 text-[10px] font-label font-bold uppercase tracking-wider whitespace-nowrap shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-[#FAF7F0]/40 text-left">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E0] to-[#F5E6C4] border border-[#C89D3C] flex items-center justify-center shrink-0 shadow-xs text-[#8B1E1E] mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs transition-all ${
                        msg.sender === 'user'
                          ? 'bg-[#8B1E1E] text-white rounded-br-none border border-[#8B1E1E]'
                          : 'bg-white text-[#2A1810] rounded-bl-none border border-[#C89D3C]/40'
                      }`}
                    >
                      {renderFormattedText(msg.text)}
                    </div>
                    <span className="text-[8.5px] text-[#2A1810]/50 font-label mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E0] to-[#F5E6C4] border border-[#C89D3C] flex items-center justify-center shrink-0 shadow-xs text-[#8B1E1E]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-white border border-[#C89D3C]/40 w-16 text-[#8B1E1E] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#8B1E1E] animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2.5 bg-white border-t border-[#C89D3C]/40 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Poochiye koi bhi sawal..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2 rounded-full bg-[#FAF3E0]/50 border border-[#C89D3C]/60 text-xs text-[#2A1810] placeholder-[#2A1810]/50 focus:outline-none focus:border-[#8B1E1E] focus:ring-1 focus:ring-[#8B1E1E] transition-all"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-[#8B1E1E] hover:bg-[#5A1111] disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-95 shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
