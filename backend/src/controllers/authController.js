const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const googleLoginSchema = z.object({
  idToken: z.string().optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  avatarUrl: z.string().optional().nullable(),
  googleId: z.string().optional(),
}).refine(data => data.idToken || data.email, {
  message: 'Either idToken or email is required',
});

const loginWithGoogle = async (req, res, next) => {
  try {
    const result = await authService.loginWithGoogle(req.body);
    return successResponse(res, result, 200);
  } catch (error) {
    // Log detailed failure to server console (Render logs) for debugging
    console.error('❌ [AUTH FAILURE] /api/v1/auth/google:', {
      error: error.message,
      stack: error.stack,
      payload: {
        hasIdToken: !!req.body?.idToken,
        email: req.body?.email,
        name: req.body?.name,
      },
    });

    // Send generic, safe error message to client without exposing database or system internals
    return errorResponse(
      res,
      'AUTH_FAILED',
      'Sign in could not be completed. Please try again.',
      401
    );
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
