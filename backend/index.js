import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import promptRouter from "./routes/prompt.route.js";
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chat.route.js";
dotenv.config()

const port = process.env.PORT
const app = express()
app.use(cors({
    origin: "https://errordetector.onrender.com",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api", promptRouter)
app.use("/auth",authRouter)
app.use("/api", chatRouter)

app.listen(port, () => {
    connectDb()
    console.log(`Server is started at ${port}`)
})