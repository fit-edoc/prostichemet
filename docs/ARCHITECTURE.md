# System Architecture Overview

## Overview
Postrichment (Prospail) is an agentic AI-driven Go-To-Market & Lead Enrichment Platform.

### Core Modules
1. **Frontend App**: Next.js 16 with React 19, Turbopack, TailwindCSS, Redux Toolkit, and Auth.js v5.
2. **Backend Engine**: Express.js REST API with Drizzle ORM on PostgreSQL.
3. **AI Layer**: Google Gemini 2.0 / 1.5 Flash for high-speed RAG, intent analysis, and cold email drafting.
4. **Data Extraction**: Automated web crawler and markdown sanitizer for company profile ingestion.
