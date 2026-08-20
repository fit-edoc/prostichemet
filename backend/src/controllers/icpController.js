const { db } = require('../db');
const { icpProfiles, businessProfiles } = require('../db/schema');
const llmProvider = require('../services/llm');
const researchAgent = require('../services/researchAgent');
const { eq, and, desc } = require('drizzle-orm');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const generateIcpSchema = z.object({
  businessProfileId: z.number().int().positive('businessProfileId must be a valid ID'),
  autoDiscoverLeads: z.boolean().optional().default(true),
  leadCount: z.number().int().min(1).max(20).optional().default(5),
});

const generateIcp = async (req, res, next) => {
  try {
    const { businessProfileId, autoDiscoverLeads, leadCount } = req.body;

    // 1. Fetch business profile
    const profiles = await db
      .select()
      .from(businessProfiles)
      .where(and(eq(businessProfiles.id, businessProfileId), eq(businessProfiles.workspaceId, req.workspaceId)));

    if (profiles.length === 0) {
      return errorResponse(res, 'NOT_FOUND', 'Business profile not found in your workspace', 404);
    }
    const profile = profiles[0];

    // 2. Generate ICP via RAG and Gemini
    const icpData = await llmProvider.generateICPWithRAG(profile);

    // 3. Save ICP to database
    const [newIcp] = await db
      .insert(icpProfiles)
      .values({
        workspaceId: req.workspaceId,
        businessProfileId: profile.id,
        title: icpData.title,
        targetIndustries: icpData.targetIndustries,
        targetRoles: icpData.targetRoles,
        companySize: icpData.companySize,
        painPoints: icpData.painPoints,
        criteria: {
          generatedAt: new Date().toISOString(),
          source: 'RAG Gemini 2.5 Flash',
        },
      })
      .returning();

    // 4. If autoDiscoverLeads is true, run the autonomous Research Agent
    let discoveredLeads = [];
    if (autoDiscoverLeads) {
      try {
        discoveredLeads = await researchAgent.conductResearch({
          workspaceId: req.workspaceId,
          icpProfile: newIcp,
          businessProfile: profile,
          leadCount,
        });
      } catch (researchErr) {
        console.warn('Auto lead research failed:', researchErr.message);
      }
    }

    return successResponse(res, {
      icp: newIcp,
      discoveredLeads,
    }, 201);
  } catch (error) {
    next(error);
  }
};

const getIcps = async (req, res, next) => {
  try {
    const icps = await db
      .select()
      .from(icpProfiles)
      .where(eq(icpProfiles.workspaceId, req.workspaceId))
      .orderBy(desc(icpProfiles.createdAt));

    return successResponse(res, icps);
  } catch (error) {
    next(error);
  }
};

const getIcpById = async (req, res, next) => {
  try {
    const icpId = parseInt(req.params.id);
    const icps = await db
      .select()
      .from(icpProfiles)
      .where(and(eq(icpProfiles.id, icpId), eq(icpProfiles.workspaceId, req.workspaceId)));

    if (icps.length === 0) {
      return errorResponse(res, 'NOT_FOUND', 'ICP profile not found', 404);
    }

    return successResponse(res, icps[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateIcp,
  getIcps,
  getIcpById,
  generateIcpSchema,
};
