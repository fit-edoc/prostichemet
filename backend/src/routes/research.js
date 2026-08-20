const express = require('express');
const router = express.Router();
const researchController = require('../controllers/researchController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// POST /api/v1/research/run
router.post('/run', validate(researchController.runResearchSchema), researchController.runResearch);

module.exports = router;
