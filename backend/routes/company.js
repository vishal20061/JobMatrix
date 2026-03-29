import express from "express";
import { companyRegister, deleteCompany, getCompanies, getCompanyById, updateCompany } from "../controllers/company.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

let router = express.Router();

// router.route("/").get(isAuthenticated, getCompanies);
// router.route("/register").post(isAuthenticated, singleUpload, companyRegister);
// router.route("/:id").get(isAuthenticated, getCompanyById);
// router.route("/update/:id").put(isAuthenticated, updateCompany);

router.route("/register").post(isAuthenticated, singleUpload, companyRegister);
router.route("/get").get(isAuthenticated, getCompanies);       // pehle
router.route("/:id").get(isAuthenticated, getCompanyById);     // baad mein
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);

export default router; 