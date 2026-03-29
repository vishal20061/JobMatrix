import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import FilterCard from '../components/FilterCard'
import Job from '../components/Job'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'motion/react'
import FuturisticBackground from '../components/FuturisticBackground'


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-screen relative'
        >
            <FuturisticBackground />
            <Navbar />
            <div className='max-w-7xl mx-auto mt-8 px-4 relative z-10'>
                <div className='flex flex-col md:flex-row gap-8'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='w-full md:w-1/4'
                    >
                        <FilterCard />
                    </motion.div>

                    <div className='flex-1'>
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-2xl font-bold mb-6 text-gray-800'
                        >
                            Available Jobs <span className='text-[#6A38C2]'>({filterJobs.length})</span>
                        </motion.h1>

                        {
                            filterJobs.length <= 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className='text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100'
                                >
                                    <p className='text-gray-500 font-medium'>No jobs found matching your criteria.</p>
                                </motion.div>
                            ) : (
                                <div className='pb-10'>
                                    <motion.div
                                        layout
                                        className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
                                    >
                                        <AnimatePresence mode='popLayout'>
                                            {
                                                filterJobs.map((job) => (
                                                    <motion.div
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={{ duration: 0.3 }}
                                                        key={job?._id}
                                                    >
                                                        <Job job={job} />
                                                    </motion.div>
                                                ))
                                            }
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Jobs