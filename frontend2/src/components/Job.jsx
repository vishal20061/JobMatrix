import React, { useState, useEffect } from 'react'
import { Bookmark, MapPin, Briefcase, DollarSign, Clock, Layout } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { setSavedJobs } from '../redux/jobSlice'

const Job = ({ job }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const { savedJobs } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    const isSaved = savedJobs?.some((savedJob) => savedJob?._id === job?._id);

    const saveJobHandler = () => {
        if (!job) return;
        let updatedSavedJobs = [...savedJobs];
        if (isSaved) {
            updatedSavedJobs = updatedSavedJobs.filter((savedJob) => savedJob?._id !== job._id);
            toast.info("Job removed from saved list");
        } else {
            updatedSavedJobs.push(job);
            toast.success("Job saved successfully");
        }
        dispatch(setSavedJobs(updatedSavedJobs));
        localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
    }

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

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime.getTime() - createdAt.getTime();
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <motion.div
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(106, 56, 194, 0.1), 0 10px 10px -5px rgba(106, 56, 194, 0.04)" }}
            className='p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 flex flex-col h-full'
        >
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1 text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md'>
                    <Clock size={12} />
                    <span>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
                </div>
                <button 
                    onClick={saveJobHandler}
                    className='p-2 rounded-full hover:bg-[#6A38C2]/5 text-gray-400 hover:text-[#6A38C2] transition-colors'
                >
                    <Bookmark size={18} className={isSaved ? 'fill-[#6A38C2] text-[#6A38C2]' : ''} />
                </button>
            </div>

            <div className='flex items-center gap-4 my-5'>
                <div className='w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-white p-1 shadow-sm'>
                    <img src={job?.company?.logo || "https://picsum.photos/seed/company/100/100"} alt="logo" className='w-full h-full object-contain' />
                </div>
                <div>
                    <h1 className='font-bold text-lg leading-tight text-gray-800'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1 text-xs text-gray-500 mt-1'>
                        <MapPin size={12} className='text-[#6A38C2]' />
                        <span>{job?.location}</span>
                    </div>
                </div>
            </div>

            <div className='flex-grow'>
                <h1 className='font-bold text-xl mb-2 text-gray-900'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-5 flex-wrap'>
                <div className='flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100'>
                    <Briefcase size={12} />
                    <span>{job?.position} Positions</span>
                </div>
                <div className='flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#F83002]/10 text-[#F83002] border border-[#F83002]/20'>
                    <Layout size={12} />
                    <span>{job?.jobType}</span>
                </div>
                <div className='flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#7209b7]/10 text-[#7209b7] border border-[#7209b7]/20'>
                    <DollarSign size={12} />
                    <span>{job?.salary} LPA</span>
                </div>
            </div>

            <div className='flex items-center gap-3 mt-8'>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className='flex-1 py-2.5 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700'
                >
                    Details
                </motion.button>
                {user && (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={saveJobHandler}
                        className='flex-1 py-2.5 text-sm font-bold bg-[#6A38C2] text-white rounded-xl hover:bg-[#5b30a6] transition-colors shadow-lg shadow-[#6A38C2]/20'
                    >
                        {isSaved ? 'Saved ✓' : 'Save'}
                    </motion.button>
                )}
            </div>
        </motion.div>
    )
}

export default Job
