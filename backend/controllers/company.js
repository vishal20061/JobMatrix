import { Company } from "../models/company.js";

export const companyRegister = async (req, res) => {
    try {
        let { companyName, description, website, location, logo } = req.body;
        if (!companyName || !location || !logo) {
            return res.status(400).json({
                message: "Company name or location or logo is required!",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "Company Registered Already!",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            description,
            website,
            location,
            logo,
            userId: req.id
        })

        company.save();
        return res.status(200).json({
            company,
            success: true
        })

    } catch (e) {
        console.log(e)
    }
}

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ userId: req.id });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not Found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (e) {
        console.log(e)
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not Found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (e) {
        console.log(e)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        console.log(companyId);
        let { name, description, website, location, logo } = req.body;
        const updateData = { name, description, website, location, logo };
        const realCompany = await Company.findById(companyId);
        console.log(realCompany);
        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });
        console.log(company);
        if (!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated!",
            success: true
        })
    } catch (e) {
        console.log(e);
    }
}