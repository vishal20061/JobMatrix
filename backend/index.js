// import dotenv from "dotenv";
// dotenv.config({});

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./utils/db.js";
// import userRouter from "./routes/user.js";
// import companyRouter from "./routes/company.js";
// import jobRouter from "./routes/job.js";
// import applicationRouter from "./routes/application.js"


// const app = express();

// const PORT = process.env.PORT || 3000;

// const corsOptions = {
//     origin: "https://job-matrix-two.vercel.app",
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }

// app.use(cors(corsOptions));

// connectDB();

// // middlewares - 

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use("/user", userRouter);
// app.use("/company", companyRouter);
// app.use("/jobs", jobRouter);
// app.use("/application", applicationRouter);

// app.listen(PORT, () => {
//     console.log(`server listen on port ${PORT}`);
// })

import dotenv from "dotenv";
dotenv.config({});

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.js";
import companyRouter from "./routes/company.js";
import jobRouter from "./routes/job.js";
import applicationRouter from "./routes/application.js";

const app = express();

const PORT = process.env.PORT || 3000;

// ✅ CORS sabse pehle
const corsOptions = {
    origin: "https://job-matrix-two.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

// Baad mein middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Baad mein routes
app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/jobs", jobRouter);
app.use("/application", applicationRouter);

connectDB();

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
})