import { GoogleGenAI } from "@google/genai";
import { LogoConfig } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLogoImage = async (config: LogoConfig): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  // Construct a detailed prompt for the image model
  const prompt = `
    Design a professional logo for a brand named "${config.brandName}".
    
    Visual Description of the logo concept: ${config.description}
    
    Style Guidelines:
    - Style: ${config.style}
    - Primary Color: ${config.primaryColor}
    - Background: ${config.backgroundColor === '#ffffff' ? 'White' : config.backgroundColor === '#000000' ? 'Black' : config.backgroundColor}
    - The logo should be clean, high-resolution, and suitable for vectorization.
    - Focus on strong geometric shapes and clear typography if text is included.
    - Do not include realistic photo details; keep it graphic and iconic.
    - Ensure high contrast between the logo and the background.
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          // imageSize is not supported for gemini-2.5-flash-image, it defaults to 1024x1024 usually
        }
      }
    });

    // Extract the image from the response
    let base64Image = '';
    
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error("No image data found in the response.");
    }

    return `data:image/png;base64,${base64Image}`;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};