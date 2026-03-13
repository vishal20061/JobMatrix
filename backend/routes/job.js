import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.js";

const router = express.Router();

router.route("/").post(isAuthenticated, postJob);
router.route("/").get(isAuthenticated, getAllJobs);
router.route("/adminJobs").get(isAuthenticated, getAdminJobs);
router.route("/:id").get(isAuthenticated, getJobById);

export default router;
