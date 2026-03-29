import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { 
    User, 
    Mail, 
    Phone, 
    Globe, 
    Plus, 
    Trash2, 
    Download, 
    Briefcase, 
    GraduationCap, 
    Wrench, 
    FileText,
    Sparkles
} from 'lucide-react';
import FuturisticBackground from '../components/FuturisticBackground';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            website: '',
            linkedin: '',
            summary: ''
        },
        experience: [{ company: '', role: '', duration: '', description: '' }],
        education: [{ school: '', degree: '', year: '' }],
        skills: [''],
        projects: [{ title: '', link: '', description: '' }]
    });

    const resumeRef = useRef();

    const handlePersonalInfoChange = (e) => {
        setResumeData({
            ...resumeData,
            personalInfo: { ...resumeData.personalInfo, [e.target.name]: e.target.value }
        });
    };

    const handleArrayChange = (index, field, value, type) => {
        const newArray = [...resumeData[type]];
        newArray[index][field] = value;
        setResumeData({ ...resumeData, [type]: newArray });
    };

    const addArrayItem = (type, defaultObj) => {
        setResumeData({ ...resumeData, [type]: [...resumeData[type], defaultObj] });
    };

    const removeArrayItem = (index, type) => {
        const newArray = resumeData[type].filter((_, i) => i !== index);
        setResumeData({ ...resumeData, [type]: newArray });
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...resumeData.skills];
        newSkills[index] = value;
        setResumeData({ ...resumeData, skills: newSkills });
    };

    const addSkill = () => {
        setResumeData({ ...resumeData, skills: [...resumeData.skills, ''] });
    };

    const removeSkill = (index) => {
        const newSkills = resumeData.skills.filter((_, i) => i !== index);
        setResumeData({ ...resumeData, skills: newSkills });
    };

    const handleDownload = () => {
        const element = resumeRef.current;
        const opt = {
            margin: 0,
            filename: `${resumeData.personalInfo.fullName || 'Resume'}_JobMatrix.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            <FuturisticBackground />
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-2 px-4 py-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-full border border-[#6A38C2]/10 mb-6'
                    >
                        <Sparkles size={16} />
                        <span className='text-xs font-black uppercase tracking-widest'>AI Powered Builder</span>
                    </motion.div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
                        Professional <span className="text-[#6A38C2]">Resume Builder</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
                        Create a high-impact resume in minutes. Fill in your details and download a print-ready PDF.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Editor Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 no-print"
                    >
                        {/* Personal Info */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="text-[#6A38C2]" size={24} />
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Personal Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} placeholder="John Doe" />
                                <Input label="Email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="john@example.com" />
                                <Input label="Phone" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="+91 9876543210" />
                                <Input label="Website" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} placeholder="portfolio.com" />
                                <div className="md:col-span-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Professional Summary</label>
                                    <textarea 
                                        name="summary"
                                        value={resumeData.personalInfo.summary}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-sm min-h-[100px] resize-none"
                                        placeholder="Briefly describe your professional background and goals..."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Experience */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Briefcase className="text-[#6A38C2]" size={24} />
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Experience</h2>
                                </div>
                                <button onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', description: '' })} className="p-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2]/10 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="space-y-6">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={index} className="p-6 bg-gray-50 rounded-3xl relative group">
                                        <button onClick={() => removeArrayItem(index, 'experience')} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label="Company" value={exp.company} onChange={(e) => handleArrayChange(index, 'company', e.target.value, 'experience')} />
                                            <Input label="Role" value={exp.role} onChange={(e) => handleArrayChange(index, 'role', e.target.value, 'experience')} />
                                            <Input label="Duration" value={exp.duration} onChange={(e) => handleArrayChange(index, 'duration', e.target.value, 'experience')} placeholder="Jan 2020 - Present" />
                                            <div className="md:col-span-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                                                <textarea 
                                                    value={exp.description}
                                                    onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'experience')}
                                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-sm min-h-[80px] resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="text-[#6A38C2]" size={24} />
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Education</h2>
                                </div>
                                <button onClick={() => addArrayItem('education', { school: '', degree: '', year: '' })} className="p-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2]/10 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="space-y-6">
                                {resumeData.education.map((edu, index) => (
                                    <div key={index} className="p-6 bg-gray-50 rounded-3xl relative group">
                                        <button onClick={() => removeArrayItem(index, 'education')} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label="School/University" value={edu.school} onChange={(e) => handleArrayChange(index, 'school', e.target.value, 'education')} />
                                            <Input label="Degree" value={edu.degree} onChange={(e) => handleArrayChange(index, 'degree', e.target.value, 'education')} />
                                            <Input label="Year" value={edu.year} onChange={(e) => handleArrayChange(index, 'year', e.target.value, 'education')} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Wrench className="text-[#6A38C2]" size={24} />
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Skills</h2>
                                </div>
                                <button onClick={addSkill} className="p-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2]/10 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {resumeData.skills.map((skill, index) => (
                                    <div key={index} className="relative group">
                                        <input 
                                            value={skill}
                                            onChange={(e) => handleSkillChange(index, e.target.value)}
                                            className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-sm min-w-[120px]"
                                            placeholder="Skill..."
                                        />
                                        <button onClick={() => removeSkill(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </motion.div>

                    {/* Preview Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="sticky top-24 h-fit"
                    >
                        <div className="flex items-center justify-between mb-6 no-print">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Live Preview</h2>
                            <button 
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg shadow-black/10"
                            >
                                <Download size={18} />
                                <span>Download PDF</span>
                            </button>
                        </div>

                        <div 
                            ref={resumeRef}
                            className="bg-white p-12 shadow-2xl rounded-[2.5rem] border border-gray-100 min-h-[842px] w-full print:shadow-none print:border-none print:p-0 print:rounded-none"
                        >
                            {/* Resume Template */}
                            <div className="space-y-8">
                                <div className="text-center border-b-2 border-gray-900 pb-8">
                                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                                        {resumeData.personalInfo.fullName || 'YOUR NAME'}
                                    </h1>
                                    <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-500">
                                        {resumeData.personalInfo.email && <span className="flex items-center gap-2"><Mail size={14} /> {resumeData.personalInfo.email}</span>}
                                        {resumeData.personalInfo.phone && <span className="flex items-center gap-2"><Phone size={14} /> {resumeData.personalInfo.phone}</span>}
                                        {resumeData.personalInfo.website && <span className="flex items-center gap-2"><Globe size={14} /> {resumeData.personalInfo.website}</span>}
                                    </div>
                                </div>

                                {resumeData.personalInfo.summary && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Professional Summary</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{resumeData.personalInfo.summary}</p>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Experience</h3>
                                    <div className="space-y-6">
                                        {resumeData.experience.map((exp, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-black text-gray-900">{exp.role || 'Job Title'}</h4>
                                                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{exp.duration}</span>
                                                </div>
                                                <p className="text-sm font-bold text-[#6A38C2]">{exp.company || 'Company Name'}</p>
                                                <p className="text-sm text-gray-600 leading-relaxed font-medium">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Education</h3>
                                    <div className="space-y-4">
                                        {resumeData.education.map((edu, i) => (
                                            <div key={i} className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-black text-gray-900">{edu.degree || 'Degree Name'}</h4>
                                                    <p className="text-sm font-bold text-[#6A38C2]">{edu.school || 'University Name'}</p>
                                                </div>
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{edu.year}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resumeData.skills.filter(s => s).map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-900 text-xs font-black rounded-lg uppercase tracking-wider">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:border-none { border: none !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:rounded-none { border-radius: 0 !important; }
                    @page { margin: 20mm; }
                }
            `}</style>
        </div>
    );
};

const Input = ({ label, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <input 
            {...props}
            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-sm transition-all"
        />
    </div>
);

export default ResumeBuilder;
