import main from "../config/gemini.js"
import Prompt from "../models/prompt.model.js"

export const createPrompt = async (req, res) => {
    try {
        let { prompt } = req.body
        let { chatId } = req.params

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" })
        }

        const previousPrompts = await Prompt.find({ chatId }).sort({ createdAt: 1 }).limit(3);

        const previousContext = previousPrompts
            .map(p => `User: ${p.prompt}`)
            .join("\n");

        const response = await main(`${previousContext}\n\nCurrent error:\n${prompt}`);

        let savedPrompt = await Prompt.create({
            prompt,
            response,
            chatId
        })

        return res.status(201).json(savedPrompt)

    } catch (error) {
        console.log(`Prompt error: ${error}`)
        return res.status(500).json({ message: "createPrompt error" })
    }
}


export const getPrompt = async (req, res) => {
    try {
        let { chatId } = req.params
        if (!chatId) {
            return res.status(400).json({ message: "no chatId" })
        }
        let resp = await Prompt.find({ chatId })

        return res.status(200).json(resp)

    } catch (error) {
        console.log(`getPrompt error: ${error}`)
    }
}