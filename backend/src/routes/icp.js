const express = require('express');
const router = express.Router();
const icpController = require('../controllers/icpController');

// POST /api/icps/generate
// Generate and save an ICP for a given business profile
router.post('/generate', icpController.generateIcp);

// GET /api/icps
router.get('/', icpController.getIcps);

module.exports = router;
