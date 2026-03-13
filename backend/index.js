import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.js";
import companyRouter from "./routes/company.js";
import jobRouter from "./routes/job.js";
import applicationRouter from "./routes/application.js"

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

// middlewares - 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http//localhost:5173",
    Credential: true
}

app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/jobs", jobRouter);
app.use("/application", applicationRouter);

// app.use("/", (req, res) => {
//     res.send("hello world!");
// })

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
})