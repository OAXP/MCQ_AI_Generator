import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question } from '../types';

// @ts-ignore
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export async function generateQuestions(
  content: string,
  numQuestions: number
): Promise<Question[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Generate ${numQuestions} multiple-choice questions based on the following content. For each question:
  - Create 4 or 5 options
  - One option should be fully correct (1 point)
  - One or Two options should be partially correct (0.5 points)
  - Two or Three options should be incorrect (0 points)
  - Format the response as a JSON array of questions
  - Detect the language of the content and make the questions and the options the same language
  
  Content: ${content}
  
  Response format:
  {
    "questions": [
      {
        "id": "string",
        "text": "question text",
        "options": [
          {
            "id": "string",
            "text": "option text",
            "points": number
          }
        ],
        "correctAnswerId": "string",
        "partialAnswerId": "string"
      }
    ]
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanedText = response.text()
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    return JSON.parse(cleanedText).questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}