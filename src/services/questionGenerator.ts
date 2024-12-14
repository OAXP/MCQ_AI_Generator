import {GoogleGenerativeAI, ResponseSchema, SchemaType} from '@google/generative-ai';
import {Question} from '../types';

// @ts-ignore
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

const schema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    questions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: {
            type: SchemaType.STRING
          },
          text: {
            type: SchemaType.STRING
          },
          options: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id: {
                  type: SchemaType.STRING
                },
                text: {
                  type: SchemaType.STRING
                },
                points: {
                  type: SchemaType.NUMBER
                }
              },
              required: [
                "id",
                "text",
                "points"
              ]
            }
          },
          correctAnswerId: {
            type: SchemaType.STRING
          },
          partialAnswerId: {
            type: SchemaType.STRING
          }
        },
        required: [
          "id",
          "text",
          "options",
          "correctAnswerId",
          "partialAnswerId"
        ]
      },
    }
  },
  required: [
    "questions"
  ],
};

const complexityDescriptions = [
    "basic and straightforward, suitable for beginners",
    "easy with clear concepts",
    "moderate difficulty with some challenging aspects",
    "challenging, requiring deep understanding, similar to an exam question",
    "advanced, testing mastery of the subject, similar to a final exam question",
]

export async function generateQuestions(
  content: string,
  numQuestions: number,
  complexity: number = 3
): Promise<Question[]> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    }
  });

  const prompt = `Generate ${numQuestions} multiple-choice questions based on the following content. For each question:
  - Create 4 or 5 options
  - One option should be fully correct (1 point)
  - One or Two options should be partially correct (0.5 points)
  - Two or Three options should be incorrect (0 points)
  - Randomize the placement of correct, partially correct, and incorrect options in each question.
  ${complexity > 3 ? `
  - Ensure that the correct, partially correct, and incorrect options vary in length and structure to avoid predictability.
  - Avoid making the correct option consistently longer or more detailed than the others; aim for balance across all options.
  - Ensure the complexity aligns with logical reasoning or conceptual difficulty, rather than option length.
  - Review outputs to confirm no consistent patterns (e.g., longest option is always correct).
  ` : ''}
  - Format the response as a JSON array of questions
  - Detect the language of the content and make the questions and the options the same language
  - Complexity: ${complexityDescriptions[complexity - 1]}
  
  Content: ${content}`;

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