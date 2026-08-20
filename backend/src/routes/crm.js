const express = require('express');
const router = express.Router();
const crmController = require('../controllers/crmController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// GET /api/v1/crm/leads (all workspace leads)
router.get('/leads', crmController.getAllLeads);

// GET /api/v1/crm/icp/:icpId (leads filtered by ICP)
router.get('/icp/:icpId', crmController.getLeadsByIcp);

// PATCH /api/v1/crm/prospect/:id/status (update pipeline status)
router.patch('/prospect/:id/status', validate(crmController.updateStatusSchema), crmController.updateLeadStatus);

module.exports = router;
