import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.js";

let router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").put(isAuthenticated, updateStatus);
router.route("/applied").get(isAuthenticated, getAppliedJobs);

export default router;