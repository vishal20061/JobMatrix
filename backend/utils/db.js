import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/jobPortol');
        console.log("database connected successfully");
    } catch (e) {
        console.log(e);
    }
}

export default connectDB;
