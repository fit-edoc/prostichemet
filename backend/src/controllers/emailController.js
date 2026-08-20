const emailAgent = require('../services/emailAgent');
const { db } = require('../db');
const { emails } = require('../db/schema');
const { eq, and, desc } = require('drizzle-orm');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const generateEmailSchema = z.object({
  prospectId: z.number().int().positive('prospectId is required'),
  framework: z.enum(['PAS', 'Observation-Insight-Value', 'Case-Study']).optional().default('PAS'),
});

const generateEmail = async (req, res, next) => {
  try {
    const { prospectId, framework } = req.body;

    const email = await emailAgent.generatePersonalizedEmail({
      workspaceId: req.workspaceId,
      prospectId,
      framework,
    });

    return successResponse(res, email, 201);
  } catch (error) {
    next(error);
  }
};

const getEmailsForProspect = async (req, res, next) => {
  try {
    const prospectId = parseInt(req.params.prospectId);

    const emailList = await db
      .select()
      .from(emails)
      .where(and(eq(emails.prospectId, prospectId), eq(emails.workspaceId, req.workspaceId)))
      .orderBy(desc(emails.createdAt));

    return successResponse(res, emailList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateEmail,
  getEmailsForProspect,
  generateEmailSchema,
};
