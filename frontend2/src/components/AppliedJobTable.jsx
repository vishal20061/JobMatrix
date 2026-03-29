import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { Calendar, Briefcase, Building2, CheckCircle2, Clock, XCircle } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);
    
    return (
        <div className='overflow-x-auto custom-scrollbar'>
            <table className='w-full text-left border-separate border-spacing-y-3'>
                <thead>
                    <tr className='text-gray-400'>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Date</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Position</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Company</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest text-right'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <tr>
                                <td colSpan={4} className='py-20 text-center'>
                                    <div className='flex flex-col items-center gap-4'>
                                        <div className='p-4 bg-gray-50 rounded-full text-gray-300'>
                                            <Briefcase size={32} />
                                        </div>
                                        <p className='text-gray-500 font-bold'>Your application history is empty.</p>
                                        <p className='text-gray-400 text-sm'>Start applying to premium roles today!</p>
                                    </div>
                                </td>
                            </tr>
                        ) : allAppliedJobs.map((appliedJob, index) => (
                            <motion.tr 
                                key={appliedJob._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className='group bg-white hover:bg-gray-50/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl'
                            >
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2 text-gray-500'>
                                        <Calendar size={14} className='text-[#6A38C2]/60' />
                                        <span className='text-sm font-bold'>{appliedJob.createdAt?.split("T")[0]}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <span className='text-sm font-black text-gray-900'>{appliedJob.job?.title}</span>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <Building2 size={14} className='text-[#F83002]/60' />
                                        <span className='text-sm font-bold'>{appliedJob.job?.company?.name}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-gray-100 group-hover:border-[#6A38C2]/20 text-right'>
                                    <div className='flex justify-end'>
                                        <StatusBadge status={appliedJob.status} />
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

const StatusBadge = ({ status }) => {
    const config = {
        rejected: {
            bg: 'bg-red-50',
            text: 'text-red-600',
            border: 'border-red-100',
            icon: <XCircle size={12} />
        },
        pending: {
            bg: 'bg-amber-50',
            text: 'text-amber-600',
            border: 'border-amber-100',
            icon: <Clock size={12} />
        },
        accepted: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-100',
            icon: <CheckCircle2 size={12} />
        }
    };

    const current = config[status] || config.pending;

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${current.bg} ${current.text} ${current.border}`}>
            {current.icon}
            {status}
        </div>
    );
};

export default AppliedJobTable
