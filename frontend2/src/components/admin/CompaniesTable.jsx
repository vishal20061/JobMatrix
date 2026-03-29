// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { Edit2, Building2, Calendar } from 'lucide-react'
// import { motion } from 'motion/react'

// const CompaniesTable = () => {
//     const { companies, searchCompanyByText } = useSelector((store) => store.company);
//     const [filterCompany, setFilterCompany] = React.useState(companies);
//     const navigate = useNavigate();

//     React.useEffect(() => {
//         const filteredCompany = companies.length >= 0 && companies.filter((company) => {
//             if (!searchCompanyByText) {
//                 return true
//             };
//             return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

//         });
//         setFilterCompany(filteredCompany);
//     }, [companies, searchCompanyByText])

//     return (
//         <div className='overflow-x-auto custom-scrollbar'>
//             <table className='w-full text-left border-separate border-spacing-y-3'>
//                 <thead>
//                     <tr className='text-gray-400'>
//                         <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Company</th>
//                         <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Name</th>
//                         <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Date</th>
//                         <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest text-right'>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         filterCompany?.map((company, index) => (
//                             <motion.tr 
//                                 key={company._id}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.05 }}
//                                 className='group bg-white hover:bg-gray-50/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl'
//                             >
//                                 <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-gray-100 group-hover:border-[#6A38C2]/20'>
//                                     <div className='w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:border-[#6A38C2]/30 transition-colors'>
//                                         <img 
//                                             src={company.logo || `https://picsum.photos/seed/${company.name}/100/100`} 
//                                             alt="logo" 
//                                             className='w-full h-full object-cover' 
//                                             referrerPolicy="no-referrer"
//                                         />
//                                     </div>
//                                 </td>
//                                 <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
//                                     <div className='flex items-center gap-2'>
//                                         <Building2 size={16} className='text-[#F83002]/60' />
//                                         <span className='text-sm font-black text-gray-900'>{company.name}</span>
//                                     </div>
//                                 </td>
//                                 <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
//                                     <div className='flex items-center gap-2 text-gray-500'>
//                                         <Calendar size={14} className='text-gray-400' />
//                                         <span className='text-sm font-bold'>{company.createdAt.split("T")[0]}</span>
//                                     </div>
//                                 </td>
//                                 <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-gray-100 group-hover:border-[#6A38C2]/20 text-right'>
//                                     <motion.button 
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         onClick={() => navigate(`/admin/companies/${company._id}`)}
//                                         className='p-2.5 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2] hover:text-white transition-all duration-300'
//                                     >
//                                         <Edit2 size={18} />
//                                     </motion.button>
//                                 </td>
//                             </motion.tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default CompaniesTable


import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Edit2, Building2, Calendar, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { setCompanies } from '../../redux/companySlice'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);
    const [filterCompany, setFilterCompany] = React.useState(companies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteCompanyHandler = async (companyId) => {
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, { withCredentials: true });
            if (res.data.success) {
                const updatedCompanies = companies.filter((company) => company._id !== companyId);
                dispatch(setCompanies(updatedCompanies));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    React.useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div className='overflow-x-auto custom-scrollbar'>
            <table className='w-full text-left border-separate border-spacing-y-3'>
                <thead>
                    <tr className='text-gray-400'>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Company</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Name</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest'>Date</th>
                        <th className='px-6 pb-2 font-black text-xs uppercase tracking-widest text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterCompany?.map((company, index) => (
                            <motion.tr 
                                key={company._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className='group bg-white hover:bg-gray-50/50 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl'
                            >
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-l border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:border-[#6A38C2]/30 transition-colors'>
                                        <img 
                                            src={company.logo || `https://picsum.photos/seed/${company.name}/100/100`} 
                                            alt="logo" 
                                            className='w-full h-full object-cover' 
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2'>
                                        <Building2 size={16} className='text-[#F83002]/60' />
                                        <span className='text-sm font-black text-gray-900'>{company.name}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 border-y border-gray-100 group-hover:border-[#6A38C2]/20'>
                                    <div className='flex items-center gap-2 text-gray-500'>
                                        <Calendar size={14} className='text-gray-400' />
                                        <span className='text-sm font-bold'>{company.createdAt.split("T")[0]}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-5 first:rounded-l-2xl last:rounded-r-2xl border-y border-r border-gray-100 group-hover:border-[#6A38C2]/20 text-right'>
                                    <div className='flex items-center justify-end gap-3'>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className='p-2.5 bg-[#6A38C2]/5 text-[#6A38C2] rounded-xl hover:bg-[#6A38C2] hover:text-white transition-all duration-300'
                                            title="Edit Company"
                                        >
                                            <Edit2 size={18} />
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => deleteCompanyHandler(company._id)}
                                            className='p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300'
                                            title="Delete Company"
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

export default CompaniesTable
