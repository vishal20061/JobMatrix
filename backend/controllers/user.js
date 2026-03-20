import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        let { fullName, email, phoneNum, password, role } = req.body;
        if (!fullName || !email || !phoneNum || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "Account already registerd!",
                success: false
            })
        }

        const hashedPass = await bcrypt.hash(password, 12);

        let user1 = new User({
            fullName,
            email,
            phoneNum,
            password: hashedPass,
            role
        });

        await user1.save();

        return res.status(201).json({
            success: true,
            message: "Account Created Successfully!"
        })
    } catch (e) {
        console.log(e);
    }
};

export const login = async (req, res) => {
    try {
        let { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "something is missing!",
                success: false
            })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "email or password incorrect",
                success: false
            });
        }

        let isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) {
            return res.status(400).json({
                message: "email or password incorrect",
                success: false
            })
        }

        if (user.role !== role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNum: user.phoneNum,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            success: true,
            user,
            message: `Welcome back ${user.fullName}`,
        })

    } catch (e) {
        console.log(e);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (e) {
        console.log(e)
    }
}

export const updateProfile = async (req, res) => {
    try {
        let { fullName, email, phoneNum, bio, skills } = req.body;
        let file = req.file;

        let skillsArr = [];

        if (skills) {
            skillsArr = skills.split(",");
        }

        let userId = req.id;

        let user = await User.findByIdAndUpdate(userId, {
            fullName,
            email,
            phoneNum,
            "profile.bio": bio,
            "profile.skills": skillsArr
        }, { new: true });

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        user = {
            _id: user._id,
            fullname: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNum,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            success: true,
            user,
            message: "Profile Updated Successfully!",
        })
    } catch (e) {
        console.log(e);
    }
}