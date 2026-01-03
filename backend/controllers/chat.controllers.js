import main from "../config/gemini.js"
import Chat from "../models/chat.model.js"

export const createChat = async (req, res) => {
    try {
        let { title } = req.body
        let userId = req.userId

        if (!title) {
            return res.status(200).json({ message: "there is no title of chat" })
        }
        

        let response = await main(title)

        const result = await Chat.create({
            title,
            response,
            owner: userId
        })

        return res.status(201).json(result)

    } catch (error) {
        console.log(`createChat error :${error}`)
    }
}

export const getChat = async (req, res) => {
    let userId = req.userId

    try {
        let chat = await Chat.find({ owner: userId })

        if (!chat) {
            return res.status(400).json({ message: "chat not found" })
        }

        return res.status(200).json(chat)

    } catch (error) {
        console.log(`get chat error: ${error}`)
    }
}

export const getLatestChat = async (req, res) => {
    try {
        let { id } = req.params

        const latestChat = await Chat.findById(id)

        if (!latestChat) {
            return res.status(404).json({ message: "No chat found" });
        }

        return res.status(200).json(latestChat)

    } catch (error) {
        console.log(`getLatestChat error: ${error}`)
        return res.status(500).json({ message: "Server error" });
    }
}