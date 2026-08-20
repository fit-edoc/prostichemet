const llmProvider = require('./llm');
const ragService = require('./ragService');
const { db } = require('../db');
const { crmProspects, aiRuns } = require('../db/schema');

class ResearchAgent {
  /**
   * Autonomous lead research, signal detection, and evidence extraction pipeline
   */
  async conductResearch({ workspaceId, icpProfile, businessProfile, leadCount = 5 }) {
    console.log(`[Research Agent] Starting research for ICP: "${icpProfile.title}"`);

    // 1. RAG Step: Retrieve market intelligence & signals
    const query = `${businessProfile.industry} ${icpProfile.title} ${icpProfile.targetIndustries?.join(' ')} pain points buying signals`;
    const contextDocs = await ragService.retrieveContext(query, workspaceId, 3);
    const contextStr = contextDocs.map(d => `[${d.title}]\n${d.content}`).join('\n\n');

    // 2. Multi-Agent Prompt with strict rules & evidence requirements (docs/prompts/research/)
    const systemInstruction = `You are Postrichment's Autonomous B2B Research Agent. 
Your job is to discover high-value candidate companies that match an Ideal Customer Profile (ICP), identify the exact decision-maker, detect growth signals, and provide verifiable evidence.
Rules:
- Never invent generic placeholders. Every lead must feel authentic and hyper-targeted.
- Always include concrete buying signals (e.g. recent funding, hiring SDRs, tech stack adoption, new market launch).
- Provide clear evidence explaining WHY this company is experiencing the specific pain points and needs the solution.
- Calculate an accurate Lead Score (0-100) based on ICP fit and urgency.`;

    const prompt = `
      [Target Business Context]
      Our Company: ${businessProfile.companyName}
      Our Industry: ${businessProfile.industry || 'B2B'}
      What We Sell / Value Prop: ${businessProfile.valueProposition}
      Product Description: ${businessProfile.productDescription}

      [Target Ideal Customer Profile (ICP)]
      Persona Title: ${icpProfile.title}
      Target Industries: ${JSON.stringify(icpProfile.targetIndustries)}
      Target Roles: ${JSON.stringify(icpProfile.targetRoles)}
      Target Company Sizes: ${JSON.stringify(icpProfile.companySize)}
      Core Pain Points: ${JSON.stringify(icpProfile.painPoints)}

      [Retrieved Market Intelligence & Signal Knowledge Base]
      ${contextStr}

      Generate ${leadCount} hyper-targeted prospect companies that strictly match this ICP.
      Respond strictly in JSON array format with objects having these exact keys:
      [
        {
          "companyName": "Acme Systems",
          "ownerName": "Alex Rivera",
          "companySize": "25-50 employees",
          "industry": "B2B SaaS / DevOps",
          "location": "San Francisco, CA",
          "websiteLink": "https://acmesystems.io",
          "contactName": "Sarah Jenkins",
          "contactTitle": "VP of Sales & Growth",
          "contactEmail": "sarah.jenkins@acmesystems.io",
          "contactLinkedin": "https://linkedin.com/in/sarah-jenkins-sales",
          "score": 94,
          "signals": [
            "Raised $4.2M Series A 3 months ago",
            "Actively hiring 2 Outbound SDRs on LinkedIn",
            "Launched new enterprise tier"
          ],
          "evidence": {
            "trigger": "Expanding outbound team to hit Series A targets",
            "painPointMatch": "SDRs spend excessive hours on manual prospect discovery rather than closing",
            "reason": "Acme has aggressive pipeline targets post-Series A but lacks an automated research engine, making our solution an immediate fit."
          }
        }
      ]
    `;

    const leadsData = await llmProvider.generate({
      prompt,
      system: systemInstruction,
    });

    const createdLeads = [];

    if (Array.isArray(leadsData)) {
      for (const lead of leadsData) {
        const [savedLead] = await db
          .insert(crmProspects)
          .values({
            workspaceId,
            icpProfileId: icpProfile.id,
            companyName: lead.companyName,
            ownerName: lead.ownerName,
            companySize: lead.companySize,
            industry: lead.industry,
            location: lead.location,
            websiteLink: lead.websiteLink,
            contactName: lead.contactName,
            contactTitle: lead.contactTitle,
            contactEmail: lead.contactEmail,
            contactLinkedin: lead.contactLinkedin,
            evidence: lead.evidence,
            signals: lead.signals,
            score: lead.score || 85,
            status: 'New',
          })
          .returning();

        createdLeads.push(savedLead);
      }
    }

    // 3. Log Observability in ai_runs table
    try {
      await db.insert(aiRuns).values({
        workspaceId,
        agentName: 'Research Agent',
        promptVersion: 'v1.2-rag',
        inputData: { icpId: icpProfile.id, businessProfileId: businessProfile.id },
        outputData: { leadCount: createdLeads.length },
        model: 'gemini-2.5-flash',
      });
    } catch (e) {
      console.warn('AI run logging skipped:', e.message);
    }

    return createdLeads;
  }
}

module.exports = new ResearchAgent();
