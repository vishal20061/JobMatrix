import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'
import { Building2, ArrowRight, X } from 'lucide-react'
import { motion } from 'motion/react'
import FuturisticBackground from '../../components/FuturisticBackground'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 relative overflow-hidden'>
            <FuturisticBackground />
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-20 relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-12 shadow-2xl shadow-black/5'
                >
                    <div className='mb-10'>
                        <div className='flex items-center gap-2 text-[#F83002] mb-3'>
                            <Building2 size={24} />
                            <span className='text-sm font-black uppercase tracking-widest'>Setup your business</span>
                        </div>
                        <h1 className='text-4xl font-black text-gray-900 tracking-tight mb-2'>What's your <span className='text-[#F83002]'>Company Name?</span></h1>
                        <p className='text-gray-500 font-bold text-lg'>Give your company a professional identity. You can always change this later in your settings.</p>
                    </div>

                    <div className='space-y-8'>
                        <div className='flex flex-col gap-3'>
                            <label className='text-sm font-black text-gray-700 uppercase tracking-wider ml-1'>Company Name</label>
                            <input
                                type="text"
                                className='w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#F83002]/10 focus:border-[#F83002] outline-none transition-all duration-300 font-bold text-lg shadow-sm placeholder:text-gray-300'
                                placeholder='e.g. TechFlow, InnovateX, Microsoft'
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center gap-4 pt-4'>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/admin/companies")} 
                                className='flex items-center gap-2 px-8 py-4 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-black text-gray-600'
                            >
                                <X size={18} />
                                <span>Cancel</span>
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={registerNewCompany} 
                                className='flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white rounded-2xl hover:bg-black transition-all duration-300 font-black shadow-lg shadow-black/10'
                            >
                                <span>Continue</span>
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanyCreate