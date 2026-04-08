import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice'
import { Loader2, Mail, Lock, UserCircle } from 'lucide-react'
import { motion } from 'motion/react'
import FuturisticBackground from '../components/FuturisticBackground'
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });
    const { loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.role) {
            toast.error("Please select a role");
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${API_URL}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
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
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-20 relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-[#6A38C2]/10'
                >
                    <div className='text-center mb-8'>
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='font-bold text-3xl text-gray-900'
                        >
                            Welcome Back
                        </motion.h1>
                        <p className='text-gray-500 mt-2'>Login to access your professional dashboard</p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-5'>
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <Mail size={16} className='text-[#6A38C2]' /> Email Address
                            </label>
                            <input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@company.com"
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

                        {
                            loading ? (
                                <button disabled className='w-full py-4 bg-[#6A38C2] text-white rounded-2xl flex items-center justify-center gap-2 opacity-70 cursor-not-allowed'>
                                    <Loader2 className='animate-spin' /> Authenticating...
                                </button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className='w-full py-4 bg-[#6A38C2] text-white rounded-2xl hover:bg-[#5b30a6] transition-all font-bold shadow-lg shadow-[#6A38C2]/20'
                                >
                                    Login to Account
                                </motion.button>
                            )
                        }

                        <div className='text-center mt-6'>
                            <p className='text-sm text-gray-600'>
                                Don't have an account? <Link to="/signup" className='text-[#6A38C2] font-bold hover:underline'>Create Account</Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Login
