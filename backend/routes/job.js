import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);   
router.route("/adminJobs").get(isAuthenticated, getAdminJobs);
router.route("/:id").get(getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router;