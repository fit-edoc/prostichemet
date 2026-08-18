# Company Research Prompt

**Purpose**: Extract structured data about a target company based on scraped web content.

**Variables**: 
- {{website_content}}: Scraped HTML or Markdown from the company's homepage.

**Expected Output (JSON Schema)**:
- industry: string
- employee_count: integer
- core_offerings: string[]
- 	arget_audience: string
- evidence: string[] (direct quotes from website)
