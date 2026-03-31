import express from "express";
import { getProfile, login, logout, register, updateProfile } from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { profileUpdateUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload ,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, profileUpdateUpload, updateProfile);
router.route("/profile").get(isAuthenticated, getProfile);

export default router;