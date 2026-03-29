import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '../../redux/jobSlice'
import AdminJobsTable from '../../components/admin/AdminJobsTable'
import useGetAdminJobs from '../../hooks/useGetAdminJobs'
import { Plus, Search, Briefcase } from 'lucide-react'
import { motion } from 'motion/react'
import FuturisticBackground from '../../components/FuturisticBackground'

const AdminJobs = () => {
    useGetAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div className='min-h-screen bg-gray-50 relative overflow-hidden'>
            <FuturisticBackground />
            <Navbar />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-7xl mx-auto my-10 px-4 relative z-10'
            >
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2 text-[#6A38C2] mb-1'>
                            <Briefcase size={20} />
                            <span className='text-xs font-black uppercase tracking-widest'>Admin Dashboard</span>
                        </div>
                        <h1 className='text-4xl font-black text-gray-900 tracking-tight'>Manage <span className='text-[#6A38C2]'>Jobs</span></h1>
                        <p className='text-gray-500 font-bold'>Create, edit and manage your job listings</p>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <div className='relative w-full sm:w-72 group'>
                            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                            <input
                                className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                placeholder='Filter by role or company...'
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/admin/jobs/create")} 
                            className='w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1a1a1a] text-white rounded-2xl hover:bg-black transition-all duration-300 font-black text-sm shadow-lg shadow-black/10'
                        >
                            <Plus size={18} />
                            <span>New Job</span>
                        </motion.button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className='bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 shadow-2xl shadow-black/5'
                >
                    <AdminJobsTable />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default AdminJobs
