import { Router } from "express";
import checkAuth from "../middlewears/checkAuth.js";
import { createChat, getChat, getLatestChat } from "../controllers/chat.controllers.js";

const chatRouter= Router()

chatRouter.post("/createchat", checkAuth, createChat)
chatRouter.get("/getchat",checkAuth,getChat)
chatRouter.get("/getlatestchat/:id",checkAuth,getLatestChat)

export default chatRouter