import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'
import CompaniesTable from '../../components/admin/CompaniesTable'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { Plus, Search, Building2 } from 'lucide-react'
import { motion } from 'motion/react'
import FuturisticBackground from '../../components/FuturisticBackground'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
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
                        <div className='flex items-center gap-2 text-[#F83002] mb-1'>
                            <Building2 size={20} />
                            <span className='text-xs font-black uppercase tracking-widest'>Admin Dashboard</span>
                        </div>
                        <h1 className='text-4xl font-black text-gray-900 tracking-tight'>Your <span className='text-[#F83002]'>Companies</span></h1>
                        <p className='text-gray-500 font-bold'>Manage your registered companies and their details</p>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <div className='relative w-full sm:w-72 group'>
                            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F83002] transition-colors' size={18} />
                            <input
                                className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#F83002]/10 focus:border-[#F83002] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                placeholder='Search companies...'
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/admin/companies/create")} 
                            className='w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1a1a1a] text-white rounded-2xl hover:bg-black transition-all duration-300 font-black text-sm shadow-lg shadow-black/10'
                        >
                            <Plus size={18} />
                            <span>New Company</span>
                        </motion.button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className='bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 shadow-2xl shadow-black/5'
                >
                    <CompaniesTable />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Companies
