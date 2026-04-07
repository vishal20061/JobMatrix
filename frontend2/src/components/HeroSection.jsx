import React, { useState, useEffect } from 'react'
import { Search, Sparkles, TrendingUp, Users, Building2 } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const words = ["Dream Career", "Dream Job", "Future Role", "Next Chapter", "Ideal Position"];

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center relative py-14 md:py-14 overflow-hidden'>
            {/* Decorative Elements */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30'>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#6A38C2]/40 to-transparent rounded-full blur-[120px]' 
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className='absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#F83002]/30 to-transparent rounded-full blur-[120px]' 
                />
            </div>

            <div className='flex flex-col gap-10 max-w-5xl mx-auto px-4 relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mx-auto'
                >
                    <div className='px-5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-[#6A38C2]/10 text-[#6A38C2] font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-[#6A38C2]/5'>
                        <Sparkles size={14} className='animate-pulse' />
                        The Future of Recruitment is Here
                    </div>
                </motion.div>

                <div className='space-y-6'>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className='text-5xl md:text-8xl font-black leading-[1] tracking-tight text-gray-900'
                    >
                        Find Your <br /> 
                        <div className='h-[1.2em] relative overflow-hidden flex justify-center'>
                            <AnimatePresence mode='wait'>
                                <motion.span
                                    key={words[index]}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className='bg-clip-text text-transparent bg-gradient-to-r from-[#6A38C2] via-[#8e44ad] to-[#F83002] absolute'
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className='text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium'
                    >
                        Connecting top talent with industry-leading companies. 
                        Your professional journey starts with a single search.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='relative w-full max-w-3xl mx-auto group'
                >
                    <div className='absolute -inset-1 bg-gradient-to-r from-[#6A38C2] to-[#F83002] rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000' />
                    <div className='relative flex flex-col md:flex-row items-center bg-white/90 backdrop-blur-2xl rounded-[2rem] p-2 shadow-2xl border border-white/50'>
                        <div className='flex-1 flex items-center w-full'>
                            <div className='pl-6 text-[#6A38C2]'>
                                <Search size={22} />
                            </div>
                            <input
                                type="text"
                                placeholder='Job title, keywords, or company...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                className='outline-none border-none w-full py-3 px-3 text-gray-700 bg-transparent font-semibold text-lg placeholder:text-gray-400'
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={searchJobHandler} 
                            className='w-full md:w-auto rounded-2xl md:rounded-[1rem] bg-[#6A38C2] px-10 py-4 text-white font-black text-lg hover:bg-[#5b30a6] transition-all shadow-xl shadow-[#6A38C2]/30 flex items-center justify-center gap-2'
                        >
                            Search Jobs
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className='flex flex-wrap justify-center gap-10 md:gap-20 mt-8'
                >
                    <div className='flex items-center gap-3'>
                        <div className='p-3 rounded-2xl bg-blue-50 text-blue-600'>
                            <TrendingUp size={24} />
                        </div>
                        <div className='text-left'>
                            <h3 className='text-2xl font-black text-gray-900'>12k+</h3>
                            <p className='text-xs text-gray-400 uppercase tracking-widest font-bold'>Live Jobs</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='p-3 rounded-2xl bg-purple-50 text-[#6A38C2]'>
                            <Building2 size={24} />
                        </div>
                        <div className='text-left'>
                            <h3 className='text-2xl font-black text-gray-900'>800+</h3>
                            <p className='text-xs text-gray-400 uppercase tracking-widest font-bold'>Companies</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='p-3 rounded-2xl bg-orange-50 text-[#F83002]'>
                            <Users size={24} />
                        </div>
                        <div className='text-left'>
                            <h3 className='text-2xl font-black text-gray-900'>50k+</h3>
                            <p className='text-xs text-gray-400 uppercase tracking-widest font-bold'>Candidates</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection
