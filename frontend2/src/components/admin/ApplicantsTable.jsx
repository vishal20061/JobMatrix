import React from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { MoreHorizontal, User, Mail, Phone, FileText, Calendar, CheckCircle2, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ applicants }) => {
    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='overflow-x-auto custom-scrollbar'>
            <table className='w-full text-left border-separate border-spacing-y-3'>
                <thead>
                    <tr className='text-gray-400'>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Applicant</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Contact</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Resume</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Applied Date</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicants && applicants?.applications?.map((item, index) => (
                            <motion.tr 
                                key={item._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className='group bg-white hover:bg-gray-50/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl'
                            >
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-blue-50 text-blue-600 rounded-xl'>
                                            <User size={16} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm font-black text-gray-900'>{item?.applicant?.fullname}</span>
                                            <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                <Mail size={10} />
                                                <span>{item?.applicant?.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <Phone size={14} className='text-gray-400' />
                                        <span className='text-sm font-bold'>{item?.applicant?.phoneNum}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    {
                                        item.applicant?.profile?.resume ? (
                                            <a 
                                                className="flex items-center gap-2 text-[#6A38C2] hover:text-[#5b30a6] font-bold text-sm transition-colors" 
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noreferrer"
                                            >
                                                <FileText size={14} />
                                                <span className='max-w-[150px] truncate'>{item?.applicant?.profile?.resumeOriginalName}</span>
                                            </a>
                                        ) : <span className='text-sm text-gray-400 font-bold'>NA</span>
                                    }
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2 text-gray-500'>
                                        <Calendar size={14} className='text-gray-400' />
                                        <span className='text-sm font-bold'>{item?.createdAt.split("T")[0]}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-gray-100 group-hover:border-[#6A38C2]/20 text-right'>
                                    <div className='relative group/menu inline-block'>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className='p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 transition-all duration-300'
                                        >
                                            <MoreHorizontal size={18} />
                                        </motion.button>
                                        <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 z-20 p-2'>
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <motion.div 
                                                        key={index} 
                                                        whileHover={{ x: 5 }}
                                                        onClick={() => statusHandler(status, item?._id)} 
                                                        className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer text-sm font-bold transition-all duration-200 ${
                                                            status === 'Accepted' 
                                                            ? 'text-green-600 hover:bg-green-50' 
                                                            : 'text-red-600 hover:bg-red-50'
                                                        }`}
                                                    >
                                                        {status === 'Accepted' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                                        <span>{status}</span>
                                                    </motion.div>
                                                ))
                                            }
                                        </div>
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

export default ApplicantsTable
