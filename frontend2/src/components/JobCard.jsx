import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { MapPin, Briefcase, DollarSign, Clock, Layout } from 'lucide-react'

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div 
            whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 50px -12px rgba(106, 56, 194, 0.2)",
                borderColor: "rgba(106, 56, 194, 0.4)"
            }}
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 cursor-pointer transition-all duration-500 relative overflow-hidden'
        >
            {/* Background Glow on Hover */}
            <div className='absolute -right-10 -top-10 w-32 h-32 bg-[#6A38C2]/5 rounded-full blur-3xl group-hover:bg-[#6A38C2]/10 transition-colors duration-500' />
            
            <div className='flex items-center justify-between relative z-10'>
                <div className='flex items-center gap-1 text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md'>
                    <Clock size={12} />
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className='flex items-center gap-4 my-5 relative z-10'>
                <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className='w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-white p-1'
                >
                    <img 
                        src={job?.company?.logo || "https://picsum.photos/seed/company/100/100"} 
                        alt="logo" 
                        className='w-full h-full object-contain rounded-lg' 
                        referrerPolicy="no-referrer"
                    />
                </motion.div>
                <div>
                    <h1 className='font-bold text-lg text-gray-800 group-hover:text-[#6A38C2] transition-colors'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                        <MapPin size={14} className='text-[#6A38C2]' />
                        <span>{job?.location}</span>
                    </div>
                </div>
            </div>

            <div className='relative z-10'>
                <h1 className='font-bold text-xl mb-2 text-gray-900 group-hover:translate-x-1 transition-transform duration-300'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-auto flex-wrap relative z-10'>
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
            
            {/* Bottom Accent Line */}
            <div className='absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#6A38C2] to-transparent w-0 group-hover:w-full transition-all duration-700' />
        </motion.div>
    )
}

export default JobCard
