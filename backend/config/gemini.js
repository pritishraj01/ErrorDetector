import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt, prevContext = "") {
  const structuredPrompt = `
You are a senior software engineer.
This is an ongoing conversation.

Previous context (for understanding only):
${prevContext}

Current error to analyze:
${prompt}

IMPORTANT:
- Respond ONLY in valid JSON
- Do NOT add text outside JSON
- Use EXACTLY this structure

Return JSON in this exact format:
{
  "error_type": "",
  "root_cause": "",
  "simple_explanation": "",
  "step_by_step_fix": "",
  "best_practices": "",
  "example_fix_code": ""
}
`

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: structuredPrompt,
  });

  let text = response.text

  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(text);

}

export default main;
