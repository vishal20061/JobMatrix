import { Job } from "../models/job.js";

export const postJob = async (req, res) => {
    try {
        let { title, description, requirements, experience, salary, location, jobType, position, company } =
            req.body;
        let userId = req.id;
        if (!title || !description || !requirements || !experience || !salary || !location || !jobType || !position, !company) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }
        let job = new Job({
            title,
            description,
            requirements: requirements.split(","),
            experienceLevel: experience,
            salary: Number(salary),
            location,
            jobType,
            position,
            company,
            created_by: userId
        })

        job.save();

        return res.status(200).json({
            message: "New Job created successfully",
            job,
            success: true
        })
    } catch (e) {
        console.log(e)
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (e) {
        console.log(e)
    }
}