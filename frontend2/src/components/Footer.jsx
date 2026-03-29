import React from 'react'
import { motion } from 'motion/react'
import { Twitter, Linkedin, Facebook, Github, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <motion.footer 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white border-t border-gray-100 pt-24 pb-12 relative overflow-hidden"
        >
            {/* Decorative elements */}
            <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#6A38C2]/5 rounded-full blur-3xl -translate-y-1/2' />
            <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-[#F83002]/5 rounded-full blur-3xl translate-y-1/2' />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-6">
                        <motion.h1 
                            whileHover={{ scale: 1.05 }}
                            className='text-3xl font-black tracking-tighter'
                        >
                            Job<span className='text-[#F83002]'>Matrix</span>
                        </motion.h1>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Connecting world-class talent with industry-leading opportunities. We're redefining the future of professional networking and career growth.
                        </p>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3 text-gray-400 hover:text-[#6A38C2] transition-colors cursor-pointer group'>
                                <MapPin size={18} className='group-hover:scale-110 transition-transform' />
                                <span className='text-sm font-bold'>Global Headquarters, Tech City</span>
                            </div>
                            <div className='flex items-center gap-3 text-gray-400 hover:text-[#6A38C2] transition-colors cursor-pointer group'>
                                <Mail size={18} className='group-hover:scale-110 transition-transform' />
                                <span className='text-sm font-bold'>contact@jobmatrix.io</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">For Candidates</h4>
                        <ul className="space-y-4">
                            <FooterLink to="/jobs">Browse Jobs</FooterLink>
                            <FooterLink to="/browse">Job Categories</FooterLink>
                            <FooterLink to="/resume-builder">Resume Builder</FooterLink>
                            <FooterLink to="/career-advice">Career Advice</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">For Employers</h4>
                        <ul className="space-y-4">
                            <FooterLink to="/admin/jobs/create">Post a Job</FooterLink>
                            <FooterLink to="/admin/companies">Talent Search</FooterLink>
                            <FooterLink to="/admin/companies">Enterprise Solutions</FooterLink>
                            <FooterLink to="/admin/companies">Pricing Plans</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">Stay Connected</h4>
                        <p className='text-gray-500 text-sm font-medium mb-6'>Join our newsletter for the latest career insights and premium job alerts.</p>
                        <div className='flex items-center gap-2'>
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className='bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/20 transition-all font-bold'
                            />
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-[#6A38C2] text-white p-3 rounded-xl shadow-lg shadow-[#6A38C2]/20'
                            >
                                <ChevronRight size={20} />
                            </motion.button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8'>
                        <p className="text-sm font-bold text-gray-400">
                            © 2026 Job Matrix. Crafted for the future.
                        </p>
                        <div className='flex gap-6'>
                            <span className='text-xs font-black text-gray-400 hover:text-gray-900 cursor-pointer uppercase tracking-widest transition-colors'>Privacy</span>
                            <span className='text-xs font-black text-gray-400 hover:text-gray-900 cursor-pointer uppercase tracking-widest transition-colors'>Terms</span>
                            <span className='text-xs font-black text-gray-400 hover:text-gray-900 cursor-pointer uppercase tracking-widest transition-colors'>Cookies</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <SocialIcon icon={<Twitter size={18} />} />
                        <SocialIcon icon={<Linkedin size={18} />} />
                        <SocialIcon icon={<Facebook size={18} />} />
                        <SocialIcon icon={<Github size={18} />} />
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}

const FooterLink = ({ children, to = "/" }) => (
    <motion.li 
        whileHover={{ x: 5 }}
        className="text-sm font-bold text-gray-500 hover:text-[#6A38C2] cursor-pointer transition-colors flex items-center gap-2 group"
    >
        <div className='w-1.5 h-1.5 rounded-full bg-[#6A38C2] scale-0 group-hover:scale-100 transition-transform' />
        <Link to={to}>{children}</Link>
    </motion.li>
)

const SocialIcon = ({ icon }) => (
    <motion.div 
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='p-3 bg-gray-50 text-gray-400 hover:text-[#6A38C2] hover:bg-[#6A38C2]/5 rounded-xl transition-all cursor-pointer border border-gray-100'
    >
        {icon}
    </motion.div>
)

const ChevronRight = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
    </svg>
)

export default Footer
