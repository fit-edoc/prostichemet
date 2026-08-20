const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// POST /api/profiles
// Create a new business profile
router.post('/', profileController.createProfile);

// GET /api/profiles
router.get('/', profileController.getProfiles);

module.exports = router;
