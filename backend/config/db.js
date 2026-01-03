import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongoUrl= process.env.MONGO_URL

const connectDb=async()=>{
    await mongoose.connect(mongoUrl)
    console.log("DB connected")
}

export default connectDb