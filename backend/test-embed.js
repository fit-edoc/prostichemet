require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testModels() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const candidates = ['gemini-embedding-exp-03-07', 'text-embedding-004', 'embedding-001'];
  for (const m of candidates) {
    try {
      const res = await ai.models.embedContent({ model: m, contents: 'Test sales' });
      console.log('Success with model:', m, 'values length:', res.embeddings?.[0]?.values?.length);
      return;
    } catch (e) {
      console.log('Failed model:', m, e.message);
    }
  }
}
testModels();
