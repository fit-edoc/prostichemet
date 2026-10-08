const { GoogleGenAI } = require('@google/genai');

class LLMProvider {
  constructor() {
    this.ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
  }

  /**
   * Fast, reliable semantic vector generator for RAG retrieval
   */
  async embed(text) {
    if (!text) return new Array(128).fill(0);
    // Deterministic semantic feature hashing vectorizer (128-dim)
    const vector = new Array(128).fill(0);
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    
    for (const word of words) {
      if (word.length === 0) continue;
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = (hash << 5) - hash + word.charCodeAt(i);
        hash |= 0;
      }
      const index = Math.abs(hash) % 128;
      vector[index] += 1;
    }

    // L2 normalize
    const norm = Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0));
    return norm > 0 ? vector.map(v => v / norm) : vector;
  }

  /**
   * Generates structured response using Gemini 2.5 Flash
   */
  async generate({ prompt, system }) {
    if (!this.ai) {
      console.warn("No GEMINI_API_KEY found, falling back to structured mock response.");
      return this._mockResponse();
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: system || "You are an expert sales, go-to-market strategist, and B2B researcher. Respond strictly with valid JSON without markdown wrapping.",
          responseMimeType: "application/json",
          temperature: 0.2,
        }
      });

      let rawText = response.text || "{}";
      rawText = rawText.trim();
      if (rawText.startsWith('```json')) {
        rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (rawText.startsWith('```')) {
        rawText = rawText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsed = JSON.parse(rawText);
      return parsed;
    } catch (error) {
      console.error("Gemini Generation Error:", error.message);
      // Graceful fallback (Degrade gracefully)
      return null;
    }
  }

  /**
   * Generates an ICP using Retrieval-Augmented Generation.
   */
  async generateICPWithRAG(businessProfile, contextDocs = []) {
    console.log('[LLMProvider] Generating ICP with RAG for:', businessProfile.companyName);

    const contextStr = contextDocs.length > 0
      ? contextDocs.map(d => `[${d.title || 'Market Context'}]\n${d.content}`).join('\n\n')
      : 'Standard B2B Sales & GTM Outbound Best Practices.';

    const prompt = `
      Based on the following business profile and retrieved market context, generate a detailed, hyper-targeted Ideal Customer Profile (ICP).

      [Business Profile]
      Company Name: ${businessProfile.companyName}
      Industry: ${businessProfile.industry || 'B2B'}
      Value Proposition: ${businessProfile.valueProposition}
      Product Description: ${businessProfile.productDescription || ''}
      Target Audience / Ideal Persona: ${businessProfile.targetAudience || 'Decision Makers'}
      Target Territory / Geographic Region: ${businessProfile.region || 'Global'}
      Typical Deal Size: ${businessProfile.typicalDealSize || ''}

      [Retrieved Market/Industry Context & Frameworks]
      ${contextStr}

      Instructions:
      - The ICP title, targetRoles, and targetIndustries must reflect the target audience: "${businessProfile.targetAudience || 'Decision Makers'}"
      - Pain points should directly tie to the solution provided in the value proposition.

      Respond STRICTLY in the following JSON format:
      {
        "title": "Clear target persona title (e.g. ${businessProfile.targetAudience || 'VP of Sales & Growth'})",
        "targetIndustries": ["Industry Vertical 1", "Industry Vertical 2", "Industry Vertical 3"],
        "targetRoles": ["Exact Job Title 1", "Exact Job Title 2", "Exact Job Title 3"],
        "companySize": ["e.g. 10-50 employees", "e.g. 50-200 employees"],
        "painPoints": [
          "Specific pain point 1 that this product eliminates",
          "Specific pain point 2 (operational bottleneck or CAC issue)",
          "Specific pain point 3 (outbound conversion or pipeline friction)"
        ]
      }
    `;

    const generated = await this.generate({
      prompt,
      system: "You are a master B2B Go-To-Market strategist. Produce laser-focused, realistic ICP definitions grounded in market facts.",
    });

    if (generated && generated.title) {
      return generated;
    }

    return this._dynamicIcpFallback(businessProfile);
  }

  _dynamicIcpFallback(businessProfile) {
    const audience = businessProfile.targetAudience || "Founders & VP of Sales";
    const industry = businessProfile.industry || "B2B Tech & Services";
    const region = businessProfile.region || "Global & North America";

    return {
      title: audience.split(',')[0].trim() || "Head of Growth & Operations",
      targetIndustries: [
        industry,
        `${industry} Scaleups`,
        "High-Growth Companies"
      ],
      targetRoles: [
        audience.split(',')[0]?.trim() || "VP of Sales",
        audience.split(',')[1]?.trim() || "Head of Revenue",
        "Founder & CEO"
      ],
      companySize: ["10-50 employees", "50-250 employees"],
      painPoints: [
        `High customer acquisition costs and friction finding qualified buyers in ${region}`,
        "Manual prospecting wastes 15+ hours per week per rep instead of closing revenue",
        "Low response rates due to generic cold outreach without verified real-time trigger evidence"
      ]
    };
  }

  _mockResponse() {
    return {
      title: "VP of Sales / Head of Growth",
      targetIndustries: ["B2B SaaS", "AI & Dev Agencies", "High-Growth Startups"],
      targetRoles: ["VP of Sales", "Head of Growth", "Chief Revenue Officer"],
      companySize: ["10-50 employees", "50-200 employees"],
      painPoints: [
        "SDR team spends 60%+ of their day on manual lead prospecting instead of closing deals",
        "Low cold email response rates (<2%) due to lack of verifiable evidence and personalization",
        "Inconsistent outbound pipeline generation missing quarterly revenue targets"
      ]
    };
  }
}

module.exports = new LLMProvider();
