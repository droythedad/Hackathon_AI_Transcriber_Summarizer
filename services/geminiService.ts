
import { GoogleGenAI } from '@google/genai';

// --- IMPORTANT ---
// For this app to work, you must replace the placeholder below with your actual Gemini API key.
// Get your key from Google AI Studio: https://aistudio.google.com/app/apikey
const API_KEY = process.env.API_KEY || 'AIzaSyCpIpHK6x_5M9CA8dWE-Nq4gmYrYPQtmtU';


let ai: GoogleGenAI | null = null;
const isApiKeyValid = API_KEY && API_KEY !== 'AIzaSyCpIpHK6x_5M9CA8dWE-Nq4gmYrYPQtmtU';

if (isApiKeyValid) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const isApiReady = () => isApiKeyValid && ai !== null;


export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  if (!isApiReady() || !ai) {
    throw new Error('The Gemini API key is missing or invalid. Please update it in `services/geminiService.ts`.');
  }

  try {
    const audioPart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Audio,
      },
    };

    const textPart = {
      text: "Transcribe the following audio accurately. If there is no speech, return an empty string.",
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [audioPart, textPart] }],
    });
    
    return response.text;
  } catch (error) {
    console.error('Error during Gemini API call:', error);
    throw new Error('Failed to communicate with the AI model.');
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  if (!isApiReady() || !ai) {
    throw new Error('The Gemini API key is missing or invalid. Please update it in `services/geminiService.ts`.');
  }

  try {
    const prompt = `Based on the following meeting transcript, provide a concise summary. The summary must be a single paragraph and no longer than 160 characters.\n\nTranscript:\n"""${text}"""`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Error during Gemini API call for summarization:', error);
    throw new Error('Failed to communicate with the AI model for summarization.');
  }
};
