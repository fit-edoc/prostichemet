const { db } = require('../db');
const { crmProspects, emails } = require('../db/schema');
const { eq, and, desc } = require('drizzle-orm');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const updateStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Qualified', 'Meeting Booked', 'Replied', 'Unresponsive']),
});

const getLeadsByIcp = async (req, res, next) => {
  try {
    const icpId = parseInt(req.params.icpId);

    const leads = await db
      .select()
      .from(crmProspects)
      .where(and(eq(crmProspects.icpProfileId, icpId), eq(crmProspects.workspaceId, req.workspaceId)))
      .orderBy(desc(crmProspects.score), desc(crmProspects.createdAt));

    return successResponse(res, leads);
  } catch (error) {
    next(error);
  }
};

const getAllLeads = async (req, res, next) => {
  try {
    const leads = await db
      .select()
      .from(crmProspects)
      .where(eq(crmProspects.workspaceId, req.workspaceId))
      .orderBy(desc(crmProspects.score), desc(crmProspects.createdAt));

    return successResponse(res, leads);
  } catch (error) {
    next(error);
  }
};

const updateLeadStatus = async (req, res, next) => {
  try {
    const leadId = parseInt(req.params.id);
    const { status } = req.body;

    const [updated] = await db
      .update(crmProspects)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(and(eq(crmProspects.id, leadId), eq(crmProspects.workspaceId, req.workspaceId)))
      .returning();

    if (!updated) {
      return errorResponse(res, 'NOT_FOUND', 'Lead not found in your workspace', 404);
    }

    return successResponse(res, updated);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeadsByIcp,
  getAllLeads,
  updateLeadStatus,
  updateStatusSchema,
};
