const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// POST /api/v1/emails/generate
router.post('/generate', validate(emailController.generateEmailSchema), emailController.generateEmail);

// GET /api/v1/emails/prospect/:prospectId
router.get('/prospect/:prospectId', emailController.getEmailsForProspect);

module.exports = router;
