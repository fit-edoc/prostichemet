const express = require('express');
const router = express.Router();
const ragController = require('../controllers/ragController');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// POST /api/v1/rag/scrape-and-ingest
router.post('/scrape-and-ingest', validate(ragController.scrapeSchema), ragController.scrapeAndIngest);

// POST /api/v1/rag/scrape-preview
router.post('/scrape-preview', validate(ragController.scrapeSchema), ragController.scrapePreview);

// GET /api/v1/rag/knowledge
router.get('/knowledge', ragController.getKnowledge);

// DELETE /api/v1/rag/knowledge/:id
router.delete('/knowledge/:id', ragController.deleteKnowledge);

// POST /api/v1/rag/query
router.post('/query', ragController.queryKnowledge);

module.exports = router;
