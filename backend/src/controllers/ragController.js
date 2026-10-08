const scraperService = require('../services/scraperService');
const ragService = require('../services/ragService');
const { successResponse, errorResponse } = require('../utils/response');
const { z } = require('zod');

const scrapeSchema = z.object({
  url: z.string().min(3, 'URL is required'),
  companyName: z.string().optional(),
});

/**
 * Scrapes target URL, extracts intelligence, chunks, and embeds into RAG knowledge base
 */
const scrapeAndIngest = async (req, res, next) => {
  try {
    const { url, companyName } = req.body;

    // 1. Scrape web content
    const scrapedData = await scraperService.scrapeUrl(url);

    // 2. Extract structured company facts and signals
    const extractedData = await scraperService.extractCompanyProfileFromScrapedData(scrapedData);

    // 3. Ingest into RAG vector knowledge base
    const ingestedChunks = await ragService.ingestScrapedContent({
      workspaceId: req.workspaceId,
      url: scrapedData.url,
      companyName: companyName || extractedData.companyName,
      title: scrapedData.title,
      content: scrapedData.bodyText,
      extractedData,
    });

    return successResponse(res, {
      message: 'Website successfully scraped and ingested into RAG knowledge base',
      url: scrapedData.url,
      extractedData,
      chunksIngested: ingestedChunks.length,
      chunks: ingestedChunks,
    }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Fast preview scraper: Given a URL, extracts company details to auto-fill forms
 */
const scrapePreview = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return errorResponse(res, 'BAD_REQUEST', 'URL is required', 400);
    }

    const scrapedData = await scraperService.scrapeUrl(url);
    const extractedData = await scraperService.extractCompanyProfileFromScrapedData(scrapedData);

    return successResponse(res, {
      scrapedData: {
        title: scrapedData.title,
        description: scrapedData.description,
        headings: scrapedData.headings,
      },
      profile: extractedData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Lists all knowledge base documents (frameworks, scraped sites, custom data)
 */
const getKnowledge = async (req, res, next) => {
  try {
    const docs = await ragService.getWorkspaceKnowledge(req.workspaceId);
    return successResponse(res, docs);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a document from the RAG knowledge base
 */
const deleteKnowledge = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await ragService.deleteKnowledge(id, req.workspaceId);
    return successResponse(res, { message: 'Document removed from knowledge base', id });
  } catch (error) {
    next(error);
  }
};

/**
 * Test semantic search / vector retrieval
 */
const queryKnowledge = async (req, res, next) => {
  try {
    const { query, limit } = req.body;
    if (!query) {
      return errorResponse(res, 'BAD_REQUEST', 'Query text is required', 400);
    }

    const results = await ragService.retrieveContext(query, req.workspaceId, limit || 4);
    return successResponse(res, results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  scrapeAndIngest,
  scrapePreview,
  getKnowledge,
  deleteKnowledge,
  queryKnowledge,
  scrapeSchema,
};
