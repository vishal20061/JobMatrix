import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'
import ApplicantsTable from '../../components/admin/ApplicantsTable'
import { Users, ChevronLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import FuturisticBackground from '../../components/FuturisticBackground'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className='min-h-screen bg-gray-50 relative overflow-hidden'>
            <FuturisticBackground />
            <Navbar />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-7xl mx-auto my-10 px-4 relative z-10'
            >
                <div className='flex flex-col gap-6 mb-10'>
                    <motion.button 
                        whileHover={{ x: -5 }}
                        onClick={() => navigate(-1)}
                        className='flex items-center gap-2 text-gray-500 hover:text-[#6A38C2] font-bold transition-colors w-fit'
                    >
                        <ChevronLeft size={20} />
                        <span>Back to Jobs</span>
                    </motion.button>

                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2 text-[#6A38C2] mb-1'>
                            <Users size={20} />
                            <span className='text-xs font-black uppercase tracking-widest'>Application Management</span>
                        </div>
                        <h1 className='text-4xl font-black text-gray-900 tracking-tight'>
                            Job <span className='text-[#6A38C2]'>Applicants</span>
                            <span className='ml-4 px-4 py-1 bg-[#6A38C2]/10 text-[#6A38C2] text-lg rounded-full align-middle'>
                                {applicants?.applications?.length || 0}
                            </span>
                        </h1>
                        <p className='text-gray-500 font-bold'>Review and manage candidates for this position</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className='bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 shadow-2xl shadow-black/5'
                >
                    <ApplicantsTable applicants={applicants} />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Applicants
