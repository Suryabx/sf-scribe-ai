import { GoogleGenerativeAI } from '@google/generative-ai';

export const createGeminiChat = (apiKey: string) => {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  return model;
};

export const sendMessage = async (model: any, message: string) => {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw error;
  }
};