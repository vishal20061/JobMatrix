import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../redux/authSlice'
import { Loader2, User, Mail, Phone, Lock, UserCircle, Upload } from 'lucide-react'
import { motion } from 'motion/react'
import FuturisticBackground from '../components/FuturisticBackground'
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNum: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.role) {
            toast.error("Please select a role");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNum", input.phoneNum);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${API_URL}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-screen relative overflow-hidden'
        >
            <FuturisticBackground />
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-16 relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-[#6A38C2]/10'
                >
                    <div className='text-center mb-8'>
                        <motion.h1 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='font-bold text-3xl text-gray-900'
                        >
                            Create Account
                        </motion.h1>
                        <p className='text-gray-500 mt-2'>Join our professional network today</p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <User size={16} className='text-[#6A38C2]' /> Full Name
                                </label>
                                <input
                                    type="text"
                                    value={input.fullName}
                                    name="fullName"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/20 focus:border-[#6A38C2] transition-all'
                                    required
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Mail size={16} className='text-[#6A38C2]' /> Email Address
                                </label>
                                <input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="john@example.com"
                                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/20 focus:border-[#6A38C2] transition-all'
                                    required
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Phone size={16} className='text-[#6A38C2]' /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={input.phoneNum}
                                    name="phoneNum"
                                    onChange={changeEventHandler}
                                    placeholder="9876543210"
                                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/20 focus:border-[#6A38C2] transition-all'
                                    required
                                />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Lock size={16} className='text-[#6A38C2]' /> Password
                                </label>
                                <input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/20 focus:border-[#6A38C2] transition-all'
                                    required
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-end'>
                            <div className='space-y-3'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <UserCircle size={16} className='text-[#6A38C2]' /> Select Role
                                </label>
                                <div className='grid grid-cols-2 gap-4'>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${input.role === 'student' ? 'bg-[#6A38C2]/10 border-[#6A38C2] text-[#6A38C2]' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className='hidden'
                                        />
                                        <span className='text-sm font-bold'>Candidate</span>
                                    </label>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${input.role === 'recruiter' ? 'bg-[#6A38C2]/10 border-[#6A38C2] text-[#6A38C2]' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className='hidden'
                                        />
                                        <span className='text-sm font-bold'>Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                    <Upload size={16} className='text-[#6A38C2]' /> Profile Photo
                                </label>
                                <div className='relative'>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className='w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#6A38C2]/10 file:text-[#6A38C2] hover:file:bg-[#6A38C2]/20 cursor-pointer bg-gray-50 rounded-2xl border border-gray-200 p-1'
                                    />
                                </div>
                            </div>
                        </div>

                        {
                            loading ? (
                                <button disabled className='w-full py-4 bg-[#6A38C2] text-white rounded-2xl flex items-center justify-center gap-2 opacity-70 cursor-not-allowed'>
                                    <Loader2 className='animate-spin' /> Creating Account...
                                </button>
                            ) : (
                                <motion.button 
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit" 
                                    className='w-full py-4 bg-[#6A38C2] text-white rounded-2xl hover:bg-[#5b30a6] transition-all font-bold shadow-lg shadow-[#6A38C2]/20'
                                >
                                    Register Account
                                </motion.button>
                            )
                        }
                        
                        <div className='text-center mt-6'>
                            <p className='text-sm text-gray-600'>
                                Already have an account? <Link to="/login" className='text-[#6A38C2] font-bold hover:underline'>Login here</Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Signup
