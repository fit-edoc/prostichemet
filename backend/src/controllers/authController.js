const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const googleLoginSchema = z.object({
  idToken: z.string().optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  googleId: z.string().optional(),
}).refine(data => data.idToken || data.email, {
  message: 'Either idToken or email is required',
});

const loginWithGoogle = async (req, res, next) => {
  try {
    const result = await authService.loginWithGoogle(req.body);
    return successResponse(res, result, 200);
  } catch (error) {
    return errorResponse(res, 'AUTH_FAILED', error.message, 401);
  }
};

const getMe = async (req, res, next) => {
  try {
    const context = await authService.getCurrentContext(req.user.id, req.workspaceId);
    return successResponse(res, context, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginWithGoogle,
  getMe,
  googleLoginSchema,
};
