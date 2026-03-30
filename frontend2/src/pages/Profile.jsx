import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Contact, Mail, Pen, FileText, Award, Briefcase, Bookmark } from 'lucide-react'
import AppliedJobTable from '../components/AppliedJobTable'
import UpdateProfileDialog from '../components/UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import { motion } from 'motion/react'
import FuturisticBackground from '../components/FuturisticBackground'
import SavedJobsTable from '../components/SavedJobsTable'
import { setSavedJobs } from '../redux/jobSlice'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const localSavedJobs = localStorage.getItem('savedJobs');
        if (localSavedJobs) {
            try {
                const parsedJobs = JSON.parse(localSavedJobs).filter(job => job !== null);
                dispatch(setSavedJobs(parsedJobs));
            } catch (error) {
                console.error("Error parsing savedJobs from localStorage", error);
            }
        }
    }, [dispatch]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-screen relative'
        >
            <FuturisticBackground />
            <Navbar />
            <div className='max-w-5xl mx-auto px-4 py-10 relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-[#6A38C2]/5 mb-10'
                >
                    <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-8'>
                        <div className='flex flex-col md:flex-row items-center gap-8'>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className='h-32 w-32 rounded-[2rem] overflow-hidden border-4 border-[#6A38C2]/20 shadow-xl'
                            >
                                <img src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" className='w-full h-full object-cover' referrerPolicy="no-referrer" />
                            </motion.div>
                            <div className='text-center md:text-left'>
                                <h1 className='font-black text-3xl text-gray-900'>{user?.fullname}</h1>
                                <p className='text-gray-500 mt-2 max-w-md font-medium'>{user?.profile?.bio || "No professional summary added yet."}</p>
                                
                                <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-6'>
                                    <div className='flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100'>
                                        <Mail size={16} className='text-[#6A38C2]' />
                                        <span className='text-sm font-bold'>{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100'>
                                        <Contact size={16} className='text-[#6A38C2]' />
                                        <span className='text-sm font-bold'>{user?.phoneNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setOpen(true)} 
                            className='p-4 rounded-2xl bg-white border border-gray-100 shadow-lg text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-300'
                        >
                            <Pen size={20} />
                        </motion.button>
                    </div>

                    {user?.role !== 'recruiter' && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 pt-12 border-t border-gray-100'>
                            <div>
                                <div className='flex items-center gap-2 mb-6'>
                                    <Award size={20} className='text-[#6A38C2]' />
                                    <h2 className='font-black text-xl text-gray-900 uppercase tracking-tight'>Expertise & Skills</h2>
                                </div>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {
                                        user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                            <motion.span 
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className='px-4 py-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl text-sm font-black border border-[#6A38C2]/10'
                                            >
                                                {item}
                                            </motion.span>
                                        )) : <span className='text-sm text-gray-500 italic'>No skills listed.</span>
                                    }
                                </div>
                            </div>

                            <div>
                                <div className='flex items-center gap-2 mb-6'>
                                    <FileText size={20} className='text-[#6A38C2]' />
                                    <h2 className='font-black text-xl text-gray-900 uppercase tracking-tight'>Resume & Documents</h2>
                                </div>
                                {
                                    user?.profile?.resume ? (
                                        <motion.a 
                                            whileHover={{ x: 5 }}
                                            target='blank' 
                                            href={user?.profile?.resume} 
                                            className='flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group'
                                        >
                                            <div className='p-2 bg-white rounded-xl text-blue-600 shadow-sm'>
                                                <FileText size={20} />
                                            </div>
                                            <div className='flex-1 overflow-hidden'>
                                                <p className='text-sm font-bold text-gray-800 truncate'>{user?.profile?.resumeOriginalName || "Professional_Resume.pdf"}</p>
                                                <p className='text-xs text-blue-600 font-bold group-hover:underline'>Click to view document</p>
                                            </div>
                                        </motion.a>
                                    ) : (
                                        <div className='p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center'>
                                            <p className='text-sm text-gray-500 italic'>No resume uploaded yet.</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </motion.div>

                {user?.role !== 'recruiter' && (
                    <div className='grid grid-cols-1 gap-10'>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/20 shadow-2xl shadow-[#6A38C2]/5'
                        >
                            <div className='flex items-center gap-2 mb-8'>
                                <Briefcase size={22} className='text-[#6A38C2]' />
                                <h2 className='font-black text-2xl text-gray-900 uppercase tracking-tight'>Application History</h2>
                            </div>
                            <AppliedJobTable />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/20 shadow-2xl shadow-[#6A38C2]/5 mb-20'
                        >
                            <div className='flex items-center gap-2 mb-8'>
                                <Bookmark size={22} className='text-[#6A38C2]' />
                                <h2 className='font-black text-2xl text-gray-900 uppercase tracking-tight'>Saved Jobs</h2>
                            </div>
                            <SavedJobsTable />
                        </motion.div>
                    </div>
                )}
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </motion.div>
    )
}

export default Profile
