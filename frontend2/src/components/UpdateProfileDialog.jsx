import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '../redux/authSlice'
import { toast } from 'sonner'
import { Loader2, X, User, Mail, Phone, FileText, Award, Info, Camera } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNum: user?.phoneNum || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    });
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!open || !user) return;
        setInput({
            fullName: user.fullName || "",
            email: user.email || "",
            phoneNum: user.phoneNum || "",
            bio: user.profile?.bio || "",
            skills: user.profile?.skills?.join(', ') || "",
            file: null
        });
        setProfilePhotoFile(null);
        setProfilePhotoPreview(null);
    }, [open, user]);

    useEffect(() => {
        return () => {
            if (profilePhotoPreview?.startsWith('blob:')) {
                URL.revokeObjectURL(profilePhotoPreview);
            }
        };
    }, [profilePhotoPreview]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file: file || null });
    }

    const profilePhotoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setProfilePhotoFile(file || null);
        if (profilePhotoPreview?.startsWith('blob:')) {
            URL.revokeObjectURL(profilePhotoPreview);
        }
        setProfilePhotoPreview(file ? URL.createObjectURL(file) : null);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNum", input.phoneNum);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        if (profilePhotoFile) {
            formData.append("profilePhoto", profilePhotoFile);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className='absolute inset-0 bg-black/60 backdrop-blur-md'
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className='relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20'
                    >
                        <div className='flex items-center justify-between p-8 border-b border-gray-100 bg-gray-50/50'>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-[#6A38C2]/10 text-[#6A38C2] rounded-xl'>
                                    <User size={20} />
                                </div>
                                <h2 className='text-2xl font-black text-gray-900 uppercase tracking-tight'>Update Profile</h2>
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setOpen(false)} 
                                className='p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400'
                            >
                                <X size={20} />
                            </motion.button>
                        </div>
                        
                        <form onSubmit={submitHandler} className='p-8 md:p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar'>
                            <div className='flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100'>
                                <div className='relative shrink-0'>
                                    <div className='h-28 w-28 rounded-[1.75rem] overflow-hidden border-4 border-white shadow-lg ring-2 ring-[#6A38C2]/20'>
                                        <img
                                            src={profilePhotoPreview || user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                            alt="Profile"
                                            className='w-full h-full object-cover'
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <label className='absolute -bottom-1 -right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-[#6A38C2] text-white shadow-lg hover:bg-[#5b30a6] transition-colors'>
                                        <Camera size={18} />
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            className='hidden'
                                            onChange={profilePhotoChangeHandler}
                                        />
                                    </label>
                                </div>
                                <div className='text-center sm:text-left flex-1'>
                                    <p className='text-xs font-black text-gray-400 uppercase tracking-widest mb-1'>Profile photo</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                <InputField 
                                    icon={<User size={18} />}
                                    label="Full Name"
                                    name="fullName"
                                    value={input.fullName}
                                    onChange={changeEventHandler}
                                />
                                <InputField 
                                    icon={<Mail size={18} />}
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                />
                                <InputField 
                                    icon={<Phone size={18} />}
                                    label="Phone Number"
                                    name="phoneNum"
                                    value={input.phoneNum}
                                    onChange={changeEventHandler}
                                />
                                {user?.role !== 'recruiter' && (
                                    <InputField 
                                        icon={<Award size={18} />}
                                        label="Skills (Comma separated)"
                                        name="skills"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        placeholder="React, Node, MongoDB"
                                    />
                                )}
                            </div>

                            <div className='space-y-2'>
                                <label className='flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                                    <Info size={14} /> Professional Summary
                                </label>
                                <textarea
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none min-h-[120px] font-bold text-gray-700 transition-all'
                                    placeholder="Tell us about your professional journey..."
                                />
                            </div>

                            {user?.role !== 'recruiter' && (
                                <div className='space-y-2'>
                                    <label className='flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                                        <FileText size={14} /> Resume / Portfolio
                                    </label>
                                    <div className='relative group'>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={fileChangeHandler}
                                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                                        />
                                        <div className='w-full px-6 py-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-[#6A38C2]/40 transition-all'>
                                            <FileText size={24} className='text-gray-400 group-hover:text-[#6A38C2]' />
                                            <p className='text-sm font-bold text-gray-500'>
                                                {input.file ? input.file.name : "Click or drag to upload resume (PDF)"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className='pt-6'>
                                {
                                    loading ? (
                                        <button disabled className='w-full py-5 bg-[#6A38C2] text-white rounded-2xl flex items-center justify-center gap-3 opacity-70 font-black uppercase tracking-widest'>
                                            <Loader2 className='animate-spin' /> Processing...
                                        </button>
                                    ) : (
                                        <motion.button 
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit" 
                                            className='w-full py-5 bg-gradient-to-r from-[#6A38C2] to-[#7209b7] text-white rounded-2xl shadow-xl shadow-[#6A38C2]/20 font-black uppercase tracking-widest'
                                        >
                                            Save Profile Changes
                                        </motion.button>
                                    )
                                }
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

const InputField = ({ icon, label, ...props }) => (
    <div className='space-y-2'>
        <label className='flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
            {icon} {label}
        </label>
        <input
            {...props}
            className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 focus:border-[#6A38C2] outline-none font-bold text-gray-700 transition-all'
        />
    </div>
)

export default UpdateProfileDialog
