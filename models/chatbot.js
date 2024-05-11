import { GoogleGenerativeAI } from "@google/generative-ai";
import prompts from "/prompts/prompts";

const chatbot = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const textModel = chatbot.getGenerativeModel({ model: "gemini-pro" });
const imageModel = chatbot.getGenerativeModel({ model: "gemini-pro-vision" });

async function imageToGenerativePart(image, imageType) {
  return { inlineData: { data: image, mimeType: imageType } };
}

async function getQuestion(text, image, imageType) {
  const prompt = prompts.question.replace("QUESTION-HERE", text);

  const content = image
    ? await imageModel.generateContent([
        prompt,
        await imageToGenerativePart(image, imageType),
      ])
    : await textModel.generateContent(prompt);

  const rawDataString = content.response.text();
  const startIndex = rawDataString.indexOf("{");
  const endIndex = rawDataString.lastIndexOf("}") + 1;
  let jsonDataString = rawDataString.substring(startIndex, endIndex);
  jsonDataString = jsonDataString.replace(/\`\`\`\json/g, "");
  jsonDataString = jsonDataString.replace(/\*\*/g, "");
  jsonDataString = jsonDataString.replace(/\`\`\`/g, "");

  try {
    return JSON.parse(jsonDataString);
  } catch (error) {
    console.error("An error occurred:", error);
    return 500;
  }
}

module.exports = {
  getQuestion,
};
