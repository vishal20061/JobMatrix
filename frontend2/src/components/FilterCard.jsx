import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import { motion, AnimatePresence } from 'motion/react'
import { Filter, X } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "Graphic Designer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = React.useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    React.useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='w-full bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 shadow-2xl shadow-[#6A38C2]/5 sticky top-24'
        >
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-2'>
                    <Filter size={20} className='text-[#6A38C2]' />
                    <h1 className='font-black text-xl text-gray-900 uppercase tracking-tight'>Filter Jobs</h1>
                </div>
                <AnimatePresence>
                    {selectedValue && (
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setSelectedValue('')}
                            className='p-2 text-gray-400 hover:text-[#F83002] transition-colors'
                            title="Clear Filters"
                        >
                            <X size={18} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <div className='space-y-8'>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h2 className='font-black text-xs text-gray-400 uppercase tracking-widest mb-4'>{data.filterType}</h2>
                            <div className='space-y-3'>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        const isSelected = selectedValue === item;
                                        return (
                                            <motion.div 
                                                key={idx} 
                                                className='flex items-center group'
                                                whileHover={{ x: 4 }}
                                            >
                                                <div className='relative flex items-center'>
                                                    <input 
                                                        type="radio" 
                                                        id={itemId}
                                                        name={data.filterType}
                                                        value={item}
                                                        checked={isSelected}
                                                        onChange={() => changeHandler(item)}
                                                        className='peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-200 checked:border-[#6A38C2] checked:bg-[#6A38C2] transition-all cursor-pointer'
                                                    />
                                                    <div className='absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity'>
                                                        <div className='w-1.5 h-1.5 rounded-full bg-white' />
                                                    </div>
                                                </div>
                                                <label 
                                                    htmlFor={itemId} 
                                                    className={`ml-3 text-sm font-bold cursor-pointer transition-colors ${isSelected ? 'text-[#6A38C2]' : 'text-gray-500 group-hover:text-gray-900'}`}
                                                >
                                                    {item}
                                                </label>
                                            </motion.div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            
            {selectedValue && (
                <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedValue('')}
                    className='mt-10 w-full py-4 text-xs font-black uppercase tracking-widest text-[#F83002] bg-[#F83002]/5 hover:bg-[#F83002]/10 rounded-2xl transition-all border border-[#F83002]/10'
                >
                    Reset All Filters
                </motion.button>
            )}
        </motion.div>
    )
}

export default FilterCard
