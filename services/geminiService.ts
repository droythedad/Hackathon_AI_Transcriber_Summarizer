import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;

export function initializeAi(apiKey: string) {
  if (!apiKey) {
    throw new Error("API key is required to initialize Gemini AI.");
  }
  ai = new GoogleGenAI({ apiKey });
}

const handleApiError = (error: unknown): never => {
  console.error('Error during Gemini API call:', error);
  if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('permission is not found'))) {
    throw new Error('The provided API Key is invalid. Please check and enter it again.');
  }
  throw new Error('Failed to communicate with the AI model.');
};

export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  if (!ai) {
    throw new Error('Gemini AI not initialized. Please configure the API key first.');
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
    handleApiError(error);
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  if (!ai) {
    throw new Error('Gemini AI not initialized. Please configure the API key first.');
  }

  try {
    const prompt = `Based on the following meeting transcript, provide a concise summary. The summary must be a single paragraph and no longer than 160 characters.\n\nTranscript:\n"""${text}"""`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    handleApiError(error);
  }
};