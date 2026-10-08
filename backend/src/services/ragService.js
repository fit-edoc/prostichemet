const { db } = require('../db');
const { knowledgeBase } = require('../db/schema');
const { eq, or, isNull, desc, and } = require('drizzle-orm');
const llmProvider = require('./llm');

class RAGService {
  /**
   * Cosine similarity helper between two vector arrays
   */
  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Seed curated B2B sales intelligence, industry signals, and winning cold email frameworks
   */
  async seedDefaultKnowledge() {
    try {
      const existing = await db.select().from(knowledgeBase).limit(1);
      if (existing.length > 0) return; // Already seeded

      const defaultDocs = [
        {
          category: 'framework',
          title: 'PAS Cold Email Copywriting Framework (Problem-Agitate-Solve)',
          content: `Framework: Problem-Agitate-Solve. 
Subject Lines: 2-4 words, lowercase, curious (e.g., 'quick question', 'scaling [pain point]').
Structure:
1. Trigger / Observation: Point to a specific real-world event or signal (e.g. 'Saw you recently raised Series A' or 'Noticed your job posting for Head of Sales').
2. The Core Problem: Highlight the friction they are facing as a result.
3. Agitation & Cost of Inaction: Explain why manual prospecting / lack of pipeline stalls revenue.
4. The Solution & Proof: Share a 1-sentence value proposition and concrete outcome.
5. Soft Low-Friction CTA: 'Open to seeing how this works?' or 'Worth a brief 5-min chat next Tuesday?'
Rule: Never use generic buzzwords like 'synergy' or 'revolutionary'. Keep under 90 words.`,
        },
        {
          category: 'framework',
          title: 'Observation-Insight-Value Framework for Outbound',
          content: `High-converting B2B Outbound Framework: Observation -> Insight -> Value.
- Observation: Reference a verifiable company signal (recent hiring, tech stack change, client expansion).
- Insight: Connect that signal to an operational bottleneck (e.g., SDR ramp time, slow lead research, bad data).
- Value Proposition: Present how your product eliminates that bottleneck with proof.
- Call to Action: Low-friction ask focused on learning, not a hard pitch.`,
        },
        {
          category: 'industry',
          title: 'B2B Software & AI Agencies ICP Intelligence',
          content: `Target Persona: Founders, Heads of Growth, VP of Sales.
Key Pain Points:
1. High customer acquisition cost (CAC) and reliance on inconsistent referral networks.
2. Sales development reps (SDRs) spend 60%+ of their time manually researching prospects instead of selling.
3. Low cold email response rates (<2%) due to lack of personalization and weak evidence.
Key Buying Signals:
- Active hiring for Sales Development, SDRs, or Account Executives.
- Seed / Series A funding announcements.
- Expansion into new target markets or service offerings.`,
        },
        {
          category: 'industry',
          title: 'B2B SaaS & Tech Startups Outbound Triggers',
          content: `Target Persona: CRO, VP Sales, Founder.
Key Pain Points:
1. Stagnant outbound pipeline; inbound leads are not enough to hit quarterly growth targets.
2. Generic database contact lists contain outdated emails and high bounce rates.
3. Need for verifiable buying signals rather than blind mass-messaging.
Buying Signals:
- Launching a new product or feature on ProductHunt / LinkedIn.
- Key leadership hires (VP Sales, CMO, Growth Lead).
- Announcing new partnership or enterprise customer wins.`,
        }
      ];

      for (const doc of defaultDocs) {
        let embedding = null;
        try {
          embedding = await llmProvider.embed(doc.title + ' ' + doc.content);
        } catch (e) {
          console.warn('Embedding generation skipped during seed:', e.message);
        }

        await db.insert(knowledgeBase).values({
          workspaceId: null, // Global knowledge
          category: doc.category,
          title: doc.title,
          content: doc.content,
          embedding: embedding,
        });
      }
      console.log('RAG Knowledge Base initialized with curated B2B sales frameworks & industry data.');
    } catch (err) {
      console.warn('RAG seed error:', err.message);
    }
  }

  /**
   * Search knowledge base for relevant context using semantic embeddings
   */
  async retrieveContext(queryText, workspaceId = null, limit = 4) {
    await this.seedDefaultKnowledge();

    try {
      const queryEmbedding = await llmProvider.embed(queryText);

      // Fetch global docs and workspace-specific docs (including scraped websites)
      const conditions = workspaceId 
        ? or(isNull(knowledgeBase.workspaceId), eq(knowledgeBase.workspaceId, workspaceId))
        : isNull(knowledgeBase.workspaceId);

      const docs = await db.select().from(knowledgeBase).where(conditions);

      if (docs.length === 0) {
        return [];
      }

      // Rank by cosine similarity
      const scoredDocs = docs.map(doc => {
        const sim = doc.embedding ? this.cosineSimilarity(queryEmbedding, doc.embedding) : 0.5;
        return { ...doc, similarity: sim };
      });

      scoredDocs.sort((a, b) => b.similarity - a.similarity);
      return scoredDocs.slice(0, limit);
    } catch (err) {
      try {
        return await db.select().from(knowledgeBase).limit(limit);
      } catch (fallbackErr) {
        return [];
      }
    }
  }

  /**
   * Scrapes, chunks, embeds, and ingests a target company or market URL into RAG
   */
  async ingestScrapedContent({ workspaceId, url, companyName, title, content, extractedData }) {
    if (!content && !extractedData) {
      throw new Error('No content or extracted data to ingest');
    }

    const createdRecords = [];
    const sourceTitle = title || companyName || url;

    // 1. Synthesize structured overview chunk
    const overviewContent = `
[Target Market & Company Intelligence]
URL: ${url}
Entity: ${companyName || 'Target Organization'}
Industry: ${extractedData?.industry || 'B2B'}
Location / Region: ${extractedData?.region || 'Not specified'}
Target Audience: ${extractedData?.targetAudience || 'Decision Makers'}
Core Value Proposition: ${extractedData?.valueProposition || ''}
Product & Services: ${extractedData?.productDescription || ''}
Key Offerings: ${extractedData?.keyOfferings?.join(', ') || ''}
Key Evidence: ${extractedData?.evidenceQuotes?.join(' | ') || ''}
    `.trim();

    const overviewEmbedding = await llmProvider.embed(sourceTitle + ' ' + overviewContent);

    const [overviewDoc] = await db.insert(knowledgeBase).values({
      workspaceId,
      category: 'scraped_web',
      title: `${sourceTitle} - Scraped Intelligence & ICP Grounding`,
      content: overviewContent,
      metadata: {
        url,
        companyName,
        region: extractedData?.region,
        targetAudience: extractedData?.targetAudience,
        crawledAt: new Date().toISOString(),
        chunkIndex: 0,
        type: 'overview'
      },
      embedding: overviewEmbedding,
    }).returning();

    createdRecords.push(overviewDoc);

    // 2. Break long body text into semantic chunks (~800 chars) for deeper retrieval
    if (content && content.length > 300) {
      const chunkSize = 800;
      const overlap = 150;
      let startIndex = 0;
      let chunkNum = 1;

      while (startIndex < content.length && chunkNum <= 4) {
        const chunkText = content.slice(startIndex, startIndex + chunkSize);
        if (chunkText.trim().length > 80) {
          const chunkEmbedding = await llmProvider.embed(sourceTitle + ' ' + chunkText);
          const [subDoc] = await db.insert(knowledgeBase).values({
            workspaceId,
            category: 'scraped_web',
            title: `${sourceTitle} - Web Content Excerpt (Part ${chunkNum})`,
            content: chunkText,
            metadata: {
              url,
              companyName,
              crawledAt: new Date().toISOString(),
              chunkIndex: chunkNum,
              type: 'text_chunk'
            },
            embedding: chunkEmbedding,
          }).returning();

          createdRecords.push(subDoc);
        }
        startIndex += (chunkSize - overlap);
        chunkNum++;
      }
    }

    return createdRecords;
  }

  /**
   * Add a custom document to the workspace knowledge base
   */
  async addDocument({ workspaceId, category, title, content, metadata }) {
    const embedding = await llmProvider.embed(title + ' ' + content);
    const [doc] = await db.insert(knowledgeBase).values({
      workspaceId,
      category: category || 'custom',
      title,
      content,
      metadata: metadata || {},
      embedding,
    }).returning();

    return doc;
  }

  /**
   * Retrieve all knowledge documents belonging to a workspace or global
   */
  async getWorkspaceKnowledge(workspaceId) {
    await this.seedDefaultKnowledge();
    const conditions = workspaceId
      ? or(isNull(knowledgeBase.workspaceId), eq(knowledgeBase.workspaceId, workspaceId))
      : isNull(knowledgeBase.workspaceId);

    const docs = await db
      .select({
        id: knowledgeBase.id,
        workspaceId: knowledgeBase.workspaceId,
        category: knowledgeBase.category,
        title: knowledgeBase.title,
        content: knowledgeBase.content,
        metadata: knowledgeBase.metadata,
        createdAt: knowledgeBase.createdAt,
      })
      .from(knowledgeBase)
      .where(conditions)
      .orderBy(desc(knowledgeBase.createdAt));

    return docs;
  }

  /**
   * Delete a specific knowledge base document
   */
  async deleteKnowledge(id, workspaceId) {
    const conditions = workspaceId
      ? and(eq(knowledgeBase.id, id), eq(knowledgeBase.workspaceId, workspaceId))
      : eq(knowledgeBase.id, id);

    await db.delete(knowledgeBase).where(conditions);
    return true;
  }
}

module.exports = new RAGService();
