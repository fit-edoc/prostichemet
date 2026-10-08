const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const workspaceRoutes = require('./workspaces');
const profileRoutes = require('./profiles');
const icpRoutes = require('./icps');
const researchRoutes = require('./research');
const emailRoutes = require('./emails');
const crmRoutes = require('./crm');
const ragRoutes = require('./rag');

router.use('/auth', authRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/profiles', profileRoutes);
router.use('/icps', icpRoutes);
router.use('/research', researchRoutes);
router.use('/emails', emailRoutes);
router.use('/crm', crmRoutes);
router.use('/rag', ragRoutes);

module.exports = router;
