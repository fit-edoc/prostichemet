# RAG & Company Ingestion Pipeline

1. **Scraper**: Fetches HTML page using custom User-Agent and handles timeouts.
2. **Text Normalization**: Strips scripts, styles, navigation bars, and footer noise.
3. **Chunking**: Splits body copy into semantic paragraphs (max 1000 tokens).
4. **Vector Storage**: Indexes chunk text with metadata tags for quick context injection.
