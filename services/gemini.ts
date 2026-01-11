
import { GoogleGenAI, Type } from "@google/genai";
import { Domain, Question } from "../types";

export const generateQuestions = async (options?: { domain?: Domain, topic?: string, count?: number }): Promise<Question[]> => {
  if (!process.env.API_KEY) return [];

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';

  let focus = "covering all three CPACC domains";
  if (options?.domain) focus = `specifically for ${options.domain}`;
  if (options?.topic) focus = `specifically for the topic "${options.topic}" within the CPACC Body of Knowledge`;

  const count = options?.count || 5;

  const prompt = `Act as an accessibility expert. Generate ${count} high-quality multiple-choice practice questions for the IAAP CPACC certification ${focus}. 
  Base them on the CPACC Body of Knowledge content.
  Ensure a mix of difficulty levels.
  Provide clear explanations for the correct answer.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              domain: { type: Type.STRING, enum: Object.values(Domain) },
              topic: { type: Type.STRING },
              text: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of exactly 4 strings"
              },
              correctAnswer: { 
                type: Type.INTEGER, 
                description: "0-based index of the correct option" 
              },
              explanation: { type: Type.STRING }
            },
            required: ["id", "domain", "topic", "text", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const resultText = response.text || "[]";
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};
