import { GoogleGenAI, Type } from "@google/genai";
import { CostEstimate, CostEstimateRequest } from '../types';

// Fix: Initialize GoogleGenAI with a named API key parameter as required by the SDK.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const costEstimateSchema = {
    type: Type.OBJECT,
    properties: {
        estimatedTotalCost: {
            type: Type.OBJECT,
            properties: {
                min: { type: Type.NUMBER },
                max: { type: Type.NUMBER },
            },
            required: ['min', 'max']
        },
        contingency: {
            type: Type.OBJECT,
            properties: {
                percentage: { type: Type.NUMBER },
                amount: { type: Type.NUMBER },
            },
            required: ['percentage', 'amount']
        },
        timelineEstimate: { type: Type.STRING },
        summary: { type: Type.STRING },
        costBreakdown: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING },
                    cost: { type: Type.NUMBER },
                    percentage: { type: Type.NUMBER },
                    details: { type: Type.STRING },
                },
                required: ['category', 'cost', 'percentage', 'details']
            }
        }
    },
    required: ['estimatedTotalCost', 'contingency', 'timelineEstimate', 'summary', 'costBreakdown']
};

export async function getCostEstimate(request: CostEstimateRequest): Promise<CostEstimate> {
    const prompt = `
        Provide a detailed cost estimation for a construction project with the following specifications.
        - Project Type: ${request.projectType}
        - Total Area: ${request.area} sq ft
        - Number of Floors: ${request.floors}
        - Quality Level: ${request.quality}
        - Primary Materials: ${request.materials}
        - Additional Features: ${request.features}

        Break down the cost into major categories (e.g., Materials, Labor, Permits, Equipment, Subcontractors, Overhead). For each category, provide an estimated cost, its percentage of the total, and brief details.
        Also provide an overall estimated cost range (min and max), a recommended contingency percentage and amount, a project timeline estimate, and a brief summary of the estimation.
        Respond in JSON format according to the provided schema.
    `;

    try {
        // Fix: Use the modern ai.models.generateContent method to query the Gemini API.
        const response = await ai.models.generateContent({
            // Fix: Use the recommended 'gemini-2.5-flash' model for this text-based task.
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: costEstimateSchema,
            },
        });

        // Fix: Access the generated text directly via the `text` property on the response object.
        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText);
        return parsedResult as CostEstimate;

    } catch (error) {
        console.error("Error getting cost estimate from Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate cost estimate: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the cost estimate.");
    }
}
