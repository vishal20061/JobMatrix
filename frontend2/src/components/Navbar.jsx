import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { toast } from 'sonner'
import { LogOut, User, Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(null));
                localStorage.setItem("loggedOut", "true");
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`sticky top-0 z-50 transition-all duration-300 h-20 flex items-center w-full ${scrolled
                ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-md'
                : 'bg-transparent'
                }`}
        >
            <div className='flex items-center justify-between mx-auto max-w-7xl px-4 w-full'>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link to="/">
                        <h1 className='text-2xl font-black tracking-tighter'>Job<span className='text-[#6A38C2]'>Matrix</span></h1>
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-10'>
                    <ul className='flex font-medium items-center gap-8'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='relative group'>
                                        <motion.div whileHover={{ y: -2 }}>
                                            <Link to="/admin/companies" className='hover:text-[#6A38C2] transition-colors'>Companies</Link>
                                        </motion.div>
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A38C2] transition-all group-hover:w-full' />
                                    </li>
                                    <li className='relative group'>
                                        <motion.div whileHover={{ y: -2 }}>
                                            <Link to="/admin/jobs" className='hover:text-[#6A38C2] transition-colors'>Jobs</Link>
                                        </motion.div>
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A38C2] transition-all group-hover:w-full' />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className='relative group'>
                                        <motion.div whileHover={{ y: -2 }}>
                                            <Link to="/" className='hover:text-[#6A38C2] transition-colors'>Home</Link>
                                        </motion.div>
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A38C2] transition-all group-hover:w-full' />
                                    </li>
                                    <li className='relative group'>
                                        <motion.div whileHover={{ y: -2 }}>
                                            <Link to="/jobs" className='hover:text-[#6A38C2] transition-colors'>Jobs</Link>
                                        </motion.div>
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A38C2] transition-all group-hover:w-full' />
                                    </li>
                                    <li className='relative group'>
                                        <motion.div whileHover={{ y: -2 }}>
                                            <Link to="/browse" className='hover:text-[#6A38C2] transition-colors'>Browse</Link>
                                        </motion.div>
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A38C2] transition-all group-hover:w-full' />
                                    </li>
                                    <li className='relative group'>
                                        <motion.div whileHover={{ y: -2 }}>
                                            <Link to="/resume-builder" className='hover:text-[#6A38C2] transition-colors'>Resume</Link>
                                        </motion.div>
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A38C2] transition-all group-hover:w-full' />
                                    </li>
                                    <li className='relative group'>
                                        <motion.div whileHover={{ y: -2 }}>
                                            <Link to="/career-advice" className='hover:text-[#6A38C2] transition-colors'>Advice</Link>
                                        </motion.div>
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A38C2] transition-all group-hover:w-full' />
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/login">
                                    <button className='px-5 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors'>Login</button>
                                </Link>
                                <Link to="/signup">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='px-6 py-2 rounded-xl bg-[#6A38C2] text-white font-medium shadow-lg shadow-[#6A38C2]/20 hover:bg-[#5b30a6] transition-colors'
                                    >
                                        Signup
                                    </motion.button>
                                </Link>
                            </div>
                        ) : (
                            <div className='relative group'>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className='flex items-center gap-2 cursor-pointer bg-white/50 p-1 pr-3 rounded-full border border-gray-100'
                                >
                                    <div className='w-9 h-9 rounded-full overflow-hidden border-2 border-[#6A38C2]'>
                                        <img src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" className='w-full h-full object-cover' referrerPolicy="no-referrer" />
                                    </div>
                                    <ChevronDown size={16} className='text-gray-500 group-hover:rotate-180 transition-transform duration-300' />
                                </motion.div>
                                <div className='absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
                                    <div className='p-5 border-b border-gray-50'>
                                        <h4 className='font-bold text-sm text-gray-800'>{user?.fullName}</h4>
                                        <p className='text-xs text-gray-400 truncate mt-1'>{user?.profile?.bio || "No bio available"}</p>
                                    </div>
                                    <div className='p-2'>
                                        <Link to="/profile" className='flex items-center gap-3 p-3 hover:bg-[#6A38C2]/5 rounded-xl text-sm font-medium text-gray-700 transition-colors'>
                                            <User size={18} className='text-[#6A38C2]' />
                                            <span>View Profile</span>
                                        </Link>
                                        <button onClick={logoutHandler} className='w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl text-sm font-medium text-red-600 transition-colors'>
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center'>
                    <button onClick={() => setIsOpen(!isOpen)} className='p-2 text-gray-700'>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl'
                    >
                        <div className='flex flex-col p-6 gap-6'>
                            <ul className='flex flex-col gap-5 font-semibold text-lg'>
                                {
                                    user && user.role === 'recruiter' ? (
                                        <>
                                            <li onClick={() => setIsOpen(false)}><Link to="/admin/companies" className='block py-2'>Companies</Link></li>
                                            <li onClick={() => setIsOpen(false)}><Link to="/admin/jobs" className='block py-2'>Jobs</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li onClick={() => setIsOpen(false)}><Link to="/" className='block py-2'>Home</Link></li>
                                            <li onClick={() => setIsOpen(false)}><Link to="/jobs" className='block py-2'>Jobs</Link></li>
                                            <li onClick={() => setIsOpen(false)}><Link to="/browse" className='block py-2'>Browse</Link></li>
                                            <li onClick={() => setIsOpen(false)}><Link to="/resume-builder" className='block py-2'>Resume</Link></li>
                                            <li onClick={() => setIsOpen(false)}><Link to="/career-advice" className='block py-2'>Career Advice</Link></li>
                                        </>
                                    )
                                }
                            </ul>
                            {
                                !user ? (
                                    <div className='flex flex-col gap-3'>
                                        <Link to="/login" onClick={() => setIsOpen(false)}>
                                            <button className='w-full py-3 rounded-xl border border-gray-200 font-medium'>Login</button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                                            <button className='w-full py-3 rounded-xl bg-[#6A38C2] text-white font-medium'>Signup</button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-2 border-t border-gray-100 pt-6'>
                                        <Link to="/profile" onClick={() => setIsOpen(false)} className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                                            <div className='h-10 w-10 rounded-full overflow-hidden border-2 border-[#6A38C2] shrink-0'>
                                                <img src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="" className='w-full h-full object-cover' referrerPolicy="no-referrer" />
                                            </div>
                                            <span className='font-medium'>Profile</span>
                                        </Link>
                                        <button onClick={() => { logoutHandler(); setIsOpen(false); }} className='flex items-center gap-3 p-3 text-red-600 font-medium'>
                                            <LogOut size={20} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Navbar
