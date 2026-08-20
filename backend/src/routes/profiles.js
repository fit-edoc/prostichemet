const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// GET /api/v1/profiles
router.get('/', profileController.getProfiles);

// GET /api/v1/profiles/:id
router.get('/:id', profileController.getProfileById);

// POST /api/v1/profiles
router.post('/', validate(profileController.profileSchema), profileController.createProfile);

module.exports = router;
