"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, RefreshCcw, Send, Search, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  role?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Saya Patih AI, asisten belajarmu. Ada yang bisa saya bantu hari ini?",
      sender: "ai",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      role: "Vicent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Maaf, saat ini Patih AI sedang dalam tahap pemeliharaan. Saya akan segera kembali untuk menemani belajarmu!",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* ── Chat Window ────────────────────────────────────────── */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[400px] h-[600px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in duration-300">
          {/* Header */}
          <div className="bg-white border-b border-slate-50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="text-slate-300 hover:text-blue-500 transition-colors">
                <RefreshCcw className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-slate-800 text-lg">Patih AI</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {msg.sender === "user" && (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 mr-2">
                    {msg.role}
                  </span>
                )}
                <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-slate-100 flex-shrink-0 shadow-sm">
                    {msg.sender === "ai" ? (
                      <img src="/assets/patih_happy.png" alt="Patih" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  
                  {/* Bubble */}
                  <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white text-slate-700 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-slate-100 shadow-sm">
                    <img src="/assets/patih_thinking.png" alt="Patih" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                    <span className="text-slate-400 text-xs font-bold italic">Sedang berpikir...</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-50">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Menunggu respons..."
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-sm border border-slate-50 rounded-full flex items-center justify-center text-blue-500 hover:text-blue-600 active:scale-90 transition-all disabled:opacity-30 disabled:scale-100"
              >
                <div className="w-2 h-2 rounded-full border-2 border-slate-200" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Toggle Button ─────────────────────────────────────── */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center"
      >
        <div className={`flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-3xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
          <span className="text-4xl font-black">Chat</span>
          <div className="relative w-16 h-16 -mt-10 -mr-6">
            <div className="absolute inset-0 bg-blue-700 rounded-full scale-110 blur-xl opacity-20" />
            <img src="/assets/patih_happy.png" alt="Chat" className="relative z-10 w-full h-full object-contain" />
          </div>
        </div>
        
        {/* Pointer bubble tip */}
        <div className={`absolute -bottom-2 left-6 w-6 h-6 bg-blue-600 rotate-45 -z-10 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
      </button>
    </div>
  );
}
