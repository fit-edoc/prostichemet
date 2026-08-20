const { db } = require('../db');
const { icpProfiles, businessProfiles } = require('../db/schema');
const researchAgent = require('../services/researchAgent');
const { eq, and } = require('drizzle-orm');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const runResearchSchema = z.object({
  icpId: z.number().int().positive('icpId is required'),
  leadCount: z.number().int().min(1).max(25).optional().default(5),
});

const runResearch = async (req, res, next) => {
  try {
    const { icpId, leadCount } = req.body;

    // Fetch ICP
    const icpResults = await db
      .select({
        icp: icpProfiles,
        business: businessProfiles,
      })
      .from(icpProfiles)
      .innerJoin(businessProfiles, eq(icpProfiles.businessProfileId, businessProfiles.id))
      .where(and(eq(icpProfiles.id, icpId), eq(icpProfiles.workspaceId, req.workspaceId)));

    if (icpResults.length === 0) {
      return errorResponse(res, 'NOT_FOUND', 'ICP profile not found in your workspace', 404);
    }

    const { icp, business } = icpResults[0];

    const leads = await researchAgent.conductResearch({
      workspaceId: req.workspaceId,
      icpProfile: icp,
      businessProfile: business,
      leadCount,
    });

    return successResponse(res, {
      leadsDiscovered: leads.length,
      leads,
    }, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  runResearch,
  runResearchSchema,
};
