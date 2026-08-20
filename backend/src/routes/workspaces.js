const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// GET /api/v1/workspaces
router.get('/', workspaceController.getWorkspaces);

// POST /api/v1/workspaces
router.post('/', validate(workspaceController.createWorkspaceSchema), workspaceController.createWorkspace);

module.exports = router;
