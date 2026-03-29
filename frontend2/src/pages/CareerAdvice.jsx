import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Trash2, Loader2, MessageSquare, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import FuturisticBackground from '../components/FuturisticBackground';

const CareerAdvice = () => {
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            content: "Hello! I'm your AI Career Advisor. How can I help you today? You can ask me about interview tips, resume improvements, career transitions, or industry trends." 
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const model = "gemini-3-flash-preview";
            
            const chat = ai.chats.create({
                model: model,
                config: {
                    systemInstruction: "You are an expert Career Advisor at Job Matrix. Your goal is to provide high-quality, professional, and actionable career advice. Help users with resume tips, interview preparation, career pathing, salary negotiations, and skill development. Keep your tone encouraging, professional, and concise. Use markdown for better readability.",
                },
            });

            // Prepare history for context
            // Note: sendMessage only takes a string message, but we can simulate context by prepending history if needed, 
            // but for simplicity we'll just send the current message.
            // For better UX, we could use the chat history feature of the SDK if available.
            
            const response = await chat.sendMessage({ message: input });
            const aiMessage = { role: 'assistant', content: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "I'm sorry, I encountered an error. Please try again later." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([
            { 
                role: 'assistant', 
                content: "Hello! I'm your AI Career Advisor. How can I help you today?" 
            }
        ]);
    };

    return (
        <div className="min-h-screen bg-gray-50 relative flex flex-col">
            <FuturisticBackground />
            <Navbar />
            
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 relative z-10 flex flex-col">
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-2 px-4 py-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-full border border-[#6A38C2]/10 mb-6'
                    >
                        <Bot size={16} />
                        <span className='text-xs font-black uppercase tracking-widest'>AI Career Advisor</span>
                    </motion.div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
                        Expert <span className="text-[#6A38C2]">Career Advice</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
                        Get personalized guidance on your professional journey, powered by advanced AI.
                    </p>
                </div>

                {/* Chat Container */}
                <div className="flex-1 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-[#6A38C2] flex items-center justify-center text-white shadow-lg shadow-[#6A38C2]/20">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">AI Assistant</h2>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={clearChat}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Clear Chat"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
                    >
                        <AnimatePresence initial={false}>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                                            msg.role === 'user' ? 'bg-[#1a1a1a] text-white' : 'bg-[#6A38C2] text-white'
                                        }`}>
                                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                                            msg.role === 'user' 
                                            ? 'bg-[#1a1a1a] text-white rounded-tr-none' 
                                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                        }`}>
                                            <div className="markdown-body">
                                                <Markdown>{msg.content}</Markdown>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isLoading && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#6A38C2] text-white flex items-center justify-center animate-pulse">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-[#6A38C2]" />
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI is thinking...</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white/50 border-t border-gray-100">
                        <form onSubmit={handleSendMessage} className="relative">
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about resumes, interviews, or career paths..."
                                className="w-full pl-6 pr-16 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-sm shadow-sm"
                            />
                            <button 
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${
                                    input.trim() && !isLoading 
                                    ? 'bg-[#6A38C2] text-white shadow-lg shadow-[#6A38C2]/20 hover:scale-105' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <Send size={20} />
                            </button>
                        </form>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <QuickAction label="Interview Prep" icon={<MessageSquare size={12} />} onClick={() => setInput("Give me some common interview questions for a Software Engineer role.")} />
                            <QuickAction label="Resume Tips" icon={<Briefcase size={12} />} onClick={() => setInput("How can I make my resume stand out for a Senior Product Manager position?")} />
                            <QuickAction label="Career Path" icon={<TrendingUp size={12} />} onClick={() => setInput("What are the career growth opportunities in Data Science?")} />
                            <QuickAction label="Skill Up" icon={<GraduationCap size={12} />} onClick={() => setInput("What skills should I learn to become a Cloud Architect in 2026?")} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const QuickAction = ({ label, icon, onClick }) => (
    <button 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all shadow-sm"
    >
        {icon}
        {label}
    </button>
);

export default CareerAdvice;
