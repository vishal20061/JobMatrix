import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import {
    User,
    Mail,
    Phone,
    Globe,
    Linkedin,
    Plus,
    Trash2,
    Download,
    Briefcase,
    GraduationCap,
    Wrench,
    FileText,
    Sparkles,
    Layout,
    Palette,
    Type as TypeIcon,
    Code,
    Award,
    Languages,
    Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
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
            summary: '',
            profilePhoto: ''
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: []
    });

    const [config, setConfig] = useState({
        template: 'modern',
        primaryColor: '#6A38C2',
        fontFamily: 'font-sans'
    });

    const resumeRef = useRef();

    // Load from localStorage on mount
    React.useEffect(() => {
        const savedData = localStorage.getItem('resumeData');
        const savedConfig = localStorage.getItem('resumeConfig');
        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
            } catch (e) {
                console.error("Error parsing saved resume data", e);
            }
        }
        if (savedConfig) {
            try {
                setConfig(JSON.parse(savedConfig));
            } catch (e) {
                console.error("Error parsing saved resume config", e);
            }
        }
    }, []);

    // Save to localStorage on change
    React.useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);

    React.useEffect(() => {
        localStorage.setItem('resumeConfig', JSON.stringify(config));
    }, [config]);

    const handlePersonalInfoChange = (e) => {
        setResumeData({
            ...resumeData,
            personalInfo: { ...resumeData.personalInfo, [e.target.name]: e.target.value }
        });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeData({
                    ...resumeData,
                    personalInfo: { ...resumeData.personalInfo, profilePhoto: reader.result }
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleArrayChange = (index, field, value, type) => {
        const newArray = [...resumeData[type]];
        newArray[index][field] = value;
        setResumeData({ ...resumeData, [type]: newArray });
    };

    const addArrayItem = (type, defaultObj) => {
        const currentArray = resumeData[type];
        if (currentArray.length > 0) {
            const lastItem = currentArray[currentArray.length - 1];
            // Check if the first required field of the last item is filled
            const firstKey = Object.keys(defaultObj)[0];
            if (!lastItem[firstKey] || lastItem[firstKey].trim() === '') {
                toast.error(`Please fill the current ${type} entry before adding a new one!`);
                return;
            }
        }
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
        if (resumeData.skills.length > 0) {
            const lastSkill = resumeData.skills[resumeData.skills.length - 1];
            if (!lastSkill || lastSkill.trim() === '') {
                toast.error("Please fill the current skill before adding a new one!");
                return;
            }
        }
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
                    </motion.div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
                        Professional <span className="text-[#6A38C2]">Resume Builder</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
                        Create a high-impact resume in minutes. Fill in your details and download a print-ready PDF.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Preview Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:sticky md:top-24 h-fit"
                    >
                        <div className="flex items-center justify-between mb-6 no-print bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">Live Preview</h2>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] text-white rounded-xl text-xs font-black hover:bg-black transition-all shadow-lg shadow-black/10"
                            >
                                <Download size={14} />
                                Download PDF
                            </button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 min-h-[800px] flex flex-col">
                            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
                                <div ref={resumeRef} className={`bg-white shadow-sm mx-auto p-8 md:p-12 ${config.fontFamily} print:shadow-none print:p-0`}>
                                    {/* Resume Template */}
                                    <div className="space-y-8">
                                        {config.template === 'modern' && (
                                            <div className="flex gap-8">
                                                {/* Sidebar */}
                                                <div className="w-1/3 space-y-8">
                                                    {resumeData.personalInfo.profilePhoto && (
                                                        <div className="w-full aspect-square rounded-[2rem] overflow-hidden border-4 border-gray-50 shadow-lg">
                                                            <img src={resumeData.personalInfo.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}

                                                    <div className="space-y-4">
                                                        <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: config.primaryColor }}>Contact</h3>
                                                        <div className="space-y-2 text-xs font-bold text-gray-500">
                                                            {resumeData.personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} /> {resumeData.personalInfo.email}</div>}
                                                            {resumeData.personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} /> {resumeData.personalInfo.phone}</div>}
                                                            {resumeData.personalInfo.website && <div className="flex items-center gap-2"><Globe size={12} /> {resumeData.personalInfo.website}</div>}
                                                            {resumeData.personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={12} /> {resumeData.personalInfo.linkedin}</div>}
                                                        </div>
                                                    </div>

                                                    {resumeData.skills.some(s => s) && (
                                                        <div className="space-y-4">
                                                            <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: config.primaryColor }}>Skills</h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                {resumeData.skills.filter(s => s).map((skill, i) => (
                                                                    <span key={i} className="px-2 py-1 bg-gray-50 text-gray-900 text-[10px] font-black rounded-lg uppercase border border-gray-100">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {resumeData.languages.some(l => l.name) && (
                                                        <div className="space-y-4">
                                                            <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: config.primaryColor }}>Languages</h3>
                                                            <div className="space-y-2">
                                                                {resumeData.languages.filter(l => l.name).map((lang, i) => (
                                                                    <div key={i} className="flex justify-between items-center">
                                                                        <span className="text-xs font-bold text-gray-700">{lang.name}</span>
                                                                        <span className="text-[10px] font-black text-gray-400 uppercase">{lang.level}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {resumeData.certifications.some(c => c.name) && (
                                                        <div className="space-y-4">
                                                            <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: config.primaryColor }}>Certifications</h3>
                                                            <div className="space-y-3">
                                                                {resumeData.certifications.filter(c => c.name).map((cert, i) => (
                                                                    <div key={i} className="space-y-0.5">
                                                                        <div className="text-xs font-bold text-gray-800">{cert.name}</div>
                                                                        <div className="text-[10px] font-bold text-gray-500">{cert.issuer} • {cert.year}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Main Content */}
                                                <div className="flex-1 space-y-8">
                                                    <div>
                                                        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                                                            {resumeData.personalInfo.fullName || 'YOUR NAME'}
                                                        </h1>
                                                        {resumeData.personalInfo.summary && (
                                                            <p className="text-sm text-gray-600 leading-relaxed font-medium mt-4">{resumeData.personalInfo.summary}</p>
                                                        )}
                                                    </div>

                                                    {resumeData.experience.some(e => e.company) && (
                                                        <div className="space-y-4">
                                                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: config.primaryColor }}>Experience</h3>
                                                            <div className="space-y-6">
                                                                {resumeData.experience.filter(e => e.company).map((exp, i) => (
                                                                    <div key={i} className="space-y-1">
                                                                        <div className="flex justify-between items-start">
                                                                            <h4 className="font-black text-gray-900">{exp.role || 'Job Title'}</h4>
                                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{exp.duration}</span>
                                                                        </div>
                                                                        <p className="text-xs font-bold" style={{ color: config.primaryColor }}>{exp.company}</p>
                                                                        <p className="text-xs text-gray-600 leading-relaxed font-medium">{exp.description}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {resumeData.projects.some(p => p.title) && (
                                                        <div className="space-y-4">
                                                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: config.primaryColor }}>Projects</h3>
                                                            <div className="space-y-6">
                                                                {resumeData.projects.filter(p => p.title).map((proj, i) => (
                                                                    <div key={i} className="space-y-1">
                                                                        <div className="flex justify-between items-start">
                                                                            <h4 className="font-black text-gray-900">{proj.title}</h4>
                                                                            {proj.link && <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{proj.link}</span>}
                                                                        </div>
                                                                        <p className="text-xs text-gray-600 leading-relaxed font-medium">{proj.description}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {resumeData.education.some(e => e.school) && (
                                                        <div className="space-y-4">
                                                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: config.primaryColor }}>Education</h3>
                                                            <div className="space-y-4">
                                                                {resumeData.education.filter(e => e.school).map((edu, i) => (
                                                                    <div key={i} className="flex justify-between items-start">
                                                                        <div>
                                                                            <h4 className="font-black text-gray-900">{edu.degree || 'Degree Name'}</h4>
                                                                            <p className="text-xs font-bold" style={{ color: config.primaryColor }}>{edu.school}</p>
                                                                        </div>
                                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{edu.year}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {(config.template === 'classic' || config.template === 'minimal') && (
                                            <div className="space-y-8">
                                                <div className={`text-center ${config.template === 'classic' ? 'border-b-2 border-gray-900 pb-8' : ''}`}>
                                                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                                                        {resumeData.personalInfo.fullName || 'YOUR NAME'}
                                                    </h1>
                                                    <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-500">
                                                        {resumeData.personalInfo.email && <span className="flex items-center gap-2"><Mail size={14} /> {resumeData.personalInfo.email}</span>}
                                                        {resumeData.personalInfo.phone && <span className="flex items-center gap-2"><Phone size={14} /> {resumeData.personalInfo.phone}</span>}
                                                        {resumeData.personalInfo.website && <span className="flex items-center gap-2"><Globe size={14} /> {resumeData.personalInfo.website}</span>}
                                                        {resumeData.personalInfo.linkedin && <span className="flex items-center gap-2"><Linkedin size={14} /> {resumeData.personalInfo.linkedin}</span>}
                                                    </div>
                                                </div>

                                                {resumeData.personalInfo.summary && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Professional Summary</h3>
                                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{resumeData.personalInfo.summary}</p>
                                                    </div>
                                                )}

                                                {resumeData.experience.some(e => e.company) && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Experience</h3>
                                                        <div className="space-y-6">
                                                            {resumeData.experience.filter(e => e.company).map((exp, i) => (
                                                                <div key={i} className="space-y-1">
                                                                    <div className="flex justify-between items-start">
                                                                        <h4 className="font-black text-gray-900">{exp.role || 'Job Title'}</h4>
                                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{exp.duration}</span>
                                                                    </div>
                                                                    <p className="text-sm font-bold" style={{ color: config.primaryColor }}>{exp.company}</p>
                                                                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{exp.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {resumeData.projects.some(p => p.title) && (
                                                    <div className="space-y-3">
                                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Projects</h3>
                                                        <div className="space-y-6">
                                                            {resumeData.projects.filter(p => p.title).map((proj, i) => (
                                                                <div key={i} className="space-y-1">
                                                                    <div className="flex justify-between items-start">
                                                                        <h4 className="font-black text-gray-900">{proj.title}</h4>
                                                                        {proj.link && <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{proj.link}</span>}
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{proj.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {resumeData.education.some(e => e.school) && (
                                                        <div className="space-y-3">
                                                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Education</h3>
                                                            <div className="space-y-4">
                                                                {resumeData.education.filter(e => e.school).map((edu, i) => (
                                                                    <div key={i} className="flex justify-between items-start">
                                                                        <div>
                                                                            <h4 className="font-black text-gray-900">{edu.degree || 'Degree Name'}</h4>
                                                                            <p className="text-sm font-bold" style={{ color: config.primaryColor }}>{edu.school}</p>
                                                                        </div>
                                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{edu.year}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {resumeData.certifications.some(c => c.name) && (
                                                        <div className="space-y-3">
                                                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Certifications</h3>
                                                            <div className="space-y-3">
                                                                {resumeData.certifications.filter(c => c.name).map((cert, i) => (
                                                                    <div key={i} className="flex justify-between items-start">
                                                                        <div>
                                                                            <h4 className="font-black text-gray-900">{cert.name}</h4>
                                                                            <p className="text-xs font-bold" style={{ color: config.primaryColor }}>{cert.issuer}</p>
                                                                        </div>
                                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{cert.year}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {resumeData.skills.some(s => s) && (
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
                                                    )}

                                                    {resumeData.languages.some(l => l.name) && (
                                                        <div className="space-y-3">
                                                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">Languages</h3>
                                                            <div className="space-y-2">
                                                                {resumeData.languages.filter(l => l.name).map((lang, i) => (
                                                                    <div key={i} className="flex justify-between items-center">
                                                                        <span className="text-sm font-bold text-gray-700">{lang.name}</span>
                                                                        <span className="text-xs font-black text-gray-400 uppercase">{lang.level}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Editor Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 no-print pb-20"
                    >
                        {/* Configuration */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Layout className="text-[#6A38C2]" size={24} />
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Design & Layout</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Template</label>
                                    <select
                                        value={config.template}
                                        onChange={(e) => setConfig({ ...config, template: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm"
                                    >
                                        <option value="modern">Modern</option>
                                        <option value="classic">Classic</option>
                                        <option value="minimal">Minimal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Primary Color</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={config.primaryColor}
                                            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                                            className="w-10 h-10 rounded-xl border-none cursor-pointer"
                                        />
                                        <span className="text-xs font-bold text-gray-500 uppercase">{config.primaryColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Font</label>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={config.fontFamily}
                                            onChange={(e) => setConfig({ ...config, fontFamily: e.target.value })}
                                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm"
                                        >
                                            <option value="font-sans">Sans Serif</option>
                                            <option value="font-serif">Serif</option>
                                            <option value="font-mono">Monospace</option>
                                        </select>
                                        <button
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to clear all data?")) {
                                                    setResumeData({
                                                        personalInfo: { fullName: '', email: '', phone: '', website: '', linkedin: '', summary: '', profilePhoto: '' },
                                                        experience: [], education: [], skills: [], projects: [], certifications: [], languages: []
                                                    });
                                                    localStorage.removeItem('resumeData');
                                                }
                                            }}
                                            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors"
                                            title="Clear All"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Personal Info */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="text-[#6A38C2]" size={24} />
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Personal Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 flex items-center gap-4 mb-4">
                                    <div className="relative group">
                                        <div className="w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                            {resumeData.personalInfo.profilePhoto ? (
                                                <img src={resumeData.personalInfo.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-gray-300" size={24} />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Profile Photo</p>
                                        <p className="text-[10px] text-gray-400 font-medium">JPG, PNG or GIF. Max 1MB.</p>
                                    </div>
                                </div>
                                <Input label="Full Name" name="fullName" value={resumeData.personalInfo.fullName} onChange={handlePersonalInfoChange} placeholder="John Doe" />
                                <Input label="Email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="john@example.com" />
                                <Input label="Phone" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="+91 9876543210" />
                                <Input label="Website" name="website" value={resumeData.personalInfo.website} onChange={handlePersonalInfoChange} placeholder="portfolio.com" />
                                <Input label="LinkedIn" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="linkedin.com/in/johndoe" />
                                <div className="md:col-span-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Professional Summary</label>
                                    <textarea
                                        name="summary"
                                        value={resumeData.personalInfo.summary}
                                        onChange={handlePersonalInfoChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-xs min-h-[100px] resize-none transition-all"
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
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                                                <textarea
                                                    value={exp.description}
                                                    onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'experience')}
                                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-xs min-h-[80px] resize-none"
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

                        {/* Certifications */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Award className="text-[#6A38C2]" size={24} />
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Certifications</h2>
                                </div>
                                <button onClick={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })} className="p-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2]/10 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="space-y-6">
                                {resumeData.certifications.map((cert, index) => (
                                    <div key={index} className="p-6 bg-gray-50 rounded-3xl relative group">
                                        <button onClick={() => removeArrayItem(index, 'certifications')} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label="Certification Name" value={cert.name} onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'certifications')} />
                                            <Input label="Issuer" value={cert.issuer} onChange={(e) => handleArrayChange(index, 'issuer', e.target.value, 'certifications')} />
                                            <Input label="Year" value={cert.year} onChange={(e) => handleArrayChange(index, 'year', e.target.value, 'certifications')} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Languages className="text-[#6A38C2]" size={24} />
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Languages</h2>
                                </div>
                                <button onClick={() => addArrayItem('languages', { name: '', level: '' })} className="p-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2]/10 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {resumeData.languages.map((lang, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-2xl relative group grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Language</label>
                                            <input
                                                value={lang.name}
                                                onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'languages')}
                                                className="w-full px-3 py-2 bg-white border border-gray-100 rounded-xl outline-none font-bold text-xs"
                                                placeholder="e.g. English"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Level</label>
                                            <select
                                                value={lang.level}
                                                onChange={(e) => handleArrayChange(index, 'level', e.target.value, 'languages')}
                                                className="w-full px-3 py-2 bg-white border border-gray-100 rounded-xl outline-none font-bold text-xs"
                                            >
                                                <option value="">Level...</option>
                                                <option value="Native">Native</option>
                                                <option value="Fluent">Fluent</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Basic">Basic</option>
                                            </select>
                                        </div>
                                        <button onClick={() => removeArrayItem(index, 'languages')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <Trash2 size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects */}
                        <section className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Code className="text-[#6A38C2]" size={24} />
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Projects</h2>
                                </div>
                                <button onClick={() => addArrayItem('projects', { title: '', link: '', description: '' })} className="p-2 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2]/10 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>
                            <div className="space-y-6">
                                {resumeData.projects.map((proj, index) => (
                                    <div key={index} className="p-6 bg-gray-50 rounded-3xl relative group">
                                        <button onClick={() => removeArrayItem(index, 'projects')} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input label="Project Title" value={proj.title} onChange={(e) => handleArrayChange(index, 'title', e.target.value, 'projects')} />
                                            <Input label="Link (GitHub/Live)" value={proj.link} onChange={(e) => handleArrayChange(index, 'link', e.target.value, 'projects')} />
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                                                <textarea
                                                    value={proj.description}
                                                    onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'projects')}
                                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-xs min-h-[80px] resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
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
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <input
            {...props}
            className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#6A38C2]/10 outline-none font-bold text-xs transition-all placeholder:text-gray-300"
        />
    </div>
);

export default ResumeBuilder;
