import express from "express";
import { companyRegister, getCompanies, getCompanyById, updateCompany } from "../controllers/company.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

let router = express.Router();

router.route("/").get(isAuthenticated, getCompanies);
router.route("/register").post(isAuthenticated, companyRegister);
router.route("/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router; 