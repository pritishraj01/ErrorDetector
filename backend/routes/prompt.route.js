import { Router } from "express";
import { createPrompt, getPrompt } from "../controllers/response.controllers.js";
import checkAuth from "../middlewears/checkAuth.js";

const promptRouter= Router()

promptRouter.post("/prompt/:chatId",checkAuth,createPrompt)
promptRouter.get("/getPrompt/:chatId",getPrompt)

export default promptRouter