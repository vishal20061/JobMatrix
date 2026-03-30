import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Building2, Briefcase, Calendar } from 'lucide-react'

const SavedJobsTable = () => {
    const { savedJobs } = useSelector(store => store.job);
    console.log(savedJobs)
    const navigate = useNavigate();

    return (
        <div className='overflow-x-auto custom-scrollbar'>
            <table className='w-full text-left border-separate border-spacing-y-3'>
                <thead>
                    <tr className='text-gray-400'>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Company</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Role</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Date Saved</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        savedJobs?.length <= 0 ? (
                            <tr>
                                <td colSpan={4} className='text-center py-20'>
                                    <div className='flex flex-col items-center gap-4'>
                                        <div className='p-4 bg-gray-50 rounded-full text-gray-300'>
                                            <ExternalLink size={32} />
                                        </div>
                                        <p className='text-gray-500 font-bold'>You haven't saved any jobs yet.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            savedJobs?.filter(job => !!job).map((job, index) => (
                                <motion.tr
                                    key={job._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className='group bg-white hover:bg-gray-50/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl'
                                >
                                    <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-gray-100 group-hover:border-[#6A38C2]/20'>
                                        <div className='flex items-center gap-3'>
                                            <div className='h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm'>
                                                <img src={job.company.logo || "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"} alt="" className='w-8 h-8 object-contain' />
                                            </div>
                                            <span className='font-black text-gray-900'>{job?.company?.name}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                        <div className='flex items-center gap-2 text-gray-600'>
                                            <Briefcase size={14} className='text-[#6A38C2]/60' />
                                            <span className='text-sm font-bold text-gray-700'>{job?.title}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                        <div className='flex items-center gap-2 text-gray-500'>
                                            <Calendar size={14} className='text-gray-400' />
                                            <span className='text-sm font-medium text-gray-500'>{job?.createdAt?.split("T")[0]}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-gray-100 group-hover:border-[#6A38C2]/20 text-right'>
                                        <motion.button
                                            whileHover={{ scale: 1.05, x: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate(`/description/${job._id}`)}
                                            className='inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-black text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-300 shadow-sm'
                                        >
                                            View Details
                                            <ExternalLink size={14} />
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SavedJobsTable
