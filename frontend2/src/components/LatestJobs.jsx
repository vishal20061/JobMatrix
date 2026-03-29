import React from 'react'
import { useSelector } from 'react-redux';
import JobCard from './JobCard';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-32 px-4'>
            <div className='flex flex-col items-center text-center mb-16'>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className='flex items-center gap-2 px-4 py-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-full border border-[#6A38C2]/10 mb-6'
                >
                    <Sparkles size={16} />
                    <span className='text-xs font-black uppercase tracking-widest'>New Opportunities</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='text-5xl md:text-6xl font-black text-gray-900 tracking-tight'
                >
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#F83002]'>Latest & Top </span> 
                    Job Openings
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className='text-gray-500 mt-6 max-w-2xl font-medium text-lg'
                >
                    Discover your next career milestone with our handpicked selection of premium job opportunities from industry leaders.
                </motion.p>
            </div>

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            >
                {
                    allJobs.length <= 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='col-span-full text-center py-24 bg-white/50 backdrop-blur-xl rounded-[3rem] border-2 border-dashed border-[#6A38C2]/10 shadow-inner'
                        >
                            <div className='w-20 h-20 bg-[#6A38C2]/5 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <Sparkles size={32} className='text-[#6A38C2]/30' />
                            </div>
                            <p className='text-gray-900 font-black text-2xl tracking-tight'>No premium opportunities yet.</p>
                            <p className='text-gray-500 mt-2 font-medium'>Our scouts are working hard to bring you the best roles!</p>
                        </motion.div>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <motion.div 
                                key={job._id}
                                variants={{
                                    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 15 },
                                    visible: { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                                }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <JobCard job={job}/>
                            </motion.div>
                        ))
                    )
                }
            </motion.div>
        </div>
    )
}

export default LatestJobs
