const { db } = require('../db');
const { workspaces, workspaceMembers } = require('../db/schema');
const { eq, and } = require('drizzle-orm');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const createWorkspaceSchema = z.object({
  name: z.string().min(2, 'Workspace name must be at least 2 characters'),
});

const getWorkspaces = async (req, res, next) => {
  try {
    const list = await db
      .select({
        workspace: workspaces,
        role: workspaceMembers.role,
      })
      .from(workspaceMembers)
      .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
      .where(eq(workspaceMembers.userId, req.user.id));

    const formatted = list.map(item => ({
      ...item.workspace,
      role: item.role,
    }));

    return successResponse(res, formatted);
  } catch (error) {
    next(error);
  }
};

const createWorkspace = async (req, res, next) => {
  try {
    const { name } = req.body;

    const [newWorkspace] = await db
      .insert(workspaces)
      .values({
        name,
        ownerId: req.user.id,
      })
      .returning();

    await db.insert(workspaceMembers).values({
      userId: req.user.id,
      workspaceId: newWorkspace.id,
      role: 'owner',
    });

    return successResponse(res, { ...newWorkspace, role: 'owner' }, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWorkspaces,
  createWorkspace,
  createWorkspaceSchema,
};
