import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Job from '../components/Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { motion, AnimatePresence } from 'motion/react'
import FuturisticBackground from '../components/FuturisticBackground'

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-screen relative'
        >
            <FuturisticBackground />
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 relative z-10'>
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='font-bold text-2xl my-10 text-gray-800'
                >
                    Search Results <span className='text-[#6A38C2]'>({allJobs.length})</span>
                </motion.h1>
                
                <motion.div 
                    layout
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                    <AnimatePresence mode='popLayout'>
                        {
                            allJobs.map((job) => {
                                return (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={job._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                )
                            })
                        }
                    </AnimatePresence>
                </motion.div>
                
                {allJobs.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100'
                    >
                        <p className='text-gray-500 font-medium'>No jobs found matching your search.</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default Browse
