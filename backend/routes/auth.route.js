import { Router } from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/auth.controllers.js";
import checkAuth from "../middlewears/checkAuth.js";
import { upload } from "../middlewears/multer.js";

const authRouter= Router()

authRouter.post("/signup",upload.single('avatar'),signup)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/getme",checkAuth,getCurrentUser)

export default authRouter