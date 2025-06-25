import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. Journal analysis will use fallback values.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export async function analyzeJournalEntry(content: string) {
  // If no API key is available, return fallback values
  if (!genAI || !API_KEY) {
    console.warn('Gemini API not configured. Using fallback analysis.');
    return { 
      mood: 'reflective', 
      summary: 'A personal reflection and thoughts.' 
    };
  }

  try {
    // Use the updated model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate mood analysis
    const moodPrompt = `Analyze the following journal entry and determine the overall emotional mood. Respond with only one word from this list: happy, sad, anxious, excited, calm, frustrated, grateful, reflective, energetic, peaceful, worried, content.

Journal entry: "${content}"`;

    // Generate summary
    const summaryPrompt = `Summarize the following journal entry in 1-2 sentences, capturing the key themes and emotions. Keep it concise and meaningful.

Journal entry: "${content}"`;

    const [moodResult, summaryResult] = await Promise.all([
      model.generateContent(moodPrompt),
      model.generateContent(summaryPrompt)
    ]);

    const mood = moodResult.response.text().trim().toLowerCase();
    const summary = summaryResult.response.text().trim();

    return { mood, summary };
  } catch (error) {
    console.error('Error analyzing journal entry:', error);
    return { mood: 'reflective', summary: 'A personal reflection and thoughts.' };
  }
}