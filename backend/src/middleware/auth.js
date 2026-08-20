const authService = require('../services/authService');
const { errorResponse } = require('../utils/response');
const { db } = require('../db');
const { users, workspaces, workspaceMembers } = require('../db/schema');
const { eq } = require('drizzle-orm');

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = authService.verifyToken(token);
        const activeWorkspaceId = req.headers['x-workspace-id'] 
          ? parseInt(req.headers['x-workspace-id']) 
          : decoded.workspaceId;

        const context = await authService.getCurrentContext(decoded.userId, activeWorkspaceId);
        if (!context || !context.user) {
          return errorResponse(res, 'UNAUTHORIZED', 'User account not found', 401);
        }

        req.user = context.user;
        req.workspaceId = context.workspace ? context.workspace.id : decoded.workspaceId;
        req.role = context.role || decoded.role || 'member';
        return next();
      } catch (err) {
        return errorResponse(res, 'INVALID_TOKEN', 'Token is expired or invalid', 401);
      }
    }

    // In local development mode: Auto-initialize/use dev workspace if no token provided
    if (process.env.NODE_ENV !== 'production') {
      let defaultUser = (await db.select().from(users).limit(1))[0];
      if (!defaultUser) {
        [defaultUser] = await db.insert(users).values({
          email: 'dev@postrichment.com',
          name: 'Developer',
          googleId: 'dev_default_user'
        }).returning();
      }

      let defaultWorkspace = (await db.select().from(workspaces).limit(1))[0];
      if (!defaultWorkspace) {
        [defaultWorkspace] = await db.insert(workspaces).values({
          name: 'Default Workspace',
          ownerId: defaultUser.id
        }).returning();

        await db.insert(workspaceMembers).values({
          userId: defaultUser.id,
          workspaceId: defaultWorkspace.id,
          role: 'owner'
        });
      }

      req.user = defaultUser;
      req.workspaceId = req.headers['x-workspace-id'] ? parseInt(req.headers['x-workspace-id']) : defaultWorkspace.id;
      req.role = 'owner';
      return next();
    }

    return errorResponse(res, 'AUTHENTICATION_REQUIRED', 'Authorization header is missing', 401);
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return errorResponse(res, 'AUTH_ERROR', 'Authentication failed', 500);
  }
}

module.exports = { requireAuth };
