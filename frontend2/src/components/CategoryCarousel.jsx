import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';
import { motion } from 'motion/react';
import { 
    Code, 
    Database, 
    BarChart, 
    Palette, 
    Layers, 
    Smartphone, 
    Layout, 
    Terminal,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Backend Developer", icon: Database, color: "text-green-600", bg: "bg-green-50" },
    { name: "Data Science", icon: BarChart, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Graphic Designer", icon: Palette, color: "text-pink-600", bg: "bg-pink-50" },
    { name: "FullStack Developer", icon: Layers, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Mobile Developer", icon: Smartphone, color: "text-cyan-600", bg: "bg-cyan-50" },
    { name: "UI/UX Designer", icon: Layout, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "DevOps Engineer", icon: Terminal, color: "text-red-600", bg: "bg-red-50" }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollRef = React.useRef(null);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth / 2 
                : scrollLeft + clientWidth / 2;
            
            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className='w-full max-w-6xl mx-auto px-4'>
            <div className='relative group'>
                {/* Navigation Buttons */}
                <button 
                    onClick={() => scroll('left')}
                    className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#6A38C2] hover:scale-110 transition-all opacity-0 group-hover:opacity-100'
                >
                    <ChevronLeft size={20} />
                </button>
                
                <button 
                    onClick={() => scroll('right')}
                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#6A38C2] hover:scale-110 transition-all opacity-0 group-hover:opacity-100'
                >
                    <ChevronRight size={20} />
                </button>

                <div 
                    ref={scrollRef}
                    className='flex items-center gap-8 overflow-x-auto p-6 pr-10 pl-10 scrollbar-hide no-scrollbar snap-x snap-mandatory'
                >
                    {
                        categories.map((cat, index) => {
                            const Icon = cat.icon;
                            return (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ 
                                        y: -5,
                                        backgroundColor: "#f9fafb",
                                        borderColor: "#6A38C2"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => searchJobHandler(cat.name)}
                                    className={`flex items-center gap-3 rounded-2xl px-6 py-4 border border-gray-100 bg-white whitespace-nowrap transition-all duration-300 shadow-sm snap-start group/item`}
                                >
                                    <div className={`p-2 rounded-xl ${cat.bg} ${cat.color} group-hover/item:scale-110 transition-transform duration-300`}>
                                        <Icon size={20} />
                                    </div>
                                    <span className='font-semibold text-gray-700 group-hover/item:text-[#6A38C2] transition-colors'>
                                        {cat.name}
                                    </span>
                                </motion.button>
                            )
                        })
                    }
                </div>
                
                {/* Visual cues for scrolling */}
                <div className='absolute left-0 top-0 bottom-6 w-20 bg-gradient-to-r from-[#f5f5f5] to-transparent pointer-events-none z-10' />
                <div className='absolute right-0 top-0 bottom-6 w-20 bg-gradient-to-l from-[#f5f5f5] to-transparent pointer-events-none z-10' />
            </div>
        </div>
    )
}

export default CategoryCarousel;
