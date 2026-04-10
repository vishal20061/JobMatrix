import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Edit2, Eye, Building2, Briefcase, Calendar, Users, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { setAllAdminJobs } from '../../redux/jobSlice'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = React.useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteJobHandler = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                const updatedJobs = allAdminJobs.filter((job) => job._id !== jobId);
                dispatch(setAllAdminJobs(updatedJobs));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    React.useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className='overflow-x-auto custom-scrollbar'>
            <table className='w-full text-left border-separate border-spacing-y-3'>
                <thead>
                    <tr className='text-gray-400'>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Company</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Role</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Date</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest text-right'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterJobs?.map((job, index) => (
                            <motion.tr 
                                key={job._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className='group bg-white hover:bg-gray-50/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl'
                            >
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-[#F83002]/5 text-[#F83002] rounded-xl'>
                                            <Building2 size={16} />
                                        </div>
                                        <span className='text-sm font-black text-gray-900'>{job?.company?.name}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <Briefcase size={14} className='text-[#6A38C2]/60' />
                                        <span className='text-sm font-bold'>{job?.title}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2 text-gray-500'>
                                        <Calendar size={14} className='text-gray-400' />
                                        <span className='text-sm font-bold'>{job?.createdAt.split("T")[0]}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-gray-100 group-hover:border-[#6A38C2]/20 text-right'>
                                    <div className='flex items-center justify-end gap-3'>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className='p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300'
                                            title="View Applicants"
                                        >
                                            <Users size={18} />
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                            className='p-2.5 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2] hover:text-white transition-all duration-300'
                                            title="Edit Job"
                                        >
                                            <Edit2 size={18} />
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => deleteJobHandler(job._id)}
                                            className='p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300'
                                            title="Delete Job"
                                        >
                                            <Trash2 size={18} />
                                        </motion.button>
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

export default AdminJobsTable
