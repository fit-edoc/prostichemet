const { db } = require('../db');
const { businessProfiles } = require('../db/schema');
const { eq, and, desc } = require('drizzle-orm');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const profileSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().optional(),
  valueProposition: z.string().min(5, 'Value proposition should be descriptive'),
  productDescription: z.string().min(5, 'Product description should be descriptive'),
  targetAudience: z.string().optional(),
  typicalCustomer: z.string().optional(),
  typicalDealSize: z.string().optional(),
  region: z.string().optional(),
});

const createProfile = async (req, res, next) => {
  try {
    const {
      companyName,
      industry,
      valueProposition,
      productDescription,
      targetAudience,
      typicalCustomer,
      typicalDealSize,
      region,
    } = req.body;

    const [newProfile] = await db
      .insert(businessProfiles)
      .values({
        workspaceId: req.workspaceId,
        companyName,
        industry,
        valueProposition,
        productDescription,
        targetAudience,
        typicalCustomer,
        typicalDealSize,
        region,
      })
      .returning();

    return successResponse(res, newProfile, 201);
  } catch (error) {
    next(error);
  }
};

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await db
      .select()
      .from(businessProfiles)
      .where(eq(businessProfiles.workspaceId, req.workspaceId))
      .orderBy(desc(businessProfiles.createdAt));

    return successResponse(res, profiles);
  } catch (error) {
    next(error);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const profileId = parseInt(req.params.id);
    const profiles = await db
      .select()
      .from(businessProfiles)
      .where(and(eq(businessProfiles.id, profileId), eq(businessProfiles.workspaceId, req.workspaceId)));

    if (profiles.length === 0) {
      return errorResponse(res, 'NOT_FOUND', 'Business profile not found', 404);
    }

    return successResponse(res, profiles[0]);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profileId = parseInt(req.params.id);
    const {
      companyName,
      industry,
      valueProposition,
      productDescription,
      targetAudience,
      typicalCustomer,
      typicalDealSize,
      region,
    } = req.body;

    const [updatedProfile] = await db
      .update(businessProfiles)
      .set({
        companyName,
        industry,
        valueProposition,
        productDescription,
        targetAudience,
        typicalCustomer,
        typicalDealSize,
        region,
        updatedAt: new Date(),
      })
      .where(and(eq(businessProfiles.id, profileId), eq(businessProfiles.workspaceId, req.workspaceId)))
      .returning();

    if (!updatedProfile) {
      return errorResponse(res, 'NOT_FOUND', 'Business profile not found', 404);
    }

    return successResponse(res, updatedProfile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfiles,
  getProfileById,
  profileSchema,
};
