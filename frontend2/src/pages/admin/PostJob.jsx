import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, FileText, Code, IndianRupee, MapPin, Clock, Users, Building2, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import FuturisticBackground from '../../components/FuturisticBackground'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        company: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        setInput({ ...input, company: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // if (!input.company) {
        //     toast.error("Please select a company first!");
        //     return;
        // }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 relative overflow-hidden'>
            <FuturisticBackground />
            <Navbar />
            <div className='flex items-center justify-center w-full my-10 px-4 relative z-10'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='p-10 max-w-4xl w-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-2xl shadow-black/5'
                >
                    <div className='mb-10'>
                        <div className='flex items-center gap-2 text-[#6A38C2] mb-2'>
                            <Plus size={24} />
                            <span className='text-sm font-black uppercase tracking-widest'>Recruitment Center</span>
                        </div>
                        <h1 className='text-4xl font-black text-gray-900 tracking-tight'>Post New <span className='text-[#6A38C2]'>Job Listing</span></h1>
                        <p className='text-gray-500 font-bold text-lg'>Reach thousands of talented candidates by posting your job here.</p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Job Title</label>
                                <div className='relative group'>
                                    <Briefcase className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                        placeholder='Software Engineer, Product Designer...'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Salary (LPA)</label>
                                <div className='relative group'>
                                    <IndianRupee className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                        placeholder='e.g. 12-15'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Location</label>
                                <div className='relative group'>
                                    <MapPin className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                        placeholder='Remote, Bangalore, Mumbai...'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Job Type</label>
                                <div className='relative group'>
                                    <Clock className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        placeholder="Full-time, Internship, Contract"
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Experience Level (yrs)</label>
                                <div className='relative group'>
                                    <Users className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                        placeholder='e.g. 2-5'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>No. of Positions</label>
                                <div className='relative group'>
                                    <Users className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:col-span-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Requirements</label>
                                <div className='relative group'>
                                    <Code className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        placeholder="React, Node.js, Python (Comma separated)"
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:col-span-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Job Description</label>
                                <div className='relative group'>
                                    <FileText className='absolute left-4 top-5 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                    <textarea
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm min-h-[120px] resize-none'
                                        placeholder='Detailed job description and responsibilities...'
                                    />
                                </div>
                            </div>

                            {
                                companies.length > 0 && (
                                    <div className='flex flex-col gap-2 md:col-span-2'>
                                        <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Select Company</label>
                                        <div className='relative group'>
                                            <Building2 className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6A38C2] transition-colors' size={18} />
                                            <select
                                                onChange={selectChangeHandler}
                                                className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none transition-all duration-300 font-bold text-sm shadow-sm appearance-none'
                                            >
                                                <option value="">Select a company</option>
                                                {
                                                    companies.map((company) => (
                                                        <option key={company._id} value={company._id}>{company.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className='pt-10'>
                            {
                                loading ? (
                                    <button disabled className='w-full py-4 bg-[#1a1a1a] text-white rounded-2xl flex items-center justify-center gap-3 opacity-70 font-black'>
                                        <Loader2 className='animate-spin' size={20} />
                                        <span>Posting Job...</span>
                                    </button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02, translateY: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className='w-full py-4 bg-[#1a1a1a] text-white rounded-2xl hover:bg-black transition-all duration-300 font-black shadow-lg shadow-black/10'
                                    >
                                        Post Job Now
                                    </motion.button>
                                )
                            }
                            {
                                companies.length === 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className='text-xs text-red-600 font-black text-center mt-4 uppercase tracking-wider'
                                    >
                                        * Please register a company first, before posting a job
                                    </motion.p>
                                )
                            }
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default PostJob
