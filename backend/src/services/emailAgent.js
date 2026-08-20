const llmProvider = require('./llm');
const ragService = require('./ragService');
const { db } = require('../db');
const { emails, crmProspects, businessProfiles, icpProfiles, aiRuns } = require('../db/schema');
const { eq, and } = require('drizzle-orm');

class EmailAgent {
  /**
   * Generates a hyper-personalized cold email using RAG copywriting frameworks and prospect evidence
   */
  async generatePersonalizedEmail({ workspaceId, prospectId, framework = 'PAS' }) {
    // 1. Fetch prospect details
    const prospectResults = await db
      .select()
      .from(crmProspects)
      .where(and(eq(crmProspects.id, prospectId), eq(crmProspects.workspaceId, workspaceId)));

    if (prospectResults.length === 0) {
      throw new Error('Prospect not found in workspace');
    }
    const prospect = prospectResults[0];

    // 2. Fetch ICP & Business profile for context
    const icpResults = await db
      .select({
        icp: icpProfiles,
        business: businessProfiles,
      })
      .from(icpProfiles)
      .innerJoin(businessProfiles, eq(icpProfiles.businessProfileId, businessProfiles.id))
      .where(eq(icpProfiles.id, prospect.icpProfileId));

    const business = icpResults[0]?.business || {
      companyName: 'Our Platform',
      valueProposition: 'Automate sales research and increase conversion rates',
    };

    // 3. RAG Step: Retrieve winning copywriting framework
    const frameworkDocs = await ragService.retrieveContext(`cold email framework ${framework}`, workspaceId, 2);
    const frameworkStr = frameworkDocs.map(d => d.content).join('\n\n');

    // 4. Construct prompt
    const system = `You are a world-class B2B Cold Email Copywriter and Outbound Strategist.
Your goal is to write a punchy, hyper-personalized cold email that gets replies.
Rules:
- NEVER sound like a generic marketing template or AI spam.
- Keep total word count under 85 words.
- Subject line must be 2-4 lowercase words, casual and relevant (e.g. 'quick question', 'acme outbound pipeline', 'series a research').
- Use the provided growth signals and evidence as the natural opening trigger.
- Connect the trigger directly to the core problem and how our product solves it.
- End with a low-friction, soft CTA (e.g., 'Worth a quick 5-min glance next week?' or 'Open to checking out how this works?').`;

    const prompt = `
      [Sender / Product Information]
      Company Name: ${business.companyName}
      Value Proposition: ${business.valueProposition}
      Product Description: ${business.productDescription || ''}

      [Prospect Information]
      Company: ${prospect.companyName}
      Contact Name: ${prospect.contactName}
      Contact Title: ${prospect.contactTitle || 'Leader'}
      Industry: ${prospect.industry || 'B2B'}
      Detected Signals: ${JSON.stringify(prospect.signals || [])}
      Evidence & Reason: ${JSON.stringify(prospect.evidence || {})}

      [Copywriting Framework Guidelines]
      ${frameworkStr}

      Respond strictly in JSON format:
      {
        "subject": "quick thought for {{company}}",
        "body": "Hi {{contactFirstName}},\n\nSaw that {{signalTrigger}}...\n\n{{problemAgitation}}\n\n{{valueProp}}\n\n{{softCta}}",
        "frameworkUsed": "${framework}",
        "personalizedTrigger": "Brief summary of the hook used"
      }
    `;

    const generated = await llmProvider.generate({ prompt, system });

    // 5. Store generated email in database
    const [savedEmail] = await db
      .insert(emails)
      .values({
        workspaceId,
        prospectId: prospect.id,
        icpProfileId: prospect.icpProfileId,
        subject: generated.subject,
        body: generated.body,
        framework: generated.frameworkUsed || framework,
        status: 'Draft',
      })
      .returning();

    // Log AI run
    try {
      await db.insert(aiRuns).values({
        workspaceId,
        agentName: 'Email Generator',
        promptVersion: 'v1.0-rag-pas',
        inputData: { prospectId, framework },
        outputData: { emailId: savedEmail.id },
        model: 'gemini-2.5-flash',
      });
    } catch (e) {
      // ignore
    }

    return {
      ...savedEmail,
      personalizedTrigger: generated.personalizedTrigger,
    };
  }
}

module.exports = new EmailAgent();
