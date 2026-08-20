require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testGemini() {
  console.log('Testing Gemini API key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Hello! Respond with JSON: {"status": "ok"}',
      config: {
        responseMimeType: 'application/json'
      }
    });
    console.log('Gemini 2.5 Flash Response:', res.text);
  } catch (err) {
    console.error('Gemini 2.5 Flash error:', err.message);

    // Try gemini-2.0-flash or gemini-1.5-flash
    try {
      console.log('Trying gemini-2.0-flash...');
      const res2 = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: 'Hello! Respond with JSON: {"status": "ok"}',
        config: {
          responseMimeType: 'application/json'
        }
      });
      console.log('Gemini 2.0 Flash Response:', res2.text);
    } catch (err2) {
      console.error('Gemini 2.0 Flash error:', err2.message);
    }
  }

  try {
    console.log('Testing text-embedding-004...');
    const emb = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: 'B2B Sales Intelligence'
    });
    console.log('Embedding dimension:', emb.embeddings?.[0]?.values?.length || emb.embedding?.values?.length);
  } catch (err) {
    console.error('Embedding error:', err.message);
  }
}

testGemini();
