
import { GoogleGenAI } from '@google/genai';

// The API key is read from the environment variable `process.env.API_KEY`,
// which is assumed to be set in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
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
