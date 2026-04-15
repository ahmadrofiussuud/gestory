"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, RefreshCcw, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  role?: string;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Hide on play page
  if (pathname === "/play") return null;
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Saya Gestory AI, asisten belajarmu. Ada yang bisa saya bantu hari ini?",
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
        text: "Maaf, saat ini Gestory AI sedang dalam tahap pemeliharaan. Saya akan segera kembali untuk menemani belajarmu!",
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
        <div className="absolute bottom-16 right-0 w-[340px] md:w-[360px] h-[480px] md:h-[520px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in duration-300">
          {/* Header */}
          <div className="bg-white border-b border-slate-50 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button className="text-slate-300 hover:text-blue-500 transition-colors">
                <RefreshCcw className="w-4 h-4" />
              </button>
              <h3 className="font-bold text-slate-800 text-base">Gestory AI</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 bg-slate-50/50 space-y-5 scrollbar-hide">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {msg.sender === "user" && (
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 mr-2">
                    {msg.role}
                  </span>
                )}
                <div className={`flex gap-2.5 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar Container */}
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-slate-100 flex-shrink-0 shadow-sm">
                    {msg.sender === "ai" ? (
                      <img src="/assets/gestory_happy.png" alt="Gestory" className="w-full h-full object-cover mix-blend-multiply" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  
                  {/* Bubble */}
                  <div className={`p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
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
                <div className="flex gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-slate-100 shadow-sm">
                    <img src="/assets/gestory_thinking.png" alt="Gestory" className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                    <span className="text-slate-400 text-[10px] font-bold italic">Sedang berpikir...</span>
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
          <div className="p-4 bg-white border-t border-slate-50">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya Gestory AI..."
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-full text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-300"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-sm border border-slate-50 rounded-full flex items-center justify-center text-blue-500 hover:text-blue-600 active:scale-90 transition-all disabled:opacity-30 disabled:scale-100"
              >
                <div className="w-1.5 h-1.5 rounded-full border-2 border-slate-200" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Toggle Button ─────────────────────────────────────── */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center transition-transform active:scale-95"
      >
        <div className={`flex items-center gap-2.5 bg-blue-600 text-white px-5 py-2.5 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
          <span className="text-xl font-black">Chat</span>
          <div className="relative w-12 h-12 -mt-8 -mr-5 bg-white rounded-full border-2 border-white overflow-hidden shadow-inner">
            <img src="/assets/gestory_happy.png" alt="Chat" className="w-full h-full object-cover mix-blend-multiply" />
          </div>
        </div>
        
        {/* Pointer bubble tip */}
        <div className={`absolute -bottom-1.5 left-4 w-4 h-4 bg-blue-600 rotate-45 -z-10 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
      </button>
    </div>
  );
}
