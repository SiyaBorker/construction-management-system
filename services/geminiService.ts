import { GoogleGenAI, Type } from "@google/genai";
import { CostEstimate } from '../types';

if (!process.env.API_KEY) {
  // In a real production app, this key would be handled securely on a backend server.
  // For this frontend-only demo, we rely on it being set in the environment.
  console.warn("API_KEY environment variable not set. AI Estimator will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        estimatedTotalCost: {
            type: Type.OBJECT,
            properties: {
                min: { type: Type.NUMBER },
                max: { type: Type.NUMBER }
            }
        },
        costBreakdown: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING },
                    cost: { type: Type.NUMBER },
                    percentage: { type: Type.NUMBER },
                    details: { type: Type.STRING }
                }
            }
        },
        timelineEstimate: {
            type: Type.STRING,
            description: "A textual description of the estimated project timeline, e.g., '6-8 months'."
        },
        contingency: {
            type: Type.OBJECT,
            properties: {
                percentage: { type: Type.NUMBER },
                amount: { type: Type.NUMBER }
            }
        },
        summary: {
            type: Type.STRING,
            description: "A brief summary of the cost estimate, including key assumptions and potential risks."
        }
    }
};


export const getCostEstimate = async (formData: {
  projectType: string;
  area: number;
  floors: number;
  quality: string;
  materials: string;
  features: string;
}): Promise<CostEstimate> => {
  if (!process.env.API_KEY) {
      throw new Error("API Key is not configured. Cannot get estimate.");
  }
  
  const prompt = `
    Analyze the following construction project details and provide a detailed cost estimate.

    Project Details:
    - Project Type: ${formData.projectType}
    - Total Area: ${formData.area} square feet
    - Number of Floors: ${formData.floors}
    - Quality Level: ${formData.quality}
    - Primary Materials: ${formData.materials}
    - Special Features: ${formData.features || 'None'}

    Provide a comprehensive cost breakdown, including but not limited to:
    - Site preparation, Foundation, Framing, Exterior & Interior finishes, MEP (Mechanical, Electrical, Plumbing), Labor costs, Permits and fees, and a contingency fund.

    Return the data in the specified JSON format. The costs should be realistic for a project in a major metropolitan area in the USA.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString) as CostEstimate;
    return parsedJson;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Provide a more user-friendly error message
        if (error.message.includes('API key not valid')) {
             throw new Error('The provided API Key is not valid. Please check your configuration.');
        }
        throw new Error(`Failed to get cost estimate from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching the cost estimate.");
  }
};