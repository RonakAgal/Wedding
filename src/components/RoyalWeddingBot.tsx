import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, RotateCcw, Sparkles, Bot, Camera, Mic, Trash2, Play, Pause, Globe } from 'lucide-react';
import { ChatMessage, sendChatMessageToGemini } from '../services/geminiChatService';
import { supabase } from '../lib/supabase';

// WhatsApp-style Voice Note Player Component
const VoiceNotePlayer: React.FC<{ audioUrl: string; duration?: string; isUser?: boolean }> = ({
  audioUrl,
  duration = '0:05',
  isUser = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    return () => {
      audio.pause();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2 py-1 px-1 min-w-[180px] sm:min-w-[210px]">
      <button
        type="button"
        onClick={togglePlay}
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs ${
          isUser
            ? 'bg-white text-[#8B1E1E] hover:bg-[#FAF3E0]'
            : 'bg-[#8B1E1E] text-white hover:bg-[#5A1111]'
        }`}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
      </button>

      {/* WhatsApp Waveform visualization */}
      <div className="flex-1 flex flex-col justify-center gap-1">
        <div className="flex items-center gap-[2px] h-4">
          {[40, 70, 30, 90, 60, 100, 45, 80, 50, 75, 35, 85, 55, 95, 65, 40].map((h, i) => {
            const barProgress = (i / 16) * 100;
            const isPlayed = progress >= barProgress;
            return (
              <span
                key={i}
                className="w-[2.5px] rounded-full transition-all"
                style={{
                  height: `${h}%`,
                  backgroundColor: isUser
                    ? isPlayed
                      ? '#FFFFFF'
                      : 'rgba(255, 255, 255, 0.45)'
                    : isPlayed
                    ? '#8B1E1E'
                    : '#C89D3C',
                }}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[9px] opacity-85 leading-none">
          <span>{isPlaying ? 'Playing...' : duration}</span>
          <span>🎤 Voice Note</span>
        </div>
      </div>
    </div>
  );
};

export const RoyalWeddingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `खम्मा घणी सा! 🙏\n\nमैं हिमांशी आगाल एवं गगन बाहेती के विवाह उत्सव का **"शाही सहायक"** हूँ।\n\nआप मुझसे बोलकर (Voice Note 🎙️), लिखकर, या फोटो (📷) भेजकर रस्मों, समय, ड्रेस कोड, वेन्यू या हेल्पलाइन की जानकारी ले सकते हैं! ⚜️`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  // WhatsApp-style Voice Recording Controls
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100);
      setIsRecordingAudio(true);
      setRecordingDuration(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone error:', err);
      alert(
        lang === 'hi'
          ? 'कृपया वॉयस नोट रिकॉर्ड करने के लिए माइक्रोफ़ोन की अनुमति दें।'
          : 'Please allow microphone access to record voice note.'
      );
    }
  };

  const cancelVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecordingAudio) {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    clearInterval(recordingTimerRef.current);
    setIsRecordingAudio(false);
    setRecordingDuration(0);
    audioChunksRef.current = [];
  };

  const sendVoiceRecording = async () => {
    if (!mediaRecorderRef.current || !isRecordingAudio) return;

    const currentDuration = recordingDuration;
    clearInterval(recordingTimerRef.current);
    setIsRecordingAudio(false);
    setRecordingDuration(0);

    mediaRecorderRef.current.onstop = async () => {
      mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());

      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      audioChunksRef.current = [];

      const mins = Math.floor(currentDuration / 60);
      const secs = currentDuration % 60;
      const durationStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

      const reader = new FileReader();
      reader.onloadend = async () => {
        const audioDataUrl = reader.result as string;

        // User message with playable WhatsApp audio voice note
        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: '🎤 [Voice Note]',
          audioUrl: audioDataUrl,
          audioDuration: durationStr,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, userMsg]);

        // Upload and store in Supabase
        try {
          await supabase.from('wishes').insert([
            {
              name: 'Guest (Voice Note)',
              message: `🎤 Voice Note (${durationStr}) recorded at ${new Date().toLocaleString()}`,
            },
          ]);

          const fileName = `voice_${Date.now()}.webm`;
          await supabase.storage.from('voice-notes').upload(fileName, audioBlob, {
            contentType: 'audio/webm',
          });
        } catch (dbErr) {
          console.warn('Supabase storage note:', dbErr);
        }

        // Royal Bot warm blessing reply
        setIsLoading(true);
        setTimeout(() => {
          const botMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text:
              lang === 'hi'
                ? 'खम्मा घणी सा! 🙏 आपका वॉयस संदेश प्राप्त हुआ। हिमांशी जी और गगन जी के इस पावन विवाह उत्सव में आपकी शुभकामनाएं और स्नेह हमारे लिए अत्यंत अनमोल हैं! ⚜️🌸\n\nआप मुझसे किसी भी रस्म, समय या वेन्यू की जानकारी कभी भी पूछ सकते हैं!'
                : 'Khamma Ghani Sa! 🙏 Your voice note has been received with warm royal gratitude. Your presence and blessings for Himanshi & Gagan mean the world to us! ⚜️🌸\n\nPlease feel free to ask me about ceremonies, timings, or venue details anytime!',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, botMsg]);
          setIsLoading(false);
        }, 700);
      };
      reader.readAsDataURL(audioBlob);
    };

    mediaRecorderRef.current.stop();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend && !selectedImage) return;

    const currentImage = selectedImage;
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend || (lang === 'hi' ? '📷 [तस्वीर साझा की गई]' : '📷 [Photo shared]'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: currentImage || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);

    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    try {
      let responseText = '';
      if (currentImage && !textToSend) {
        responseText =
          lang === 'hi'
            ? 'खम्मा घणी सा! 🙏 बहुत ही सुंदर तस्वीर! हिमांशी जी और गगन जी के इस पावन विवाह उत्सव में आपकी उपस्थिति और शुभकामनाएं अनमोल हैं। ⚜️✨\n\nआप मुझसे किसी भी रस्म या वेन्यू की जानकारी भी पूछ सकते हैं!'
            : 'Khamma Ghani Sa! 🙏 What a wonderful photograph! Your warm presence and loving blessings for Himanshi & Gagan mean the world to us. ⚜️✨\n\nPlease let me know if you need any details regarding ceremonies, dress code, or venue directions!';
      } else {
        responseText = await sendChatMessageToGemini(textToSend, messages, lang);
      }
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
        text:
          lang === 'hi'
            ? 'खम्मा घणी सा! 🙏 कृपया एक क्षण बाद पुनः प्रयास करें, या हेल्पलाइन नंबर पर संपर्क करें।'
            : 'Khamma Ghani Sa! 🙏 Please try again in a moment, or reach out to the family helplines.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      clearTimeout(safetyTimer);
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (newLang: 'hi' | 'en') => {
    if (newLang === lang) return;
    setLang(newLang);
    // If only initial welcome message is shown, seamlessly switch its language
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id.startsWith('welcome')) {
        return [
          {
            id: `welcome-${newLang}`,
            sender: 'bot',
            text:
              newLang === 'hi'
                ? `खम्मा घणी सा! 🙏\n\nमैं हिमांशी आगाल एवं गगन बाहेती के विवाह उत्सव का **"शाही सहायक"** हूँ।\n\nआप मुझसे बोलकर (Voice Note 🎙️), लिखकर, या फोटो (📷) भेजकर रस्मों, समय, ड्रेस कोड, वेन्यू या हेल्पलाइन की जानकारी ले सकते हैं! ⚜️`
                : `Khamma Ghani Sa! 🙏 Warm Royal Welcome!\n\nI am the **"Royal Concierge"** for Himanshi Agal & Gagan Baheti's Wedding.\n\nYou can ask me anything about ceremonies, timings, dress code, venue location, or helplines by typing, sending a photo (📷), or recording a voice note (🎙️)! ⚜️`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        sender: 'bot',
        text:
          lang === 'hi'
            ? `खम्मा घणी सा! 🙏 वार्तालाप रीसेट कर दी गई है।\n\nआप मुझसे किसी भी रस्म, समय, ड्रेस कोड या लोकेशन की जानकारी ले सकते हैं! ⚜️`
            : `Khamma Ghani Sa! 🙏 Conversation has been reset.\n\nYou may ask me anything about the ceremonies, timings, dress codes, or venue locations! ⚜️`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Quick Action Buttons (Hindi & English)
  const quickActions =
    lang === 'hi'
      ? [
          { label: '🗓️ कार्यक्रम', query: 'विवाह के सभी कार्यक्रमों का समय और विवरण बताएं' },
          { label: '👗 ड्रेस कोड', query: 'सभी रस्मों का ड्रेस कोड क्या है?' },
          { label: '📍 वेन्यू मैप', query: 'स्वर्ण जयंती पार्क वेन्यू की लोकेशन और रूट बताएं' },
          { label: '📞 हेल्पलाइन', query: 'आगाल और बाहेती परिवार के हेल्पलाइन नंबर दें' },
          { label: '💌 बधाई व शायरी', query: 'हिमांशी और गगन के लिए सुंदर विवाह शायरी या बधाई संदेश लिखें' },
        ]
      : [
          { label: '🗓️ Schedule', query: 'Tell me the detailed schedule and timings of all wedding functions' },
          { label: '👗 Dress Code', query: 'What is the dress code for each ceremony?' },
          { label: '📍 Venue Map', query: 'What is the exact venue location and route for Swarn Jayanti Park?' },
          { label: '📞 Helplines', query: 'Give me the helpline contact numbers for Agal and Baheti families' },
          { label: '💌 Wishes & Shayari', query: 'Write a beautiful wedding wish and royal blessings for Himanshi and Gagan' },
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
      {/* Floating Rajputana Trigger Button (Bottom-Right) - Only visible when Chat is closed */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
            transition={{
              scale: { duration: 0.4, delay: 0.8 },
              opacity: { duration: 0.4, delay: 0.8 },
              y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
            }}
            className="relative group"
          >
            {/* Subtle Ambient Pulse Halo */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C89D3C] via-[#8B1E1E] to-[#C89D3C] opacity-75 blur-xs animate-pulse group-hover:opacity-100 transition-opacity" />

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#5A1111] via-[#8B1E1E] to-[#A52A2A] text-white border-2 border-[#C89D3C] shadow-[0_8px_25px_rgba(139,30,30,0.5)] hover:shadow-[0_12px_32px_rgba(200,157,60,0.6)] transition-shadow duration-300 cursor-pointer active:scale-90"
              aria-label="Open Royal Wedding AI Assistant"
            >
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#F0DB9E]" />
              {/* Glowing Online Indicator */}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 border-2 border-[#8B1E1E] shadow-xs animate-pulse" />
            </button>
          </motion.div>
        </div>
      )}

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
            className="fixed bottom-18 right-3 sm:bottom-21 sm:right-6 z-50 w-[calc(100vw-24px)] xs:w-[350px] sm:w-[380px] h-[500px] max-h-[80vh] rounded-3xl bg-[#FFFDF9] border-2 border-[#C89D3C] shadow-[0_25px_60px_rgba(0,0,0,0.35),0_0_40px_rgba(200,157,60,0.25)] flex flex-col overflow-hidden"
          >
            {/* Header: Royal Crimson Banner */}
            <div className="bg-gradient-to-r from-[#8B1E1E] via-[#5A1111] to-[#8B1E1E] text-white p-3 sm:p-3.5 border-b-2 border-[#C89D3C] flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E0] to-[#F5E6C4] border-2 border-[#C89D3C] flex items-center justify-center shrink-0 shadow-sm text-[#8B1E1E]">
                  <Bot className="w-4.5 h-4.5 text-[#8B1E1E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline text-sm sm:text-base font-bold text-[#F0DB9E] leading-none">
                      {lang === 'hi' ? 'शाही सहायक' : 'Royal Concierge'}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="font-label text-[9px] uppercase tracking-wider text-white/80 mt-0.5">
                    Himanshi & Gagan Concierge
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-white/80">
                {/* Language Switcher: Segmented Toggle [ हिंदी | EN ] */}
                <div className="flex items-center bg-black/25 rounded-full p-0.5 border border-[#C89D3C]/50 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('hi')}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      lang === 'hi'
                        ? 'bg-[#C89D3C] text-[#5A1111] shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    हिंदी
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('en')}
                    className={`px-1.5 sm:px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      lang === 'en'
                        ? 'bg-[#C89D3C] text-[#5A1111] shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>

                <button
                  onClick={handleResetChat}
                  title={lang === 'hi' ? 'चैट रीसेट करें' : 'Reset Chat'}
                  className="p-1 rounded-full hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title={lang === 'hi' ? 'बंद करें' : 'Close'}
                  className="p-1 rounded-full hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
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
                    } max-w-[85%]`}
                  >
                    <div
                      className={`rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-xs transition-all font-sans break-words ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#8B1E1E] to-[#6F1414] text-white rounded-br-xs text-left'
                          : 'bg-white text-[#2A1810] rounded-bl-xs border border-[#C89D3C]/40 text-left'
                      }`}
                    >
                      {msg.image && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-white/20 shadow-xs max-w-[220px]">
                          <img
                            src={msg.image}
                            alt="Attached"
                            className="w-full h-auto object-cover max-h-48 rounded-xl"
                          />
                        </div>
                      )}
                      {msg.audioUrl ? (
                        <VoiceNotePlayer
                          audioUrl={msg.audioUrl}
                          duration={msg.audioDuration}
                          isUser={msg.sender === 'user'}
                        />
                      ) : msg.sender === 'user' ? (
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      ) : (
                        renderFormattedText(msg.text)
                      )}
                    </div>
                    <span className="text-[9px] text-[#2A1810]/50 font-label mt-0.5 px-1">
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

            {/* Quick Action Suggestion Slider (Right above input field) */}
            <div className="px-2.5 py-1.5 bg-[#FAF3E0]/70 border-t border-[#C89D3C]/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 text-left">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(action.query)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/50 text-[10px] font-label font-bold uppercase tracking-wider whitespace-nowrap shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Attached Image Preview */}
            {selectedImage && (
              <div className="px-3 pt-2 pb-1 bg-white border-t border-[#C89D3C]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-10 h-10 object-cover rounded-lg border border-[#C89D3C]"
                  />
                  <span className="text-[11px] text-[#8B1E1E] font-medium">
                    {lang === 'hi' ? 'तस्वीर जोड़ी गई' : 'Photo attached'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Unified Modern Input Bar / WhatsApp Voice Recording Bar */}
            <div className="p-2 sm:p-2.5 bg-[#FFFDF9] border-t border-[#C89D3C]/30 shrink-0">
              {isRecordingAudio ? (
                /* WhatsApp-style Live Audio Recording Bar */
                <div className="flex items-center justify-between w-full px-3 py-1.5 bg-[#FAF7F0] border border-[#8B1E1E]/60 rounded-full shadow-inner animate-pulse">
                  {/* Left: Discard / Cancel button */}
                  <button
                    type="button"
                    onClick={cancelVoiceRecording}
                    title={lang === 'hi' ? 'रिकॉर्डिंग रद्द करें' : 'Cancel recording'}
                    className="w-8 h-8 rounded-full hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Center: Live Timer & Pulse */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span className="font-mono text-xs font-bold text-[#8B1E1E]">
                      {Math.floor(recordingDuration / 60)}:
                      {(recordingDuration % 60).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[11px] text-[#8B1E1E]/80 font-medium">
                      {lang === 'hi' ? 'ऑडियो रिकॉर्ड हो रहा है...' : 'Recording voice note...'}
                    </span>
                  </div>

                  {/* Right: Send WhatsApp Voice Note Button */}
                  <button
                    type="button"
                    onClick={sendVoiceRecording}
                    title={lang === 'hi' ? 'वॉयस नोट भेजें' : 'Send Voice Note'}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-1.5 bg-[#FAF7F0] border border-[#C89D3C]/60 rounded-full pl-2 pr-1.5 py-1 shadow-inner focus-within:border-[#8B1E1E] focus-within:ring-1 focus-within:ring-[#8B1E1E]/20 focus-within:bg-white transition-all"
                >
                  {/* Hidden File Input for Camera/Gallery */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />

                  {/* Left Action Buttons: Camera & WhatsApp Mic */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      title={lang === 'hi' ? 'फ़ोटो / कैमरा' : 'Photo / Camera'}
                      className="w-7 h-7 rounded-full text-[#8B1E1E] hover:bg-[#C89D3C]/20 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={startVoiceRecording}
                      title={lang === 'hi' ? 'वॉयस नोट रिकॉर्ड करें' : 'Hold / Click to record Voice Note'}
                      className="w-7 h-7 rounded-full text-[#8B1E1E] hover:bg-[#C89D3C]/20 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtle Divider */}
                  <div className="w-[1px] h-4 bg-[#C89D3C]/40 shrink-0 mx-0.5" />

                  {/* Text Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      lang === 'hi'
                        ? 'यहाँ अपना सवाल लिखें या बोलें...'
                        : 'Ask a question or speak here...'
                    }
                    className="flex-1 bg-transparent border-0 outline-none text-xs text-[#2A1810] placeholder-[#2A1810]/50 py-1.5 px-2 min-w-0 select-text pointer-events-auto cursor-text font-normal"
                    autoComplete="off"
                    spellCheck="false"
                  />

                  {/* Normal Send Button */}
                  <button
                    type="submit"
                    disabled={!input.trim() && !selectedImage}
                    title={lang === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8B1E1E] via-[#6F1414] to-[#8B1E1E] hover:opacity-90 disabled:opacity-35 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                    aria-label="Send Message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
