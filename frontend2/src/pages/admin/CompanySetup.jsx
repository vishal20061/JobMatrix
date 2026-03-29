import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Upload } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'
import { motion } from 'motion/react'
import FuturisticBackground from '../../components/FuturisticBackground'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file: file || null });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null
        })
    }, [singleCompany]);

    return (
        <div className='min-h-screen bg-gray-50 relative overflow-hidden'>
            <FuturisticBackground />
            <Navbar />
            <div className='max-w-3xl mx-auto my-10 px-4 relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-10 shadow-2xl shadow-black/5'
                >
                    <form onSubmit={submitHandler}>
                        <div className='flex items-center gap-6 mb-10'>
                            <motion.button 
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => navigate("/admin/companies")} 
                                className='p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 text-gray-400 hover:text-[#F83002]'
                            >
                                <ArrowLeft size={20} />
                            </motion.button>
                            <div className='flex flex-col'>
                                <div className='flex items-center gap-2 text-[#F83002] mb-1'>
                                    <Building2 size={18} />
                                    <span className='text-xs font-black uppercase tracking-widest'>Company Settings</span>
                                </div>
                                <h1 className='text-3xl font-black text-gray-900 tracking-tight'>Company <span className='text-[#F83002]'>Setup</span></h1>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Company Name</label>
                                <div className='relative group'>
                                    <Building2 className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F83002] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={input.name}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#F83002]/10 focus:border-[#F83002] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                        placeholder='Company Name'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Website</label>
                                <div className='relative group'>
                                    <Globe className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F83002] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#F83002]/10 focus:border-[#F83002] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                        placeholder='https://example.com'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:col-span-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Location</label>
                                <div className='relative group'>
                                    <MapPin className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F83002] transition-colors' size={18} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#F83002]/10 focus:border-[#F83002] outline-none transition-all duration-300 font-bold text-sm shadow-sm'
                                        placeholder='City, Country'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:col-span-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Description</label>
                                <div className='relative group'>
                                    <FileText className='absolute left-4 top-5 text-gray-400 group-focus-within:text-[#F83002] transition-colors' size={18} />
                                    <textarea
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className='w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#F83002]/10 focus:border-[#F83002] outline-none transition-all duration-300 font-bold text-sm shadow-sm min-h-[120px] resize-none'
                                        placeholder='Tell us about your company...'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 md:col-span-2'>
                                <label className='text-xs font-black text-gray-700 uppercase tracking-wider ml-1'>Company Logo</label>
                                <div className='relative group'>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className='hidden'
                                        id="logo-upload"
                                    />
                                    <label 
                                        htmlFor="logo-upload"
                                        className='flex flex-col items-center justify-center w-full py-8 bg-white border-2 border-dashed border-gray-200 rounded-2xl hover:border-[#F83002] hover:bg-[#F83002]/5 transition-all duration-300 cursor-pointer group/upload'
                                    >
                                        <div className='p-3 bg-gray-50 text-gray-400 rounded-xl group-hover/upload:bg-[#F83002]/10 group-hover/upload:text-[#F83002] transition-all duration-300 mb-2'>
                                            <Upload size={24} />
                                        </div>
                                        <span className='text-sm font-black text-gray-500 group-hover/upload:text-[#F83002]'>
                                            {input.file ? input.file.name : 'Click to upload company logo'}
                                        </span>
                                        <span className='text-xs text-gray-400 mt-1'>PNG, JPG up to 5MB</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='pt-10'>
                            {
                                loading ? (
                                    <button disabled className='w-full py-4 bg-[#1a1a1a] text-white rounded-2xl flex items-center justify-center gap-3 opacity-70 font-black'>
                                        <Loader2 className='animate-spin' size={20} /> 
                                        <span>Updating Profile...</span>
                                    </button>
                                ) : (
                                    <motion.button 
                                        whileHover={{ scale: 1.02, translateY: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit" 
                                        className='w-full py-4 bg-[#1a1a1a] text-white rounded-2xl hover:bg-black transition-all duration-300 font-black shadow-lg shadow-black/10'
                                    >
                                        Save Changes
                                    </motion.button>
                                )
                            }
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanySetup
