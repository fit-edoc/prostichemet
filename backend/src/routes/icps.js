const express = require('express');
const router = express.Router();
const icpController = require('../controllers/icpController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// GET /api/v1/icps
router.get('/', icpController.getIcps);

// GET /api/v1/icps/:id
router.get('/:id', icpController.getIcpById);

// POST /api/v1/icps/generate
router.post('/generate', validate(icpController.generateIcpSchema), icpController.generateIcp);

module.exports = router;
