import { Company } from "../models/company.js";
import cloudinary from "../utils/cloudinary.js";

export const companyRegister = async (req, res) => {
    try {
        let { companyName, description, website, location } = req.body;
        let file = req.file;

        let logoUrl;

        if (file) {
            const cloudResponse = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                { resource_type: "auto" }
            );
            logoUrl = cloudResponse.secure_url;
        }
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required!",
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
            logo: logoUrl,
            userId: req.id
        })

        company.save();
        return res.status(200).json({
            message: "Company created successfully",
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
        let { name, description, website, location } = req.body;
        let file = req.file;

        let logoUrl;

        if (file) {
            const cloudResponse = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                { resource_type: "auto" }
            );
            logoUrl = cloudResponse.secure_url;
        }
        const updateData = { name, description, website, location, logo: logoUrl };
        const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });
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

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        
        // Note: Company delete karne se pehle aap chahein toh uske saare jobs bhi delete kar sakte hain
        const company = await Company.findByIdAndDelete(companyId);
        
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}