import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJob, setSavedJobs } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'motion/react';
import FuturisticBackground from '../components/FuturisticBackground';
import { MapPin, Briefcase, DollarSign, Users, Calendar, Award, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';

const JobDescription = () => {
    const { singleJob, savedJobs } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some((application) => application?.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const isSaved = savedJobs?.some((job) => job?._id === singleJob?._id);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const saveJobHandler = () => {
        if (!singleJob) return;
        let updatedSavedJobs = [...savedJobs];
        if (isSaved) {
            updatedSavedJobs = updatedSavedJobs.filter((job) => job?._id !== singleJob._id);
            toast.info("Job removed from saved list");
        } else {
            updatedSavedJobs.push(singleJob);
            toast.success("Job saved successfully");
        }
        dispatch(setSavedJobs(updatedSavedJobs));
        localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

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
            <div className='max-w-5xl mx-auto px-4 py-12 relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white/80 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-[#6A38C2]/5'
                >
                    <div className='flex flex-col md:flex-row items-center md:items-start justify-between gap-8'>
                        <div className='text-center md:text-left'>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className='flex items-center justify-center md:justify-start gap-2 mb-4'
                            >
                                <span className='px-4 py-1.5 rounded-xl text-xs font-black bg-[#6A38C2]/10 text-[#6A38C2] border border-[#6A38C2]/20 uppercase tracking-widest'>
                                    {singleJob?.company?.name || "Premium Company"}
                                </span>
                            </motion.div>
                            <h1 className='font-black text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight'>{singleJob?.title}</h1>

                            <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 mt-6'>
                                <div className='flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100'>
                                    <MapPin size={16} className='text-[#6A38C2]' />
                                    <span className='text-sm font-bold'>{singleJob?.location}</span>
                                </div>
                                <div className='flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100'>
                                    <Briefcase size={16} className='text-[#F83002]' />
                                    <span className='text-sm font-bold'>{singleJob?.jobType}</span>
                                </div>
                                <div className='flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100'>
                                    <DollarSign size={16} className='text-green-600' />
                                    <span className='text-sm font-bold'>{singleJob?.salary} LPA</span>
                                </div>
                            </div>
                        </div>

                        {user?.role !== 'recruiter' && (
                            <div className='flex items-center gap-4'>
                                {
                                    user ? <div className='flex items-center gap-4'>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={saveJobHandler}
                                            className={`p-5 rounded-2xl border transition-all duration-300 shadow-xl ${isSaved
                                                ? 'bg-[#6A38C2]/10 border-[#6A38C2]/20 text-[#6A38C2]'
                                                : 'bg-white border-gray-100 text-gray-400 hover:text-[#6A38C2]'
                                                }`}
                                        >
                                            {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
                                        </motion.button>
                                        <motion.button
                                            whileHover={!isApplied ? { scale: 1.05, y: -5 } : {}}
                                            whileTap={!isApplied ? { scale: 0.95 } : {}}
                                            onClick={isApplied ? undefined : applyJobHandler}
                                            disabled={isApplied}
                                            className={`px-10 py-5 rounded-[1.5rem] font-black text-lg transition-all duration-500 shadow-2xl ${isApplied
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                : 'bg-gradient-to-r from-[#6A38C2] to-[#7209b7] text-white hover:shadow-[#6A38C2]/40 shadow-[#6A38C2]/20'
                                                }`}
                                        >
                                            {isApplied ? 'Already Applied' : 'Apply Now'}
                                        </motion.button>
                                    </div> : ""
                                }

                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
                        <div className='md:col-span-2'>
                            <div className='flex items-center gap-2 mb-8'>
                                <Award size={24} className='text-[#6A38C2]' />
                                <h2 className='font-black text-2xl text-gray-900 uppercase tracking-tight'>Job Overview</h2>
                            </div>
                            <div className='bg-gray-50/50 rounded-3xl p-8 border border-gray-100'>
                                <p className='text-gray-600 leading-relaxed text-lg font-medium'>
                                    {singleJob?.description}
                                </p>
                            </div>
                        </div>

                        <div className='space-y-6'>
                            <div className='flex items-center gap-2 mb-8'>
                                <Users size={24} className='text-[#6A38C2]' />
                                <h2 className='font-black text-2xl text-gray-900 uppercase tracking-tight'>Details</h2>
                            </div>

                            <div className='space-y-4'>
                                <DetailItem icon={<Award size={18} />} label="Experience" value={`${singleJob?.experienceLevel} Years`} />
                                <DetailItem icon={<Users size={18} />} label="Applicants" value={singleJob?.applications?.length || 0} />
                                <DetailItem icon={<Calendar size={18} />} label="Posted On" value={singleJob?.createdAt?.split("T")[0]} />
                                <DetailItem icon={<Briefcase size={18} />} label="Positions" value={`${singleJob?.position} Openings`} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

const DetailItem = ({ icon, label, value }) => (
    <motion.div
        whileHover={{ x: 5 }}
        className='flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm'
    >
        <div className='flex items-center gap-3'>
            <div className='p-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl'>
                {icon}
            </div>
            <span className='text-sm font-bold text-gray-500 uppercase tracking-wider'>{label}</span>
        </div>
        <span className='text-sm font-black text-gray-900'>{value}</span>
    </motion.div>
)

export default JobDescription
